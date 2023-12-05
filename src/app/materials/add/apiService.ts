import {
  ADD_MATERIAL_FAILURE,
  ADD_MATERIAL_SUCCESS,
  TAGS_NOT_UNIQUE,
} from '@/app/materials/add/constants';

export async function addMaterial(formData: FormData) {
  const name = (formData.get('name') as string).trim();
  const url = (formData.get('url') as string).trim();
  const tags = (formData.get('tags') as string)
    .trim()
    .split('\n')
    .map((tag) => tag.trim());
  const difficulty = formData.get('difficulty') as string;

  if (new Set(tags).size !== tags.length) {
    return TAGS_NOT_UNIQUE;
  }

  const res = await fetch('/api/materials', {
    method: 'POST',
    body: JSON.stringify({
      name,
      url,
      tags,
      difficulty,
    }),
  });

  if (res.status !== 200) {
    return ADD_MATERIAL_FAILURE;
  }

  return ADD_MATERIAL_SUCCESS;
}
