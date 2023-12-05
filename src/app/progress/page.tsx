'use client';
import * as React from 'react';
import useSWR from 'swr';
import { useUser } from '@/store';
import { getUserProgress } from '@/app/progress/apiService';
import { EntityProgressByValue } from '@/lib/types';

export interface ProgressPageProps {}

const ProgressPage: React.FC<ProgressPageProps> = () => {
  const { user } = useUser();

  const { data: userProgress, error } = useSWR(user?.id, getUserProgress);

  const isLoading = !userProgress && !error;

  if (!user) {
    return null;
  }

  const renderProgress = (progressByValue: EntityProgressByValue) => {
    return (
      <ul>
        {Object.entries(progressByValue).map(([value, progress]) => (
          <li key={value}>
            <span style={{ fontWeight: 'bold' }}>{value}</span>:
            <span style={{ fontSize: '1.25rem' }}>
              {progress.correctlyAnswered}/{progress.total}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Your progress:</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h3>Difficulty:</h3>
          {renderProgress(userProgress!.difficultyProgress)}
          <h3>Tags:</h3>
          {renderProgress(userProgress!.tagsProgress)}
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
