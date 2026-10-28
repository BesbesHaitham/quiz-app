import styles from './AnswerOption.module.css';

/** Native radio semantics provide Tab, arrow-key and Space selection. */
export default function AnswerOption({
  option,
  index,
  name,
  checked = false,
  onChange,
  disabled = false,
}) {
  return (
    <label className={`${styles.base} ${checked ? styles.selected : ''}`}>
      <input
        type="radio"
        name={name}
        value={index}
        checked={checked}
        onChange={() => onChange(index)}
        disabled={disabled}
      />
      <span className={styles.letter}>{String.fromCharCode(65 + index)}.</span>
      <span className={styles.text}>{option}</span>
    </label>
  );
}
