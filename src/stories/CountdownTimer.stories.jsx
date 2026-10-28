import CountdownTimer from '../components/molecules/CountdownTimer';

export default {
  title: 'Molecules/CountdownTimer',
  component: CountdownTimer,
  parameters: { frame: 'card' },
  args: { remaining: 504, duration: 600 },
  argTypes: { remaining: { control: { type: 'range', min: 0, max: 600, step: 1 } } },
};
export const InProgress = {};
export const JustStarted = { args: { remaining: 600 } };
export const LastMinute = { args: { remaining: 35 } };
export const Expired = { args: { remaining: 0 } };
