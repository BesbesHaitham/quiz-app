import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import AnswerOption from '../components/molecules/AnswerOption';

export default {
  title: 'Molécules/Choix de réponse',
  component: AnswerOption,
  parameters: { frame: 'form' },
  args: {
    option: 'useState',
    index: 2,
    name: 'example-answer',
    checked: false,
    disabled: false,
    onChange: fn(),
  },
  argTypes: { index: { control: 'select', options: [0, 1, 2, 3] } },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <AnswerOption
        {...args}
        onChange={(index) => {
          args.onChange(index);
          updateArgs({ checked: true });
        }}
      />
    );
  },
};
export const Default = { name: 'Par défaut' };
export const Selected = { name: 'Sélectionné', args: { checked: true } };
export const LongAnswer = {
  name: 'Réponse longue',
  args: {
    option:
      'Une bibliothèque JavaScript pour créer des interfaces interactives avec des composants réutilisables',
  },
};
export const Disabled = { name: 'Désactivé', args: { disabled: true } };
