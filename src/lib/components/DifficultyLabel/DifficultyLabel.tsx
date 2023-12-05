import * as React from 'react';
import { Difficulty } from '@/lib/types';
import { getDifficultyColor } from '@/lib/utils/difficulty';

export interface DifficultyLabelProps {
  difficulty: Difficulty;
}

const DifficultyLabel: React.FC<DifficultyLabelProps> = ({ difficulty }) => {
  return (
    <span style={{ color: getDifficultyColor(difficulty) }}>{difficulty}</span>
  );
};

export default DifficultyLabel;
