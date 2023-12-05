import { getRandomInt } from '@/lib/utils/random';

export const getJaccardIndex = <T extends {} = any>(arr1: T[], arr2: T[]) => {
  const intersection = arr1.filter((el) => arr2.includes(el));
  const union = Array.from(new Set([...arr1, ...arr2]));

  return intersection.length / union.length;
};

export function getUniqueArray(min: number, max: number, length: number) {
  const generated = new Set();
  const res = [];
  while (true) {
    const number = getRandomInt(min, max);
    if (generated.has(number)) {
      continue;
    }

    generated.add(number);
    res.push(number);

    if (res.length === length) {
      return res.sort((a, b) => a - b);
    }
  }
}
