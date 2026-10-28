import QuestionNavItem from '../molecules/QuestionNavItem';
import styles from './QuestionNavigator.module.css';

export default function QuestionNavigator({ quiz, answers, currentIndex, onNavigate }) {
  const answered = quiz.questions.filter((question) => Object.hasOwn(answers, question.id)).length;
  return (
    <aside className={styles.base} aria-label="Questions du quiz">
      <header className={styles.header}>
        <h2>{quiz.title}</h2>
        <p>{quiz.description}</p>
        <div className={styles.progressRow}>
          <div
            className={styles.track}
            role="progressbar"
            aria-label="Questions répondues"
            aria-valuemin={0}
            aria-valuemax={quiz.questions.length}
            aria-valuenow={answered}
          >
            <span style={{ width: `${(answered / quiz.questions.length) * 100}%` }} />
          </div>
          <span>
            {answered} / {quiz.questions.length}
          </span>
        </div>
      </header>
      <nav aria-label="Aller à une question" className={styles.nav}>
        <ol>
          {quiz.questions.map((question, index) => (
            <li key={question.id}>
              <QuestionNavItem
                question={question}
                index={index}
                active={index === currentIndex}
                onClick={() => onNavigate(index)}
              />
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
