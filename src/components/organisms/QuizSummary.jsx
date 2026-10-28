import { Square } from 'lucide-react';
import Button from '../atoms/Button';
import CountdownTimer from '../molecules/CountdownTimer';
import styles from './QuizSummary.module.css';

export default function QuizSummary({ remaining, duration, onFinish }) {
  return (
    <aside className={styles.base} aria-label="État du quiz">
      <CountdownTimer remaining={remaining} duration={duration} />
      <div className={styles.finish}>
        <Button
          fullWidth
          size="lg"
          variant="ghost"
          className={styles.finishButton}
          startIcon={<Square fill="currentColor" size={16} />}
          onClick={onFinish}
        >
          Terminer le quiz
        </Button>
      </div>
    </aside>
  );
}
