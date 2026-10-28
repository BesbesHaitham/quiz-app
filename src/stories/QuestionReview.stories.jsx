import QuestionReview from '../components/molecules/QuestionReview';
import { sampleQuestion } from './storyData';

export default {
  title: 'Molecules/QuestionReview',
  component: QuestionReview,
  parameters: { frame: 'form' },
  args: { question: sampleQuestion, index: 2, answer: 2 },
  argTypes: { answer: { control: 'select', options: [undefined, 0, 1, 2, 3] } },
};
export const Correct = {};
export const Incorrect = { args: { answer: 0 } };
export const Unanswered = { args: { answer: undefined } };
