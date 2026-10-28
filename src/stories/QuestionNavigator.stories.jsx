import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import QuestionNavigator from '../components/organisms/QuestionNavigator';
import { sampleQuiz, sampleAttempt } from './storyData';

export default {
  title: 'Organisms/QuestionNavigator',
  component: QuestionNavigator,
  parameters: { frame: 'card' },
  args: { quiz: sampleQuiz, answers: sampleAttempt.answers, currentIndex: 2, onNavigate: fn() },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <QuestionNavigator
        {...args}
        onNavigate={(currentIndex) => {
          args.onNavigate(currentIndex);
          updateArgs({ currentIndex });
        }}
      />
    );
  },
};
export const InProgress = {};
export const FreshAttempt = { args: { answers: {}, currentIndex: 0 } };
export const MixedAnswers = { args: { answers: { react: 0, components: 0, state: 1 } } };
