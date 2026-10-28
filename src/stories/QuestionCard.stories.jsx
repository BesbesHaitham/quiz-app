import { useArgs } from 'storybook/preview-api';
import QuestionCard from '../components/organisms/QuestionCard';
import { sampleQuestion, questionActions } from './storyData';

export default {
  title: 'Organisms/QuestionCard',
  component: QuestionCard,
  args: { question: sampleQuestion, index: 2, total: 10, answer: undefined, ...questionActions() },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <QuestionCard
        {...args}
        onAnswer={(answer) => {
          args.onAnswer(answer);
          updateArgs({ answer });
        }}
      />
    );
  },
};
export const Unanswered = {};
export const Selected = { args: { answer: 2 } };
export const FirstQuestion = { args: { index: 0 } };
export const LastQuestion = { args: { index: 9 } };
