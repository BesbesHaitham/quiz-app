import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import Checkbox from '../components/atoms/Checkbox';

export default {
  title: 'Atomes/Case à cocher',
  component: Checkbox,
  args: {
    checked: false,
    'aria-label': 'Inclure cette réponse',
    variant: 'default',
    size: 'md',
    indeterminate: false,
    invalid: false,
    disabled: false,
    required: false,
    onChange: fn(),
    onCheckedChange: fn(),
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'danger'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'select', options: [undefined, 'none', 'sm', 'md', 'lg', 'full'] },
    ref: { control: false },
    className: { control: 'text' },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Checkbox
        {...args}
        onChange={(event) => {
          args.onChange(event);
          updateArgs({ checked: event.target.checked, indeterminate: false });
        }}
      />
    );
  },
};

export const Unchecked = { name: 'Non coché' };
export const Checked = { name: 'Coché', args: { checked: true } };
export const Primary = { name: 'Principal', args: { checked: true, variant: 'primary' } };
export const Small = { name: 'Petit', args: { size: 'sm' } };
export const Large = { name: 'Grand', args: { size: 'lg' } };
export const Disabled = { name: 'Désactivé', args: { disabled: true } };
export const Indeterminate = { name: 'Indéterminé', args: { indeterminate: true } };
export const Danger = { args: { variant: 'danger', checked: true } };
export const Invalid = { name: 'Invalide', args: { invalid: true, required: true } };
export const Rounded = { name: 'Arrondi', args: { radius: 'full', checked: true } };
export const ExtraSmall = { name: 'Très petit', args: { size: 'xs' } };
export const ExtraLarge = { name: 'Très grand', args: { size: 'xl', checked: true } };
export const Uncontrolled = {
  name: 'Non contrôlé',
  args: { checked: undefined, defaultChecked: true, name: 'answer', value: 'a' },
  render: (args) => <Checkbox {...args} />,
};
