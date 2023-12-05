'use client';

import * as React from 'react';
import { getUserProgress } from '@/app/progress/apiService';
import { useUser } from '@/store';
import useSWR from 'swr';
import Achievement, { AchievementProps } from '@/app/achievements/Achievement';
import { Difficulty, UserProgress } from '@/lib/types';
import { getAchievementsData } from '@/app/achievements/getAchievementsData';
import achievement from '@/app/achievements/Achievement';

export interface AchievementsPageProps {}

const AchievementsPage: React.FC<AchievementsPageProps> = () => {
  const { user } = useUser();
  const { data: userProgress } = useSWR(user?.id, getUserProgress);

  if (!user) {
    return null;
  }

  if (!userProgress) {
    return null;
  }

  return (
    <div>
      <h2>Your achievements: </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {getAchievementsData(userProgress, user).map(
          ({ key, ...achievementData }) => (
            <div key={key} style={{ flex: '0 0 20%' }}>
              <Achievement {...achievementData} />
              <br />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default AchievementsPage;
