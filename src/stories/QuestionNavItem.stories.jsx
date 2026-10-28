import { fn } from 'storybook/test';
import QuestionNavItem from '../components/molecules/QuestionNavItem';
import { sampleQuestion } from './storyData';

export default {
  title: 'Molécules/Lien de question',
  component: QuestionNavItem,
  parameters: { frame: 'card' },
  args: { question: sampleQuestion, index: 2, active: false, onClick: fn() },
};
export const Default = { name: 'Par défaut' };
export const Current = { name: 'Question actuelle', args: { active: true } };
