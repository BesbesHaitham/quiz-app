import { fn } from 'storybook/test';
import QuizResults from '../components/organisms/QuizResults';
import { finishedAttempt } from './storyData';

export default {
  title: 'Organismes/Résultats du quiz',
  component: QuizResults,
  args: { attempt: finishedAttempt, onRestart: fn() },
};
export const Completed = { name: 'Terminé' };
export const TimeExpired = {
  name: 'Temps écoulé',
  args: {
    attempt: { ...finishedAttempt, reason: 'expired', submittedAt: finishedAttempt.deadline },
  },
};
export const PerfectScore = {
  name: 'Score parfait',
  args: {
    attempt: {
      ...finishedAttempt,
      answers: Object.fromEntries(
        finishedAttempt.quiz.questions.map((question) => [question.id, question.correctIndex])
      ),
    },
  },
};
