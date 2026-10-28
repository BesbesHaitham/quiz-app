import { useArgs } from 'storybook/preview-api';
import QuestionCard from '../components/organisms/QuestionCard';
import { sampleQuestion, questionActions } from './storyData';

export default {
  title: 'Organismes/Carte de question',
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
export const Unanswered = { name: 'Sans réponse' };
export const Selected = { name: 'Sélectionné', args: { answer: 2 } };
export const FirstQuestion = { name: 'Première question', args: { index: 0 } };
export const LastQuestion = { name: 'Dernière question', args: { index: 9 } };
