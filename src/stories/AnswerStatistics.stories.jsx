import AnswerStatistics from '../components/molecules/AnswerStatistics';

export default {
  title: 'Molecules/AnswerStatistics',
  component: AnswerStatistics,
  parameters: { frame: 'card' },
  args: { correct: 2, incorrect: 0, unanswered: 8 },
};
export const InProgress = {};
export const Mixed = { args: { correct: 5, incorrect: 3, unanswered: 2 } };
export const Perfect = { args: { correct: 10, incorrect: 0, unanswered: 0 } };
