import { fallbackQuiz, quizApi } from '../services/quizApi';
import {
  createAttempt,
  quizReducer,
  STORAGE_KEY,
  STORAGE_VERSION,
  validAttempt,
  validQuiz,
} from './quizModel';

const browserStorage = {
  getItem: (key) => globalThis.localStorage.getItem(key),
  setItem: (key, value) => globalThis.localStorage.setItem(key, value),
};

export function createQuizStore({
  api = quizApi,
  storage = browserStorage,
  seed = fallbackQuiz,
  now = () => Date.now(),
  makeId = () => crypto.randomUUID(),
  durationSeconds,
} = {}) {
  let state = { attempt: null, loaded: false, storageError: false, recovered: false, now: now() };
  let initialization;
  const listeners = new Set();
  const publish = (changes) => {
    state = { ...state, ...changes };
    listeners.forEach((listener) => listener());
  };
  const persist = (attempt) => {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, attempt }));
      return false;
    } catch {
      return true;
    }
  };
  const read = () => {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const data = JSON.parse(raw);
    if (data?.version !== STORAGE_VERSION || !validAttempt(data.attempt))
      throw new Error('Invalid saved attempt');
    return data.attempt;
  };
  const acknowledge = (attempt) => {
    // A static mock acknowledges receipt; local state remains authoritative even offline.
    Promise.resolve()
      .then(() => api.submit(attempt))
      .catch(() => {});
  };
  const commit = (attempt, timestamp) => {
    const wasActive = state.attempt?.status === 'active';
    publish({ attempt, now: timestamp, storageError: persist(attempt) });
    if (wasActive && attempt.status === 'finished') acknowledge(attempt);
  };
  const dispatch = (action) => {
    if (!state.loaded) return;
    const timestamp = now();
    const next = quizReducer(state.attempt, {
      ...action,
      now: timestamp,
      ...(action.type === 'restart' ? { id: makeId() } : {}),
    });
    if (next !== state.attempt) commit(next, timestamp);
  };
  const tick = () => {
    if (!state.loaded || state.attempt.status !== 'active') return;
    const timestamp = now();
    const next = quizReducer(state.attempt, { type: 'tick', now: timestamp });
    if (next !== state.attempt) commit(next, timestamp);
    else if (Math.floor(timestamp / 1000) !== Math.floor(state.now / 1000))
      publish({ now: timestamp });
  };
  return {
    getSnapshot: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    initialize() {
      if (initialization) return initialization;
      initialization = (async () => {
        let saved;
        let recovered = false;
        let storageError = false;
        try {
          saved = read();
        } catch (error) {
          recovered = error instanceof SyntaxError || error.message === 'Invalid saved attempt';
          storageError = !recovered;
        }
        if (saved) {
          publish({ attempt: saved, loaded: true, now: now(), storageError });
          tick();
          return;
        }
        let quiz = seed;
        try {
          const remote = await api.getQuiz();
          if (validQuiz(remote)) quiz = remote;
        } catch {
          /* Bundled fixture supports a first run without WireMock. */
        }
        const duration =
          Number.isInteger(durationSeconds) && durationSeconds >= 1 && durationSeconds <= 86400
            ? durationSeconds
            : quiz.durationSeconds;
        const attempt = createAttempt(quiz, {
          now: now(),
          id: makeId(),
          durationSeconds: duration,
        });
        publish({
          attempt,
          loaded: true,
          now: now(),
          recovered,
          storageError: persist(attempt) || storageError,
        });
      })();
      return initialization;
    },
    dispatch,
    tick,
    syncStorage() {
      // Failed writes must not be replaced by an older saved snapshot on tab focus.
      if (!state.loaded || state.storageError) return;
      try {
        const saved = read();
        if (saved && JSON.stringify(saved) !== JSON.stringify(state.attempt)) {
          publish({ attempt: saved, now: now(), storageError: false });
          tick();
        }
      } catch {
        publish({ storageError: true });
      }
    },
  };
}

export const quizStore = createQuizStore({
  durationSeconds: Number(import.meta.env.VITE_QUIZ_DURATION_SECONDS),
});
