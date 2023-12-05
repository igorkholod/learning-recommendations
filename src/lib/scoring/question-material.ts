import {
  Difficulty,
  DIFFICULTY_SCORE,
  MaterialStatus,
  MaterialWithStatus,
  Question,
} from '@/lib/types';
import { getJaccardIndex } from '@/lib/utils/arrays';

const getScoreDifficultyPenalty = (
  difficulty1: Difficulty,
  difficulty2: Difficulty,
) => {
  return (
    Math.abs(DIFFICULTY_SCORE[difficulty1] - DIFFICULTY_SCORE[difficulty2]) *
    0.5
  );
};

export const getQuestionMaterialScore = (
  question: Question,
  material: MaterialWithStatus,
) => {
  const jaccardScore = getJaccardIndex<string>(question.tags, material.tags);
  const difficultyPenalty = getScoreDifficultyPenalty(
    question.difficulty,
    material.difficulty,
  );
  const completionMultiplier =
    material.status === MaterialStatus.Completed ? 0.2 : 1;

  return (jaccardScore - difficultyPenalty) * completionMultiplier;
};
