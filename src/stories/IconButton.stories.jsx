import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import { Moon, Pencil, Plus, Trash2 } from 'lucide-react';
import IconButton from '../components/atoms/IconButton';

export default {
  title: 'Atomes/Bouton avec icône',
  component: IconButton,
  args: {
    label: 'Ajouter une réponse',
    children: <Plus />,
    variant: 'ghost',
    size: 'md',
    loading: false,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'success', 'outline', 'link'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'select', options: [undefined, 'none', 'sm', 'md', 'lg', 'full'] },
    loadingLabel: {
      control: 'text',
      description: 'Nom accessible pendant l’affichage de l’indicateur de chargement.',
    },
    pressed: {
      control: 'boolean',
      description: 'Valeur aria-pressed facultative pour les boutons à bascule.',
    },
    icon: { control: false },
    ref: { control: false },
    children: { control: false },
    className: { control: 'text' },
  },
};

export const Add = { name: 'Ajouter' };
export const Edit = {
  name: 'Modifier',
  args: { label: 'Modifier la réponse', children: <Pencil />, variant: 'secondary' },
};
export const Delete = {
  name: 'Supprimer',
  args: { label: 'Supprimer la réponse', children: <Trash2 />, variant: 'danger' },
};
export const ThemeToggle = {
  name: 'Changer de thème',
  args: { label: 'Changer de thème', children: <Moon /> },
};
export const Disabled = { name: 'Désactivé', args: { disabled: true } };
export const Loading = {
  name: 'Chargement',
  args: { loading: true, loadingLabel: 'Ajout de la réponse' },
};
export const Round = { name: 'Rond', args: { radius: 'full', variant: 'primary' } };
export const Outline = { name: 'Contour', args: { variant: 'outline' } };
export const IconProp = {
  name: 'Propriété icon',
  args: { children: undefined, icon: <Pencil />, label: 'Modifier la réponse' },
};
export const ExtraSmall = { name: 'Très petit', args: { size: 'xs' } };
export const ExtraLarge = { name: 'Très grand', args: { size: 'xl' } };
export const Toggle = {
  name: 'Bascule',
  args: { label: 'Activer le thème sombre', children: <Moon />, pressed: false },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <IconButton
        {...args}
        onClick={(event) => {
          args.onClick(event);
          updateArgs({ pressed: !args.pressed });
        }}
      />
    );
  },
};
