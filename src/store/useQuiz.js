import { useEffect, useSyncExternalStore } from 'react';
import { quizStore } from './quizStore';
import { STORAGE_KEY } from './quizModel';

export function useQuiz() {
  const state = useSyncExternalStore(quizStore.subscribe, quizStore.getSnapshot);
  useEffect(() => {
    quizStore.initialize();
    const interval = window.setInterval(quizStore.tick, 250);
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY || event.key === null) quizStore.syncStorage();
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        quizStore.syncStorage();
        quizStore.tick();
      }
    };
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);
  return { ...state, dispatch: quizStore.dispatch };
}
