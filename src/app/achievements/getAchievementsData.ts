import { AchievementProps } from '@/app/achievements/Achievement';
import { Difficulty, UserProgress, UserWithLevel } from '@/lib/types';

export const getAchievementsData = (
  userProgress: UserProgress,
  user: UserWithLevel,
): (AchievementProps & { key: string })[] => {
  return [
    {
      key: 'Novice cracker I',
      name: 'Novice cracker I',
      description: 'Answer correctly to 10 novice questions',
      progress: {
        current:
          userProgress.difficultyProgress[Difficulty.Novice].correctlyAnswered,
        total: 10,
      },
    },
    {
      key: 'Intermediate cracker I',
      name: 'Intermediate cracker I',
      description: 'Answer correctly to 10 intermediate questions',
      progress: {
        current:
          userProgress.difficultyProgress[Difficulty.Intermediate]
            .correctlyAnswered,
        total: 10,
      },
    },
    {
      key: 'Advanced cracker I',
      name: 'Advanced cracker I',
      description: 'Answer correctly to 10 advanced questions',
      progress: {
        current:
          userProgress.difficultyProgress[Difficulty.Advanced]
            .correctlyAnswered,
        total: 10,
      },
    },
    {
      key: 'Expert cracker I',
      name: 'Expert cracker I',
      description: 'Answer correctly to 10 expert questions',
      progress: {
        current:
          userProgress.difficultyProgress[Difficulty.Expert].correctlyAnswered,
        total: 10,
      },
    },
    {
      key: 'Novice cracker II',
      name: 'Novice cracker II',
      description: 'Answer correctly to 20 novice questions',
      progress: {
        current:
          userProgress.difficultyProgress[Difficulty.Novice].correctlyAnswered,
        total: 20,
      },
    },
    {
      key: 'Intermediate cracker II',
      name: 'Intermediate cracker II',
      description: 'Answer correctly to 20 intermediate questions',
      progress: {
        current:
          userProgress.difficultyProgress[Difficulty.Intermediate]
            .correctlyAnswered,
        total: 20,
      },
    },
    {
      key: 'Advanced cracker II',
      name: 'Advanced cracker II',
      description: 'Answer correctly to 20 advanced questions',
      progress: {
        current:
          userProgress.difficultyProgress[Difficulty.Advanced]
            .correctlyAnswered,
        total: 20,
      },
    },
    {
      key: 'Expert cracker II',
      name: 'Expert cracker II',
      description: 'Answer correctly to 20 expert questions',
      progress: {
        current:
          userProgress.difficultyProgress[Difficulty.Expert].correctlyAnswered,
        total: 20,
      },
    },
    {
      key: 'Novice cracker III',
      name: 'Novice cracker III',
      description: 'Answer correctly to 50 novice questions',
      progress: {
        current:
          userProgress.difficultyProgress[Difficulty.Novice].correctlyAnswered,
        total: 50,
      },
    },
    {
      key: 'Intermediate cracker III',
      name: 'Intermediate cracker III',
      description: 'Answer correctly to 50 intermediate questions',
      progress: {
        current:
          userProgress.difficultyProgress[Difficulty.Intermediate]
            .correctlyAnswered,
        total: 50,
      },
    },
    {
      key: 'Advanced cracker III',
      name: 'Advanced cracker III',
      description: 'Answer correctly to 50 advanced questions',
      progress: {
        current:
          userProgress.difficultyProgress[Difficulty.Advanced]
            .correctlyAnswered,
        total: 50,
      },
    },
    {
      key: 'Expert cracker III',
      name: 'Expert cracker III',
      description: 'Answer correctly to 50 expert questions',
      progress: {
        current:
          userProgress.difficultyProgress[Difficulty.Expert].correctlyAnswered,
        total: 50,
      },
    },
    {
      key: 'Beginner',
      name: 'Beginner',
      description: 'Reach level 1',
      progress: {
        current: user.level,
        total: 1,
      },
    },
    {
      key: 'Experienced',
      name: 'Experienced',
      description: 'Reach level 10',
      progress: {
        current: user.level,
        total: 10,
      },
    },
    {
      key: 'Smarty',
      name: 'Smarty',
      description: 'Reach level 25',
      progress: {
        current: user.level,
        total: 25,
      },
    },
    {
      key: 'Big brain',
      name: 'Big brain',
      description: 'Reach level 50',
      progress: {
        current: user.level,
        total: 50,
      },
    },
    {
      key: 'Quiz god',
      name: 'Quiz god',
      description: 'Reach level 100',
      progress: {
        current: user.level,
        total: 100,
      },
    },
  ];
};
