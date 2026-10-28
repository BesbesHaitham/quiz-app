import { MemoryRouter } from 'react-router-dom';
import { useArgs, useGlobals } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import QuizLayout from '../components/templates/QuizLayout';
import QuestionNavigator from '../components/organisms/QuestionNavigator';
import QuestionCard from '../components/organisms/QuestionCard';
import QuizSummary from '../components/organisms/QuizSummary';
import { sampleQuiz, sampleAttempt } from './storyData';

export default {
  title: 'Modèles/Disposition du quiz',
  component: QuizLayout,
  parameters: { layout: 'fullscreen', frame: 'board' },
  args: { currentIndex: 2, answers: sampleAttempt.answers, onFinish: fn(), onToggleTheme: fn() },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    const [globals, updateGlobals] = useGlobals();
    const question = sampleQuiz.questions[args.currentIndex];
    const navigate = (currentIndex) => updateArgs({ currentIndex });
    return (
      <MemoryRouter>
        <QuizLayout
          theme={globals.theme}
          onToggleTheme={() => {
            args.onToggleTheme();
            updateGlobals({ theme: globals.theme === 'light' ? 'dark' : 'light' });
          }}
          navigator={
            <QuestionNavigator
              quiz={sampleQuiz}
              currentIndex={args.currentIndex}
              answers={args.answers}
              onNavigate={navigate}
            />
          }
          question={
            <QuestionCard
              question={question}
              index={args.currentIndex}
              total={10}
              answer={args.answers[question.id]}
              onAnswer={(optionIndex) =>
                updateArgs({ answers: { ...args.answers, [question.id]: optionIndex } })
              }
              onNavigate={navigate}
              onFinish={args.onFinish}
            />
          }
          summary={<QuizSummary duration={600} remaining={504} onFinish={args.onFinish} />}
        />
      </MemoryRouter>
    );
  },
};
export const InProgress = { name: 'En cours' };
export const FreshAttempt = { name: 'Nouvelle tentative', args: { currentIndex: 0, answers: {} } };
export const Dark = { name: 'Thème sombre', globals: { theme: 'dark' } };
