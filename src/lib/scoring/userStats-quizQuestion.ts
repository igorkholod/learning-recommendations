import {
  AnsweredQuestion,
  AnswerStats,
  AnswerStatsByValue,
  Difficulty,
  DIFFICULTY_SCORE,
  Question,
} from '@/lib/types';
import { QuizResult } from '@/app/quiz/types';

const getDifficultyAdjustmentFactor = (
  userDifficultyStats: AnswerStatsByValue,
  questionDifficulty: Difficulty,
): number => {
  const userTotalAttempts = Object.values(userDifficultyStats).reduce(
    (total, stats) => total + stats.correct + stats.incorrect,
    0,
  );

  const userPerformance = (
    stats: AnswerStats = { correct: 0, incorrect: 0, lastInteraction: 0 },
  ) => (stats.correct + stats.incorrect) / userTotalAttempts;
  return Object.keys(DIFFICULTY_SCORE)
    .filter((difficulty) => difficulty !== questionDifficulty)
    .map(
      (difficulty) =>
        userPerformance(userDifficultyStats[questionDifficulty]) -
          userPerformance(userDifficultyStats[difficulty]) || 0,
    )
    .reduce((acc, val) => acc + val, 0);
};

export const getUserStatsQuestionScore = ({
  question,
  difficultyStats,
  tagStats,
  quizResults,
  answeredQuestions,
}: {
  question: Question;
  tagStats: AnswerStatsByValue;
  difficultyStats: AnswerStatsByValue;
  quizResults: QuizResult[];
  answeredQuestions: AnsweredQuestion[];
}) => {
  const currentTime = Date.now();
  const questionAlreadyAnsweredThisQuiz = quizResults.some(
    (result) => result.question.id === question.id,
  );

  const answerRecords = answeredQuestions
    .filter((answeredQuestion) => answeredQuestion.id === question.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const lastRecord = answerRecords[0];

  const questionAlreadyAnsweredRecently =
    !!lastRecord &&
    new Date(lastRecord.createdAt).getTime() >= currentTime - 86400 * 1000; // 24 hours

  let score = 0;

  const weights = {
    tagFactor: 100,
    difficultyAdjustment: 10,
    timeFactor: 0.1,
    answeredThisQuizPenalty: 1000,
    answeredRecentlyPenalty: 500,
  };

  question.tags.forEach((tag) => {
    if (tagStats.hasOwnProperty(tag)) {
      const correct = tagStats[tag].correct;
      const incorrect = tagStats[tag].incorrect;
      const total = correct + incorrect;

      score += (incorrect / total) * weights.tagFactor;
    }
  });

  if (difficultyStats.hasOwnProperty(question.difficulty)) {
    const difficultyAdjustment = getDifficultyAdjustmentFactor(
      difficultyStats,
      question.difficulty,
    );
    score += weights.difficultyAdjustment * difficultyAdjustment;
  }

  if (questionAlreadyAnsweredThisQuiz) {
    score -= weights.answeredThisQuizPenalty;
  } else if (questionAlreadyAnsweredRecently) {
    score -= weights.answeredRecentlyPenalty;
  }

  return score;
};
