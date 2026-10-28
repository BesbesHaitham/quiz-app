import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import brand from '../../assets/brand.svg';
import IconButton from '../atoms/IconButton';
import styles from './QuizLayout.module.css';

export default function QuizLayout({
  theme,
  onToggleTheme,
  navigator,
  question,
  summary,
  children,
  loaded = true,
  storageError = false,
}) {
  return (
    <div className={styles.base}>
      <a href="#main-content" className="sr-only skip-link">
        Aller au quiz
      </a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.brand} aria-label="Accueil QuizApp">
            <img src={brand} width="56" height="56" alt="" />
            <h1>QuizApp</h1>
          </Link>
          <IconButton
            label={`Activer le thème ${theme === 'light' ? 'sombre' : 'clair'}`}
            pressed={theme === 'dark'}
            onClick={onToggleTheme}
            className={styles.themeToggle}
            radius="full"
          >
            {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
          </IconButton>
        </div>
      </header>
      <main id="main-content" className={styles.main} tabIndex={-1}>
        {children || (
          <div className={styles.grid}>
            <div className={styles.navigator}>{navigator}</div>
            <div className={styles.question}>{question}</div>
            <div className={styles.summary}>{summary}</div>
          </div>
        )}
      </main>
      <footer className={styles.footer}>
        <span>
          <span className={`${styles.dot} ${storageError ? styles.warningDot : ''}`} />
          {!loaded
            ? 'Préparation de votre quiz…'
            : storageError
              ? 'Stockage indisponible · session en cours uniquement'
              : 'Votre progression est enregistrée sur cet appareil'}
        </span>
        <span>Une question, un pas de plus.</span>
      </footer>
    </div>
  );
}
