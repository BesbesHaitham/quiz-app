import { useState } from 'react';
import { fn } from 'storybook/test';
import { Check, Star } from 'lucide-react';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';

export default {
  title: 'Atomes/Badge',
  component: Badge,
  args: {
    children: 'Neutre',
    variant: 'neutral',
    size: 'md',
    appearance: 'soft',
    dot: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'primary', 'high', 'medium', 'low', 'danger', 'warning', 'success'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    appearance: { control: 'select', options: ['soft', 'outline', 'solid'] },
    radius: { control: 'select', options: [undefined, 'none', 'sm', 'md', 'lg', 'full'] },
    label: { control: 'text' },
    startIcon: { control: false },
    endIcon: { control: false },
    ref: { control: false },
    className: { control: 'text' },
  },
};

export const Neutral = { name: 'Neutre' };
export const Primary = { name: 'Principal', args: { children: 'Nouveau', variant: 'primary' } };
export const High = { name: 'Élevé', args: { children: 'Élevé', variant: 'high' } };
export const Medium = { name: 'Moyen', args: { children: 'Moyen', variant: 'medium' } };
export const Low = { name: 'Faible', args: { children: 'Faible', variant: 'low' } };
export const Counter = { name: 'Compteur', args: { children: 3, size: 'sm' } };
export const Outline = { name: 'Contour', args: { appearance: 'outline', children: 'Facultatif' } };
export const Solid = {
  name: 'Plein',
  args: { appearance: 'solid', variant: 'primary', children: 'Nouveau' },
};
export const Pill = { name: 'Arrondi complet', args: { radius: 'full', children: 'Catégorie' } };
export const WithDot = {
  name: 'Avec point',
  args: { dot: true, variant: 'success', children: 'Disponible' },
};
export const WithIcon = {
  name: 'Avec icône',
  args: { startIcon: <Check />, variant: 'success', children: 'Correct' },
};
export const Score = {
  args: { startIcon: <Star />, children: '10 points', variant: 'warning' },
};
export const LabelProp = {
  name: 'Propriété label',
  args: { children: undefined, label: 'À la une' },
};
export const Removable = {
  name: 'Suppression',
  args: { children: 'Design', onRemove: fn(), removeLabel: 'Supprimer la catégorie Design' },
  render: function Render(args) {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Badge
        {...args}
        onRemove={(event) => {
          args.onRemove(event);
          setVisible(false);
        }}
      />
    ) : (
      <Button variant="ghost" size="sm" onClick={() => setVisible(true)}>
        Rétablir le badge
      </Button>
    );
  },
};
export const DisabledRemoval = {
  name: 'Suppression désactivée',
  args: {
    children: 'Obligatoire',
    disabled: true,
    onRemove: fn(),
    removeLabel: 'Supprimer la catégorie obligatoire',
  },
};
