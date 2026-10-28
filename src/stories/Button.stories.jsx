import { fn } from 'storybook/test';
import { ArrowRight, Download, Plus } from 'lucide-react';
import Button from '../components/atoms/Button';

export default {
  title: 'Atomes/Bouton',
  component: Button,
  args: {
    children: 'Enregistrer les modifications',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'success', 'outline', 'link'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'select', options: [undefined, 'none', 'sm', 'md', 'lg', 'full'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    label: { control: 'text', description: 'Texte affiché lorsque children n’est pas fourni.' },
    loadingLabel: { control: 'text' },
    startIcon: { control: false },
    endIcon: { control: false },
    ref: { control: false },
    className: { control: 'text' },
  },
};

export const Primary = { name: 'Principal' };
export const Secondary = { name: 'Secondaire', args: { variant: 'secondary' } };
export const Ghost = { name: 'Discret', args: { variant: 'ghost' } };
export const Danger = {
  args: { variant: 'danger', children: 'Supprimer la réponse' },
};
export const Disabled = { name: 'Désactivé', args: { disabled: true } };
export const Small = { name: 'Petit', args: { size: 'sm' } };
export const Large = { name: 'Grand', args: { size: 'lg' } };
export const ExtraSmall = { name: 'Très petit', args: { size: 'xs' } };
export const ExtraLarge = { name: 'Très grand', args: { size: 'xl' } };
export const Outline = { name: 'Contour', args: { variant: 'outline' } };
export const Success = { name: 'Succès', args: { variant: 'success', children: 'Bonne réponse' } };
export const Link = { name: 'Lien', args: { variant: 'link', children: 'Voir les détails' } };
export const Loading = { name: 'Chargement', args: { loading: true } };
export const LoadingWithLabel = {
  name: 'Chargement avec texte',
  args: { loading: true, loadingLabel: 'Enregistrement…' },
};
export const WithIcons = {
  name: 'Avec icônes',
  args: { startIcon: <Plus />, endIcon: <ArrowRight />, children: 'Ajouter une question' },
};
export const DownloadAction = {
  name: 'Télécharger',
  args: { startIcon: <Download />, children: 'Télécharger les résultats' },
};
export const FullWidth = { name: 'Pleine largeur', args: { fullWidth: true } };
export const Pill = { name: 'Arrondi complet', args: { radius: 'full' } };
export const LabelProp = {
  name: 'Propriété label',
  args: { children: undefined, label: 'Continuer' },
};
