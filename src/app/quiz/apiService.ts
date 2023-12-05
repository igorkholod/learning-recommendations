import { getRandomInt } from '@/lib/utils/random';
import { Question, QuestionResult } from '@/lib/types';
import { getMaterials } from '@/lib/data/materials/apiService';
import { getQuestionMaterialScore } from '@/lib/scoring/question-material';
import { QuizResult } from '@/app/quiz/types';
import {
  getAllQuestions,
  getAllUserAnsweredQuestions,
  getUserAnswerStats,
} from '@/lib/data/questions/apiService';
import { getUserStatsQuestionScore } from '@/lib/scoring/userStats-quizQuestion';

export const getRecommendedQuestion = async ({
  quizResults,
  userId,
}: {
  quizResults: QuizResult[];
  userId: string;
}) => {
  const allQuestions = await getAllQuestions();
  const { tagStats, difficultyStats } = await getUserAnswerStats([
    'recQ',
    userId,
  ]);
  const allAnsweredQuestions = await getAllUserAnsweredQuestions(userId);

  const scoredQuestions = allQuestions
    .map((question) => ({
      ...question,
      score: getUserStatsQuestionScore({
        question,
        difficultyStats,
        tagStats,
        quizResults,
        answeredQuestions: allAnsweredQuestions,
      }),
    }))
    .sort((a, b) => b.score - a.score);

  return scoredQuestions[0];
};

export const submitResult = async ({
  userId,
  questionId,
  result,
}: {
  userId: string;
  questionId: string;
  result: QuestionResult;
}) => {
  return await fetch('/api/users/question-results', {
    method: 'POST',
    body: JSON.stringify({ userId, questionId, result }),
  });
};

export const getRecommendedMaterialsForQuestion = async (
  question: Question,
  userId: string,
) => {
  const materials = await getMaterials(['recMatForQ', userId]);

  return materials
    .map((material) => {
      const score = getQuestionMaterialScore(question, material);

      return { score, material };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ material }) => material);
};
