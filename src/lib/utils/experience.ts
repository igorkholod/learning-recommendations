import { Difficulty } from '@/lib/types';

export const getExperienceByDifficulty = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case Difficulty.Novice:
      return 50;
    case Difficulty.Intermediate:
      return 100;
    case Difficulty.Advanced:
      return 200;
    case Difficulty.Expert:
      return 300;
    default:
      return 0;
  }
};
