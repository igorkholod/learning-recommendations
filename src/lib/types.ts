export interface User {
  id: string;
  name: string;
  experience: number;
  currency: number;
}

export interface UserWithLevel extends User {
  level: number;
}

export enum Difficulty {
  Novice = 'novice',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  Expert = 'expert',
}

export const DIFFICULTY_SCORE = {
  [Difficulty.Novice]: 0,
  [Difficulty.Intermediate]: 1,
  [Difficulty.Advanced]: 2,
  [Difficulty.Expert]: 3,
};

export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  tags: string[];
  difficulty: Difficulty;
}

export interface Material {
  id: string;
  name: string;
  url: string;
  tags: string[];
  difficulty: Difficulty;
}

export enum MaterialStatus {
  Completed = 'completed',
  NotCompleted = 'notCompleted',
}

export interface MaterialWithStatus extends Material {
  status: MaterialStatus;
}

export interface ScoredMaterialWithStatus extends MaterialWithStatus {
  score: number;
}

export enum QuestionResult {
  Correct = 'correct',
  Wrong = 'wrong',
}

export interface AnsweredQuestion extends Question {
  result: QuestionResult;
  createdAt: any;
}

export interface AnswerStats {
  correct: number;
  incorrect: number;
  lastInteraction: number;
}

export type AnswerStatsByValue = Record<string, AnswerStats>;

export interface EntityProgress {
  total: number;
  correctlyAnswered: number;
}

export type EntityProgressByValue = Record<string, EntityProgress>;

export interface UserProgress {
  tagsProgress: EntityProgressByValue;
  difficultyProgress: EntityProgressByValue;
}
