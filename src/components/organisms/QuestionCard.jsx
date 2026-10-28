import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import AnswerOption from '../molecules/AnswerOption';
import { DIFFICULTY_LABELS } from '../../store/quizModel';
import styles from './QuestionCard.module.css';

export default function QuestionCard({
  question,
  index,
  total,
  answer,
  onAnswer,
  onNavigate,
  onFinish,
}) {
  const titleRef = useRef(null);
  const previousQuestion = useRef(question.id);
  useEffect(() => {
    if (previousQuestion.current !== question.id) {
      titleRef.current?.focus({ preventScroll: true });
      previousQuestion.current = question.id;
    }
  }, [question.id]);
  return (
    <section className={styles.base} aria-labelledby="question-title">
      <div className={styles.badges}>
        <Badge size="lg" className={styles.questionBadge}>
          Question {index + 1} sur {total}
        </Badge>
        <Badge
          size="lg"
          className={`${styles.difficulty} ${styles[question.difficulty.toLowerCase()]}`}
        >
          {DIFFICULTY_LABELS[question.difficulty]}
        </Badge>
      </div>
      <h2 id="question-title" className={styles.title} ref={titleRef} tabIndex={-1}>
        {question.text}
      </h2>
      <fieldset className={styles.options} key={question.id}>
        <legend className="sr-only">Choisissez une réponse : {question.text}</legend>
        {question.options.map((option, optionIndex) => (
          <AnswerOption
            key={optionIndex}
            name={`question-${question.id}`}
            option={option}
            index={optionIndex}
            checked={answer === optionIndex}
            onChange={onAnswer}
          />
        ))}
      </fieldset>
      <div className={styles.navigation}>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => onNavigate(index - 1)}
          disabled={index === 0}
          startIcon={<ArrowLeft />}
          className={styles.previous}
        >
          Précédent
        </Button>
        {index === total - 1 ? (
          <Button size="lg" onClick={onFinish} endIcon={<Check />} className={styles.next}>
            Terminer le quiz
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={() => onNavigate(index + 1)}
            endIcon={<ArrowRight />}
            className={styles.next}
          >
            Suivant
          </Button>
        )}
      </div>
    </section>
  );
}
