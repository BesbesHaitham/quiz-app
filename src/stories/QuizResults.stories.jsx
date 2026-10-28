import { fn } from 'storybook/test';
import QuizResults from '../components/organisms/QuizResults';
import { finishedAttempt } from './storyData';

export default {
  title: 'Organisms/QuizResults',
  component: QuizResults,
  args: { attempt: finishedAttempt, onRestart: fn() },
};
export const Completed = {};
export const TimeExpired = {
  args: {
    attempt: { ...finishedAttempt, reason: 'expired', submittedAt: finishedAttempt.deadline },
  },
};
export const PerfectScore = {
  args: {
    attempt: {
      ...finishedAttempt,
      answers: Object.fromEntries(
        finishedAttempt.quiz.questions.map((question) => [question.id, question.correctIndex])
      ),
    },
  },
};
