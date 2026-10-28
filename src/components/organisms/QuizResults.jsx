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
        <Badge variant="primary">{attempt.quiz.title} · Results</Badge>
        <h2 id="results-title" ref={titleRef} tabIndex={-1}>
          A little wiser. A step ahead.
        </h2>
        <p>
          {attempt.reason === 'expired'
            ? 'Time’s up! Your answers were submitted automatically.'
            : 'Quiz complete! Here’s how you did.'}
        </p>
        <div className={styles.score}>
          <strong>
            {statistics.percentage}
            <span>%</span>
          </strong>
          <span>
            {statistics.correct} out of {statistics.total} correct
          </span>
        </div>
        <div className={styles.statistics}>
          <div>
            <strong className={styles.correct}>{statistics.correct}</strong>
            <span>Correct</span>
          </div>
          <div>
            <strong className={styles.incorrect}>{statistics.incorrect}</strong>
            <span>Incorrect</span>
          </div>
          <div>
            <strong>{statistics.unanswered}</strong>
            <span>Not answered</span>
          </div>
          <div>
            <strong>{formatTime(elapsed)}</strong>
            <span>Time taken</span>
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
            Review answers
          </Button>
          <Button startIcon={<RotateCcw />} onClick={onRestart}>
            Restart Quiz
          </Button>
        </div>
      </section>
      <section className={styles.review} id="question-review" aria-labelledby="review-title">
        <div className={styles.reviewHeading}>
          <h2 id="review-title">Let’s break it down</h2>
          <p>Every question is a chance to learn something new.</p>
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
