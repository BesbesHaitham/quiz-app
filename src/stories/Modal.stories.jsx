import { useState } from 'react';
import { fn } from 'storybook/test';
import Modal from '../components/molecules/Modal';
import Button from '../components/atoms/Button';

export default {
  title: 'Molécules/Fenêtre modale',
  component: Modal,
  args: {
    title: 'Terminer le quiz ?',
    description:
      'Il reste 8 questions sans réponse. Vous pouvez encore revenir en arrière pour y répondre.',
    onClose: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'Fenêtre modale native avec focus contenu dans la fenêtre, fermeture par Échap ou clic extérieur, contenu étiqueté, défilement bloqué et restauration du focus.',
      },
    },
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Ouvrir la confirmation de fin</Button>
        {open && (
          <Modal
            {...args}
            onClose={() => {
              args.onClose();
              setOpen(false);
            }}
          >
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Continuer
            </Button>
          </Modal>
        )}
      </>
    );
  },
};
export const FinishConfirmation = { name: 'Confirmation de fin' };
