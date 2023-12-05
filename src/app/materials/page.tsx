'use client';
import * as React from 'react';
import { useState } from 'react';
import useSWR from 'swr';
import { MaterialStatus, MaterialWithStatus } from '@/lib/types';
import { useUser } from '@/store';
import Link from 'next/link';
import { updateMaterialStatus as apiUpdateMaterialStatus } from '@/app/materials/apiService';
import {
  getMaterials,
  getRecommendedMaterialsByAnswerStats,
} from '@/lib/data/materials/apiService';
import DifficultyLabel from '@/lib/components/DifficultyLabel';

export default function Materials() {
  const { user } = useUser();
  const { data: materials, mutate: revalidate } = useSWR(
    !!user ? ['materials', user.id] : null,
    getMaterials,
  );
  const { data: recommendedMaterials } = useSWR(
    user ? ['answered_questions', user.id] : null,
    getRecommendedMaterialsByAnswerStats,
  );

  const [search, setSearch] = useState('');

  const filteredMaterials = !materials
    ? []
    : materials?.filter((material) =>
        material.name.toLowerCase().includes(search.toLowerCase()),
      );

  const updateMaterialStatus = async (
    materialId: string,
    status: MaterialStatus,
  ) => {
    await apiUpdateMaterialStatus({ materialId, status, userId: user!.id });
  };

  const renderMaterialListItem = (material: MaterialWithStatus) => {
    return (
      <li key={material.id}>
        <span style={{ fontWeight: 'bold' }}>{material.name}</span>{' '}
        <button
          onClick={async () => {
            if (material.status === MaterialStatus.Completed) {
              await updateMaterialStatus(
                material.id,
                MaterialStatus.NotCompleted,
              );
              await revalidate();
              return;
            }

            await updateMaterialStatus(material.id, MaterialStatus.Completed);
            await revalidate();
          }}
        >
          {material.status === MaterialStatus.Completed
            ? 'Mark as not completed'
            : 'Mark as completed'}
        </button>
        <br />
        URL: <a href={material.url}>{material.url}</a>
        <br />
        Difficulty:
        <DifficultyLabel difficulty={material.difficulty} />
        <br />
        Tags: {material.tags.join(', ')}
      </li>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div>
        List of all materials: <Link href="/materials/add">Add material</Link>
      </div>
      <br />
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <br />
      <h3>You may be interested in those materials: </h3>
      {recommendedMaterials?.length === 0 ? (
        'Nothing here'
      ) : (
        <ul>
          {recommendedMaterials?.map((material) =>
            renderMaterialListItem(material),
          )}
        </ul>
      )}
      <h3>All materials: </h3>
      {filteredMaterials?.length === 0 ? (
        'There is no materials'
      ) : (
        <ul>
          {filteredMaterials?.map((material) =>
            renderMaterialListItem(material),
          )}
        </ul>
      )}
    </>
  );
}
