import { formatTime } from '../../store/quizModel';
import styles from './CountdownTimer.module.css';

export default function CountdownTimer({ remaining, duration }) {
  const elapsed = Math.max(0, Math.min(1, 1 - remaining / duration));
  const urgent = remaining <= Math.min(60, duration * 0.2);
  return (
    <section
      className={`${styles.base} ${urgent ? styles.urgent : ''}`}
      aria-label="Quiz countdown"
    >
      <div className={styles.ring}>
        <svg viewBox="0 0 220 220" aria-hidden="true">
          <circle className={styles.track} cx="110" cy="110" r="100" />
          <circle
            className={styles.elapsed}
            cx="110"
            cy="110"
            r="100"
            pathLength="1"
            strokeDasharray={`${elapsed} 1`}
          />
        </svg>
        <div
          className={styles.content}
          role="timer"
          aria-live="off"
          aria-label={`${formatTime(remaining)} remaining`}
        >
          <strong>{formatTime(remaining)}</strong>
          <span>Time left</span>
        </div>
      </div>
      {urgent && (
        <span className="sr-only" role="status">
          Less than a minute left. Your quiz will submit automatically when time runs out.
        </span>
      )}
    </section>
  );
}
