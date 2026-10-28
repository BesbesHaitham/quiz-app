import { fn } from 'storybook/test';
import quiz from '../../wiremock/__files/react-basics.json';
import { createAttempt } from '../store/quizModel';

export const sampleQuiz = quiz;
export const sampleQuestion = quiz.questions[2];
export const sampleAttempt = {
  ...createAttempt(quiz, { now: 1793200000000, id: 'storybook-attempt' }),
  currentIndex: 2,
  answers: { react: 1, components: 0, state: 2 },
};
export const finishedAttempt = {
  ...sampleAttempt,
  status: 'finished',
  reason: 'manual',
  submittedAt: sampleAttempt.startedAt + 240000,
  answers: {
    react: 1,
    components: 0,
    state: 2,
    'state-syntax': 1,
    jsx: 3,
    props: 0,
    lists: 2,
    effects: 0,
    immutability: 1,
  },
};
export const questionActions = () => ({ onAnswer: fn(), onNavigate: fn(), onFinish: fn() });
