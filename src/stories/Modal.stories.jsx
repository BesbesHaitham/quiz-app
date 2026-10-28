import { useState } from 'react';
import { fn } from 'storybook/test';
import Modal from '../components/molecules/Modal';
import Button from '../components/atoms/Button';

export default {
  title: 'Molecules/Modal',
  component: Modal,
  args: {
    title: 'Ready to finish?',
    description: 'You have 8 unanswered questions. You can still go back and give them a try.',
    onClose: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'Native dialog with focus trapping, Escape/backdrop dismissal, labelled content, scroll locking, and focus restoration.',
      },
    },
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open finish confirmation</Button>
        {open && (
          <Modal
            {...args}
            onClose={() => {
              args.onClose();
              setOpen(false);
            }}
          >
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Keep going
            </Button>
          </Modal>
        )}
      </>
    );
  },
};
export const FinishConfirmation = {};
