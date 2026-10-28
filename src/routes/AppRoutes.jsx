import { Navigate, Route, Routes } from 'react-router-dom';
import QuizPage from '../pages/QuizPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<QuizPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
