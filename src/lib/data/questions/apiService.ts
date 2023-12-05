import {
  AnsweredQuestion,
  AnswerStatsByValue,
  Question,
  QuestionResult,
} from '@/lib/types';

export const getAllUserAnsweredQuestions = async (
  userId: string,
): Promise<AnsweredQuestion[]> => {
  const res = await fetch(`/api/users/${userId}/answered-questions`, {
    method: 'GET',
  });
  return await res.json();
};

export const getUserTagStats = async ([_, userId]: [
  string,
  string,
]): Promise<AnswerStatsByValue> => {
  const allAnsweredQuestions = await getAllUserAnsweredQuestions(userId);

  const tagStats: AnswerStatsByValue = {};

  allAnsweredQuestions.forEach((question) => {
    question.tags.forEach((tag) => {
      if (!tagStats.hasOwnProperty(tag)) {
        tagStats[tag] = { correct: 0, incorrect: 0, lastInteraction: 0 };
      }

      if (question.result === QuestionResult.Correct) {
        tagStats[tag].correct++;
      } else {
        tagStats[tag].incorrect++;
      }

      if (
        new Date(question.createdAt).getTime() > tagStats[tag].lastInteraction
      ) {
        tagStats[tag].lastInteraction = new Date(question.createdAt).getTime();
      }
    });
  });
  return tagStats;
};
export const getUserDifficultyStats = async ([_, userId]: [
  string,
  string,
]): Promise<AnswerStatsByValue> => {
  const allAnsweredQuestions = await getAllUserAnsweredQuestions(userId);

  const difficultyStats: AnswerStatsByValue = {};

  allAnsweredQuestions.forEach((question) => {
    const difficulty = question.difficulty;
    if (!difficultyStats.hasOwnProperty(difficulty)) {
      difficultyStats[difficulty] = {
        correct: 0,
        incorrect: 0,
        lastInteraction: 0,
      };
    }

    if (question.result === QuestionResult.Correct) {
      difficultyStats[difficulty].correct++;
    } else {
      difficultyStats[difficulty].incorrect++;
    }

    if (
      new Date(question.createdAt).getTime() >
      difficultyStats[difficulty].lastInteraction
    ) {
      difficultyStats[difficulty].lastInteraction = new Date(
        question.createdAt,
      ).getTime();
    }
  });
  return difficultyStats;
};

export const getUserAnswerStats = async ([_, userId]: [
  string,
  string,
]): Promise<{
  tagStats: AnswerStatsByValue;
  difficultyStats: AnswerStatsByValue;
}> => {
  const tagStats = await getUserTagStats([_, userId]);
  const difficultyStats = await getUserDifficultyStats([_, userId]);

  return {
    tagStats,
    difficultyStats,
  };
};

export const getAllQuestions = async () => {
  return (await (
    await fetch('/api/questions', { method: 'GET' })
  ).json()) as Question[];
};

export const getUserAnsweredQuestionsUnique = async (userId: string) => {
  const answeredQuestions = await getAllUserAnsweredQuestions(userId);
  const isCorrectlyAnswered = new Map<string, boolean>();
  const uniqueQuestionById = new Map<string, AnsweredQuestion>();

  answeredQuestions.forEach((question) => {
    const isCorrect = question.result === QuestionResult.Correct;

    if (!uniqueQuestionById.has(question.id)) {
      uniqueQuestionById.set(question.id, question);
      isCorrectlyAnswered.set(question.id, isCorrect);
      return;
    }

    if (isCorrectlyAnswered.get(question.id) || !isCorrect) {
      return;
    }

    uniqueQuestionById.set(question.id, question);
    isCorrectlyAnswered.set(question.id, true);
  });

  return Array.from(uniqueQuestionById.values());
};
