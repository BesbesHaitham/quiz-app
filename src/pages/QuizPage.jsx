import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useQuiz } from '../store/useQuiz';
import { useTheme } from '../store/useTheme';
import { remainingSeconds } from '../store/quizModel';
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
          Préparation de votre quiz…
        </div>
      </QuizLayout>
    );
  const total = attempt.quiz.questions.length;
  const unanswered = total - Object.keys(attempt.answers).length;
  const question = attempt.quiz.questions[attempt.currentIndex];
  const navigate = (index) => dispatch({ type: 'navigate', index });
  const finish = () => {
    if (unanswered > 0) setConfirmFinish(true);
    else dispatch({ type: 'finish' });
  };
  const warning = storageError
    ? 'Votre navigateur n’a pas pu enregistrer votre progression. Autorisez le stockage du site pour conserver cette tentative après la fermeture de la page.'
    : recovered
      ? 'La tentative enregistrée n’a pas pu être restaurée. Un nouveau quiz est prêt.'
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
              total={total}
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
              onFinish={finish}
            />
          }
        />
      )}
      {confirmFinish && attempt.status === 'active' && (
        <Modal
          title="Terminer le quiz ?"
          description={`Il reste ${unanswered} ${unanswered === 1 ? 'question sans réponse' : 'questions sans réponse'}. Vous pouvez encore revenir en arrière pour y répondre.`}
          onClose={() => setConfirmFinish(false)}
        >
          <p className={styles.confirmDescription}>
            En terminant, votre résultat sera enregistré et vous pourrez consulter le corrigé. Les
            questions sans réponse ne rapportent aucun point.
          </p>
          <div className={styles.dialogActions}>
            <Button variant="secondary" onClick={() => setConfirmFinish(false)}>
              Continuer
            </Button>
            <Button
              onClick={() => {
                setConfirmFinish(false);
                dispatch({ type: 'finish' });
              }}
              endIcon={<ArrowRight />}
            >
              Terminer le quiz
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
