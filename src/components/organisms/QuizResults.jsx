import { useEffect, useRef } from 'react';
import { ArrowDown, RotateCcw, Trophy } from 'lucide-react';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import QuestionReview from '../molecules/QuestionReview';
import { formatTime, getStatistics } from '../../store/quizModel';
import styles from './QuizResults.module.css';

export default function QuizResults({ attempt, onRestart }) {
  const titleRef = useRef(null);
  const statistics = getStatistics(attempt.quiz, attempt.answers);
  const elapsed = Math.max(0, Math.round((attempt.submittedAt - attempt.startedAt) / 1000));
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, []);
  return (
    <div className={styles.base}>
      <section className={styles.hero} aria-labelledby="results-title">
        <div className={styles.trophy}>
          <Trophy size={30} aria-hidden="true" />
        </div>
        <Badge variant="primary">{attempt.quiz.title} · Résultats</Badge>
        <h2 id="results-title" ref={titleRef} tabIndex={-1}>
          Un pas de plus dans votre apprentissage.
        </h2>
        <p>
          {attempt.reason === 'expired'
            ? 'Temps écoulé ! Vos réponses ont été envoyées automatiquement.'
            : 'Quiz terminé ! Découvrez vos résultats.'}
        </p>
        <div className={styles.score}>
          <strong>
            {statistics.percentage}
            <span> %</span>
          </strong>
          <span>
            {statistics.correct} {statistics.correct === 1 ? 'bonne réponse' : 'bonnes réponses'}{' '}
            sur {statistics.total}
          </span>
        </div>
        <div className={styles.statistics}>
          <div>
            <strong className={styles.correct}>{statistics.correct}</strong>
            <span>Bonnes réponses</span>
          </div>
          <div>
            <strong className={styles.incorrect}>{statistics.incorrect}</strong>
            <span>Mauvaises réponses</span>
          </div>
          <div>
            <strong>{statistics.unanswered}</strong>
            <span>Sans réponse</span>
          </div>
          <div>
            <strong>{formatTime(elapsed)}</strong>
            <span>Temps passé</span>
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            variant="secondary"
            startIcon={<ArrowDown />}
            onClick={() =>
              document.getElementById('question-review')?.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'instant'
                  : 'smooth',
              })
            }
          >
            Voir le corrigé
          </Button>
          <Button startIcon={<RotateCcw />} onClick={onRestart}>
            Recommencer
          </Button>
        </div>
      </section>
      <section className={styles.review} id="question-review" aria-labelledby="review-title">
        <div className={styles.reviewHeading}>
          <h2 id="review-title">Le corrigé en détail</h2>
          <p>Chaque question est une occasion d’apprendre.</p>
        </div>
        {attempt.quiz.questions.map((question, index) => (
          <QuestionReview
            key={question.id}
            question={question}
            index={index}
            answer={attempt.answers[question.id]}
          />
        ))}
      </section>
    </div>
  );
}
