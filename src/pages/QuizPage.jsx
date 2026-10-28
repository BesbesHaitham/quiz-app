import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useQuiz } from '../store/useQuiz';
import { useTheme } from '../store/useTheme';
import { getStatistics, remainingSeconds } from '../store/quizModel';
import QuizLayout from '../components/templates/QuizLayout';
import QuestionNavigator from '../components/organisms/QuestionNavigator';
import QuestionCard from '../components/organisms/QuestionCard';
import QuizSummary from '../components/organisms/QuizSummary';
import QuizResults from '../components/organisms/QuizResults';
import Modal from '../components/molecules/Modal';
import Button from '../components/atoms/Button';
import styles from './QuizPage.module.css';

export default function QuizPage() {
  const { attempt, loaded, now, storageError, recovered, dispatch } = useQuiz();
  const { theme, toggleTheme } = useTheme();
  const [confirmFinish, setConfirmFinish] = useState(false);
  const layoutProps = { theme, onToggleTheme: toggleTheme, loaded, storageError };
  if (!loaded)
    return (
      <QuizLayout {...layoutProps}>
        <div className={styles.loading} role="status">
          <span />
          Getting your quiz ready…
        </div>
      </QuizLayout>
    );
  const statistics = getStatistics(attempt.quiz, attempt.answers);
  const question = attempt.quiz.questions[attempt.currentIndex];
  const navigate = (index) => dispatch({ type: 'navigate', index });
  const finish = () => {
    if (statistics.unanswered > 0) setConfirmFinish(true);
    else dispatch({ type: 'finish' });
  };
  const warning = storageError
    ? 'Your browser could not save your progress. Enable site storage to keep this attempt after closing the page.'
    : recovered
      ? 'The saved attempt could not be restored. A fresh quiz is ready for you.'
      : null;
  return (
    <>
      {warning && (
        <p className={styles.warning} role="alert">
          {warning}
        </p>
      )}
      {attempt.status === 'finished' ? (
        <QuizLayout {...layoutProps}>
          <QuizResults
            attempt={attempt}
            onRestart={() => {
              setConfirmFinish(false);
              dispatch({ type: 'restart' });
              window.scrollTo({ top: 0 });
            }}
          />
        </QuizLayout>
      ) : (
        <QuizLayout
          {...layoutProps}
          navigator={
            <QuestionNavigator
              quiz={attempt.quiz}
              answers={attempt.answers}
              currentIndex={attempt.currentIndex}
              onNavigate={navigate}
            />
          }
          question={
            <QuestionCard
              question={question}
              index={attempt.currentIndex}
              total={statistics.total}
              answer={attempt.answers[question.id]}
              onAnswer={(optionIndex) =>
                dispatch({ type: 'answer', questionId: question.id, optionIndex })
              }
              onNavigate={navigate}
              onFinish={finish}
            />
          }
          summary={
            <QuizSummary
              remaining={remainingSeconds(attempt, now)}
              duration={attempt.durationSeconds}
              statistics={statistics}
              onFinish={finish}
            />
          }
        />
      )}
      {confirmFinish && attempt.status === 'active' && (
        <Modal
          title="Ready to finish?"
          description={`You have ${statistics.unanswered} unanswered ${statistics.unanswered === 1 ? 'question' : 'questions'}. You can still go back and give them a try.`}
          onClose={() => setConfirmFinish(false)}
        >
          <p className={styles.confirmDescription}>
            Finishing will save your result and open your answer review. Unanswered questions earn
            no points.
          </p>
          <div className={styles.dialogActions}>
            <Button variant="secondary" onClick={() => setConfirmFinish(false)}>
              Keep going
            </Button>
            <Button
              onClick={() => {
                setConfirmFinish(false);
                dispatch({ type: 'finish' });
              }}
              endIcon={<ArrowRight />}
            >
              Finish Quiz
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
