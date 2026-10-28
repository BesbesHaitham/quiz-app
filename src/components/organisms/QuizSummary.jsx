import { Square } from 'lucide-react';
import Button from '../atoms/Button';
import CountdownTimer from '../molecules/CountdownTimer';
import AnswerStatistics from '../molecules/AnswerStatistics';
import styles from './QuizSummary.module.css';

export default function QuizSummary({ remaining, duration, statistics, onFinish }) {
  return (
    <aside className={styles.base} aria-label="Quiz status">
      <CountdownTimer remaining={remaining} duration={duration} />
      <AnswerStatistics {...statistics} />
      <div className={styles.finish}>
        <Button
          fullWidth
          size="lg"
          variant="ghost"
          className={styles.finishButton}
          startIcon={<Square fill="currentColor" size={16} />}
          onClick={onFinish}
        >
          Finish Quiz
        </Button>
      </div>
    </aside>
  );
}
