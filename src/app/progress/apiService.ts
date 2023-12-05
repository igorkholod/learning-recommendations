import {
  getAllQuestions,
  getUserAnsweredQuestionsUnique,
} from '@/lib/data/questions/apiService';
import {
  EntityProgressByValue,
  QuestionResult,
  UserProgress,
} from '@/lib/types';

export const getUserProgress = async (
  userId: string,
): Promise<UserProgress> => {
  const allQuestions = await getAllQuestions();
  const answeredQuestions = await getUserAnsweredQuestionsUnique(userId);

  const tagProgress: EntityProgressByValue = {};
  const difficultyProgress: EntityProgressByValue = {};

  allQuestions.forEach(({ difficulty, tags }) => {
    if (!difficultyProgress.hasOwnProperty(difficulty)) {
      difficultyProgress[difficulty] = { total: 0, correctlyAnswered: 0 };
    }

    difficultyProgress[difficulty].total += 1;

    tags.forEach((tag) => {
      if (!tagProgress.hasOwnProperty(tag)) {
        tagProgress[tag] = { total: 0, correctlyAnswered: 0 };
      }

      tagProgress[tag].total += 1;
    });
  });

  answeredQuestions.forEach(({ difficulty, tags, result }) => {
    if (result === QuestionResult.Wrong) {
      return;
    }

    difficultyProgress[difficulty].correctlyAnswered += 1;

    tags.forEach((tag) => {
      tagProgress[tag].correctlyAnswered += 1;
    });
  });

  return {
    tagsProgress: tagProgress,
    difficultyProgress,
  };
};
