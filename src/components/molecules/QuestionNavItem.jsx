import styles from './QuestionNavItem.module.css';

export default function QuestionNavItem({ question, index, active = false, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.base} ${active ? styles.active : ''}`}
      onClick={onClick}
      aria-current={active ? 'step' : undefined}
      aria-label={`Question ${index + 1} : ${question.text}`}
      title={question.text}
    >
      <span className={styles.number}>{index + 1}</span>
      <span className={styles.text}>{question.text}</span>
    </button>
  );
}
