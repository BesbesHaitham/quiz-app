import seedQuiz from '../../wiremock/__files/react-basics.json';
import { validQuiz } from '../store/quizModel';

const baseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

export async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
    signal: AbortSignal.timeout(1800),
  });
  if (!response.ok) throw new Error(`Quiz API returned ${response.status}`);
  return response.status === 204 ? null : response.json();
}

export const quizApi = {
  async getQuiz() {
    const quiz = await request('/quizzes/react-basics');
    if (!validQuiz(quiz)) throw new Error('Invalid quiz data');
    return quiz;
  },
  submit: (attempt) =>
    request('/quiz-submissions', { method: 'POST', body: JSON.stringify(attempt) }),
};

export const fallbackQuiz = seedQuiz;
