import { fn } from 'storybook/test';
import QuizSummary from '../components/organisms/QuizSummary';

export default {
  title: 'Organismes/Suivi du quiz',
  component: QuizSummary,
  parameters: { frame: 'card' },
  args: {
    remaining: 504,
    duration: 600,
    onFinish: fn(),
  },
};
export const InProgress = { name: 'En cours' };
export const AlmostOutOfTime = { name: 'Fin du temps proche', args: { remaining: 25 } };
