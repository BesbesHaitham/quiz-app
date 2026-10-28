export const STORAGE_KEY = 'quiz-attempt:v1';
export const STORAGE_VERSION = 1;

const nonEmpty = (value, limit = 2000) =>
  typeof value === 'string' && value.trim().length > 0 && value.length <= limit;
const validIndex = (value, length) => Number.isInteger(value) && value >= 0 && value < length;
const validTime = (value) => Number.isSafeInteger(value) && value > 0;
const validId = (value) =>
  typeof value === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/.test(value);

export function validQuiz(quiz) {
  return !!(
    quiz &&
    validId(quiz.id) &&
    nonEmpty(quiz.title, 120) &&
    nonEmpty(quiz.description, 300) &&
    Number.isInteger(quiz.durationSeconds) &&
    quiz.durationSeconds >= 1 &&
    quiz.durationSeconds <= 86400 &&
    Array.isArray(quiz.questions) &&
    quiz.questions.length > 0 &&
    quiz.questions.length <= 100 &&
    quiz.questions.every(
      (question) =>
        question &&
        validId(question.id) &&
        !['__proto__', 'constructor', 'prototype'].includes(question.id) &&
        nonEmpty(question.text) &&
        ['Easy', 'Medium', 'Hard'].includes(question.difficulty) &&
        Array.isArray(question.options) &&
        question.options.length === 4 &&
        question.options.every((option) => nonEmpty(option)) &&
        new Set(question.options).size === 4 &&
        validIndex(question.correctIndex, 4) &&
        nonEmpty(question.explanation)
    ) &&
    new Set(quiz.questions.map((question) => question.id)).size === quiz.questions.length
  );
}

export function validAttempt(attempt) {
  if (!attempt || !validQuiz(attempt.quiz)) return false;
  const { quiz, answers, startedAt, deadline, durationSeconds, submittedAt, reason, status } =
    attempt;
  return !!(
    nonEmpty(attempt.id, 100) &&
    Number.isInteger(durationSeconds) &&
    durationSeconds >= 1 &&
    durationSeconds <= 86400 &&
    validTime(startedAt) &&
    validTime(deadline) &&
    deadline === startedAt + durationSeconds * 1000 &&
    validIndex(attempt.currentIndex, quiz.questions.length) &&
    answers &&
    typeof answers === 'object' &&
    !Array.isArray(answers) &&
    Object.entries(answers).every(
      ([id, answer]) =>
        quiz.questions.some((question) => question.id === id) && validIndex(answer, 4)
    ) &&
    ((status === 'active' && submittedAt === null && reason === null) ||
      (status === 'finished' &&
        validTime(submittedAt) &&
        submittedAt >= startedAt &&
        submittedAt <= deadline &&
        (reason === 'manual' || (reason === 'expired' && submittedAt === deadline))))
  );
}

export function createAttempt(
  quiz,
  { now = Date.now(), id = crypto.randomUUID(), durationSeconds = quiz.durationSeconds } = {}
) {
  return {
    id,
    quiz,
    durationSeconds,
    startedAt: now,
    deadline: now + durationSeconds * 1000,
    currentIndex: 0,
    answers: {},
    status: 'active',
    submittedAt: null,
    reason: null,
  };
}

export function getStatistics(quiz, answers) {
  const correct = quiz.questions.filter(
    (question) =>
      Object.hasOwn(answers, question.id) && answers[question.id] === question.correctIndex
  ).length;
  const answered = quiz.questions.filter((question) => Object.hasOwn(answers, question.id)).length;
  const total = quiz.questions.length;
  return {
    correct,
    incorrect: answered - correct,
    unanswered: total - answered,
    answered,
    total,
    percentage: Math.round((correct / total) * 100),
  };
}

export function remainingSeconds(attempt, now) {
  return Math.max(0, Math.min(attempt.durationSeconds, Math.ceil((attempt.deadline - now) / 1000)));
}

export function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}

export function quizReducer(attempt, action) {
  if (action.type === 'restart') {
    return createAttempt(attempt.quiz, {
      now: action.now,
      id: action.id,
      durationSeconds: attempt.durationSeconds,
    });
  }
  if (attempt.status !== 'active') return attempt;
  // Check the deadline for every user action, even when background timers were throttled.
  if (action.now >= attempt.deadline) {
    return { ...attempt, status: 'finished', reason: 'expired', submittedAt: attempt.deadline };
  }
  switch (action.type) {
    case 'answer': {
      const question = attempt.quiz.questions.find((item) => item.id === action.questionId);
      if (
        !question ||
        !validIndex(action.optionIndex, 4) ||
        attempt.answers[question.id] === action.optionIndex
      )
        return attempt;
      return { ...attempt, answers: { ...attempt.answers, [question.id]: action.optionIndex } };
    }
    case 'navigate':
      return validIndex(action.index, attempt.quiz.questions.length) &&
        action.index !== attempt.currentIndex
        ? { ...attempt, currentIndex: action.index }
        : attempt;
    case 'finish':
      return {
        ...attempt,
        status: 'finished',
        reason: 'manual',
        submittedAt: Math.max(attempt.startedAt, action.now),
      };
    default:
      return attempt;
  }
}
