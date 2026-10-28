import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import QuestionNavigator from '../components/organisms/QuestionNavigator';
import { sampleQuiz, sampleAttempt } from './storyData';

export default {
  title: 'Organismes/Navigation des questions',
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
export const InProgress = { name: 'En cours' };
export const FreshAttempt = { name: 'Nouvelle tentative', args: { answers: {}, currentIndex: 0 } };
export const MixedAnswers = {
  name: 'Progression partielle',
  args: { answers: { react: 0, components: 0, state: 1 } },
};
