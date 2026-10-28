import { fn } from 'storybook/test';
import QuestionNavItem from '../components/molecules/QuestionNavItem';
import { sampleQuestion } from './storyData';

export default {
  title: 'Molecules/QuestionNavItem',
  component: QuestionNavItem,
  parameters: { frame: 'card' },
  args: { question: sampleQuestion, index: 2, active: false, answer: undefined, onClick: fn() },
  argTypes: { answer: { control: 'select', options: [undefined, 0, 1, 2, 3] } },
};
export const Unanswered = {};
export const Current = { args: { active: true } };
export const Correct = { args: { answer: 2 } };
export const Incorrect = { args: { answer: 0 } };
