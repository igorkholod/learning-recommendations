import {
  MaterialStatus,
  MaterialWithStatus,
  AnswerStatsByValue,
} from '@/lib/types';

export const getAnswerStatsMaterialScore = (
  {
    tagStats,
    difficultyStats,
  }: {
    tagStats: AnswerStatsByValue;
    difficultyStats: AnswerStatsByValue;
  },
  material: MaterialWithStatus,
) => {
  const currentTime = Date.now();
  const timeFactorWeight = 0.1;
  const tagCountScalingFactor = 0.1;
  const difficultyWeight = 0.2;

  let score = 0;

  material.tags.forEach((tag) => {
    if (tagStats.hasOwnProperty(tag)) {
      const correct = tagStats[tag].correct;
      const incorrect = tagStats[tag].incorrect;
      const total = correct + incorrect;

      score += (incorrect / total) * 100;

      const timeSinceLastInteraction =
        currentTime - tagStats[tag].lastInteraction;
      score += timeFactorWeight * timeSinceLastInteraction;
    }
  });

  if (difficultyStats.hasOwnProperty(material.difficulty)) {
    const correct = difficultyStats[material.difficulty].correct;
    const incorrect = difficultyStats[material.difficulty].incorrect;
    const total = correct + incorrect;

    score += difficultyWeight * (incorrect / total) * 100;
  }

  score *= 1 - tagCountScalingFactor * (material.tags.length - 1);

  if (material.status === MaterialStatus.Completed) {
    score -= 1000; // Subtract a large number so completed materials get a lower score
  }

  return score;
};
