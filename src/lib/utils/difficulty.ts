import { Difficulty } from '@/lib/types';

export function getDifficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case Difficulty.Novice:
      return 'green';
    case Difficulty.Intermediate:
      return 'darkblue';
    case Difficulty.Advanced:
      return 'orange';
    case Difficulty.Expert:
      return 'red';
    default:
      return 'black';
  }
}
