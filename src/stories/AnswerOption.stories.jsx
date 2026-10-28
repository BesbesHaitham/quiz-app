import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import AnswerOption from '../components/molecules/AnswerOption';

export default {
  title: 'Molecules/AnswerOption',
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
export const Default = {};
export const Selected = { args: { checked: true } };
export const LongAnswer = {
  args: {
    option:
      'A JavaScript library for building interactive user interfaces from reusable components',
  },
};
export const Disabled = { args: { disabled: true } };
