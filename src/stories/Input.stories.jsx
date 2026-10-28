import { fn } from 'storybook/test';
import { useRef } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

export default {
  title: 'Atomes/Champ de saisie',
  component: Input,
  args: {
    placeholder: 'Saisissez une réponse…',
    'aria-label': 'Exemple de champ',
    variant: 'default',
    size: 'md',
    fullWidth: true,
    invalid: false,
    disabled: false,
    readOnly: false,
    required: false,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    as: { control: 'select', options: ['input', 'textarea', 'select'] },
    variant: { control: 'select', options: ['default', 'filled', 'underline'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'select', options: [undefined, 'none', 'sm', 'md', 'lg', 'full'] },
    resize: { control: 'select', options: [undefined, 'none', 'vertical', 'horizontal', 'both'] },
    htmlSize: {
      control: 'number',
      description: 'Attribut HTML size ; la taille visuelle utilise la propriété size.',
    },
    options: {
      control: 'object',
      description:
        'Options de sélection facultatives : { value, label, disabled }[]. Les enfants sont prioritaires.',
    },
    ref: { control: false },
    className: { control: 'text' },
  },
};

export const Default = { name: 'Par défaut' };
export const Filled = { name: 'Fond rempli', args: { variant: 'filled' } };
export const Description = {
  args: { as: 'textarea', rows: 4, placeholder: 'Ajoutez quelques détails…' },
};
export const Select = {
  name: 'Liste de sélection',
  args: {
    as: 'select',
    defaultValue: 'medium',
    children: (
      <>
        <option value="high">Élevé</option>
        <option value="medium">Moyen</option>
        <option value="low">Faible</option>
      </>
    ),
  },
};
export const DueDate = { name: 'Date', args: { type: 'date', defaultValue: '2026-10-28' } };
export const Invalid = {
  name: 'Invalide',
  args: { 'aria-invalid': true, defaultValue: 'Exemple invalide' },
};
export const Disabled = { name: 'Désactivé', args: { disabled: true } };
export const Underline = { name: 'Souligné', args: { variant: 'underline' } };
export const ReadOnly = {
  name: 'Lecture seule',
  args: { readOnly: true, defaultValue: 'Réponse en lecture seule' },
};
export const RequiredEmail = {
  name: 'Courriel obligatoire',
  args: {
    type: 'email',
    name: 'email',
    autoComplete: 'email',
    required: true,
    placeholder: 'vous@exemple.fr',
  },
};
export const Numeric = {
  name: 'Nombre',
  args: { type: 'number', min: 1, max: 10, step: 1, defaultValue: 5 },
};
export const Password = {
  name: 'Mot de passe',
  args: { type: 'password', autoComplete: 'new-password', minLength: 8 },
};
export const WithValidationState = {
  name: 'Avec validation',
  args: { invalid: true, defaultValue: 'Mauvaise réponse' },
};
export const FixedTextarea = {
  name: 'Zone de texte fixe',
  args: { as: 'textarea', resize: 'none', rows: 4, maxLength: 500 },
};
export const Compact = { args: { size: 'xs', fullWidth: false, htmlSize: 12 } };
export const SelectFromOptions = {
  name: 'Liste à partir des options',
  args: {
    as: 'select',
    defaultValue: 'medium',
    options: [
      { value: 'high', label: 'Élevé' },
      { value: 'medium', label: 'Moyen' },
      { value: 'low', label: 'Faible', disabled: true },
    ],
  },
};
export const MultipleSelect = {
  name: 'Sélection multiple',
  args: {
    ...SelectFromOptions.args,
    multiple: true,
    defaultValue: ['high', 'medium'],
    htmlSize: 3,
  },
};
export const FocusWithRef = {
  name: 'Focus avec ref',
  render: function Render(args) {
    const ref = useRef(null);
    return (
      <>
        <Button variant="secondary" onClick={() => ref.current?.focus()}>
          Placer le focus sur le champ
        </Button>
        <Input {...args} ref={ref} />
      </>
    );
  },
};
