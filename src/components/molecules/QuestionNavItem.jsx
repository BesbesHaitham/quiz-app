import { Check, X } from 'lucide-react';
import styles from './QuestionNavItem.module.css';

export default function QuestionNavItem({ question, index, active = false, answer, onClick }) {
  const answered = Number.isInteger(answer);
  const correct = answered && answer === question.correctIndex;
  const status = answered ? (correct ? 'Correct' : 'Incorrect') : 'Not answered';
  return (
    <button
      type="button"
      className={`${styles.base} ${active ? styles.active : ''}`}
      onClick={onClick}
      aria-current={active ? 'step' : undefined}
      aria-label={`Question ${index + 1}: ${question.text} ${status}`}
      title={question.text}
    >
      <span className={styles.number}>{index + 1}</span>
      <span className={styles.text}>{question.text}</span>
      <span
        className={`${styles.status} ${answered ? (correct ? styles.correct : styles.incorrect) : ''}`}
        aria-hidden="true"
      >
        {answered &&
          (correct ? <Check size={15} strokeWidth={3} /> : <X size={15} strokeWidth={3} />)}
      </span>
    </button>
  );
}
