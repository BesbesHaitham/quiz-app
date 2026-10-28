import { Check, X } from 'lucide-react';
import styles from './AnswerStatistics.module.css';

export default function AnswerStatistics({ correct, incorrect, unanswered }) {
  return (
    <section className={styles.base} aria-label="Answer statistics">
      <dl>
        {[
          { label: 'Correct', value: correct, variant: 'correct', icon: <Check /> },
          { label: 'Incorrect', value: incorrect, variant: 'incorrect', icon: <X /> },
          { label: 'Not answered', value: unanswered, variant: 'unanswered', icon: null },
        ].map(({ label, value, variant, icon }) => (
          <div key={label} className={styles.row}>
            <dt>
              <span className={`${styles.icon} ${styles[variant]}`} aria-hidden="true">
                {icon}
              </span>
              {label}
            </dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
