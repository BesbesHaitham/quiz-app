import { Check, Minus, X } from 'lucide-react';
import Badge from '../atoms/Badge';
import styles from './QuestionReview.module.css';

export default function QuestionReview({ question, index, answer }) {
  const answered = Number.isInteger(answer);
  const correct = answered && answer === question.correctIndex;
  const label = answered ? (correct ? 'Correct' : 'Incorrect') : 'Not answered';
  return (
    <article className={styles.base} aria-labelledby={`review-${question.id}`}>
      <div className={styles.heading}>
        <span className={styles.number}>Question {index + 1}</span>
        <Badge
          variant={answered ? (correct ? 'success' : 'danger') : 'neutral'}
          startIcon={answered ? correct ? <Check /> : <X /> : <Minus />}
        >
          {label}
        </Badge>
      </div>
      <h3 id={`review-${question.id}`}>{question.text}</h3>
      <ol className={styles.options}>
        {question.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === question.correctIndex;
          const selected = optionIndex === answer;
          return (
            <li
              key={optionIndex}
              className={`${styles.option} ${isCorrect ? styles.correct : selected ? styles.incorrect : ''}`}
            >
              <span>{String.fromCharCode(65 + optionIndex)}.</span>
              <span>{option}</span>
              {isCorrect && (
                <span className={styles.annotation}>
                  <Check size={16} />
                  Correct answer
                </span>
              )}
              {selected && <span className={styles.annotation}>Your answer</span>}
            </li>
          );
        })}
      </ol>
      <p className={styles.explanation}>{question.explanation}</p>
    </article>
  );
}
