import { MaterialWithStatus, ScoredMaterialWithStatus } from '@/lib/types';
import {
  getUserAnswerStats,
  getUserTagStats,
} from '@/lib/data/questions/apiService';
import { getAnswerStatsMaterialScore } from '@/lib/scoring/answerStats-material';

export const getMaterials = async ([_, userId]: [string, string]): Promise<
  MaterialWithStatus[]
> => {
  const params = new URLSearchParams({ userId });

  const res = await fetch(`/api/materials?${params}`, { method: 'GET' });
  return await res.json();
};

export const getRecommendedMaterialsByAnswerStats = async ([_, userId]: [
  string,
  string,
]): Promise<ScoredMaterialWithStatus[]> => {
  const allMaterials = await getMaterials(['recMatForTags', userId]);
  const { tagStats, difficultyStats } = await getUserAnswerStats([
    'recMatForAnswers',
    userId,
  ]);

  return allMaterials
    .map((material) => ({
      ...material,
      score: getAnswerStatsMaterialScore(
        { tagStats, difficultyStats },
        material,
      ),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};
