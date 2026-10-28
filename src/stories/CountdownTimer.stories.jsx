import CountdownTimer from '../components/molecules/CountdownTimer';

export default {
  title: 'Molécules/Compte à rebours',
  component: CountdownTimer,
  parameters: { frame: 'card' },
  args: { remaining: 504, duration: 600 },
  argTypes: { remaining: { control: { type: 'range', min: 0, max: 600, step: 1 } } },
};
export const InProgress = { name: 'En cours' };
export const JustStarted = { name: 'Au démarrage', args: { remaining: 600 } };
export const LastMinute = { name: 'Dernière minute', args: { remaining: 35 } };
export const Expired = { name: 'Temps écoulé', args: { remaining: 0 } };
