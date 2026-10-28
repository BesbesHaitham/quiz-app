import { fn } from 'storybook/test';
import QuizSummary from '../components/organisms/QuizSummary';

export default {
  title: 'Organisms/QuizSummary',
  component: QuizSummary,
  parameters: { frame: 'card' },
  args: {
    remaining: 504,
    duration: 600,
    statistics: { correct: 2, incorrect: 0, unanswered: 8 },
    onFinish: fn(),
  },
};
export const InProgress = {};
export const AlmostOutOfTime = {
  args: { remaining: 25, statistics: { correct: 5, incorrect: 2, unanswered: 3 } },
};
