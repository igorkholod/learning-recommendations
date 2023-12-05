import * as React from 'react';

export interface AchievementProps {
  name: string;
  description: string;
  progress: { current: number; total: number };
}

const Achievement: React.FC<AchievementProps> = ({
  name,
  description,
  progress,
}) => {
  const isDone = progress.current >= progress.total;
  return (
    <div>
      <div>
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '1.25rem',
            color: isDone ? 'green' : 'black',
          }}
        >
          {name}
        </span>
      </div>
      <div>
        <span style={{ fontStyle: 'italic' }}>{description}</span>
      </div>
      {!isDone && (
        <div>
          <span>Your progress: </span>
          <span>
            {progress.current}/{progress.total}
          </span>
        </div>
      )}
    </div>
  );
};

export default Achievement;
