import { MaterialStatus, MaterialWithStatus } from '@/lib/types';

export const updateMaterialStatus = async ({
  userId,
  materialId,
  status,
}: {
  userId: string;
  materialId: string;
  status: MaterialStatus;
}) => {
  await fetch(`/api/users/${userId}/materials/${materialId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  });
};
