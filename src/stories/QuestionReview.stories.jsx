import QuestionReview from '../components/molecules/QuestionReview';
import { sampleQuestion } from './storyData';

export default {
  title: 'Molécules/Corrigé de question',
  component: QuestionReview,
  parameters: { frame: 'form' },
  args: { question: sampleQuestion, index: 2, answer: 2 },
  argTypes: { answer: { control: 'select', options: [undefined, 0, 1, 2, 3] } },
};
export const Correct = { name: 'Bonne réponse' };
export const Incorrect = { name: 'Mauvaise réponse', args: { answer: 0 } };
export const Unanswered = { name: 'Sans réponse', args: { answer: undefined } };
