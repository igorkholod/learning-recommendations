'use client';
import * as React from 'react';
import { useGuardedRoute } from '@/lib/hooks/useGuardedRoute';
import { Difficulty } from '@/lib/types';
import {
  ADD_MATERIAL_SUCCESS,
  TAGS_NOT_UNIQUE,
} from '@/app/materials/add/constants';
import { addMaterial } from '@/app/materials/add/apiService';
import Link from 'next/link';

// function getUniqueArray(min: number, max: number, length: number) {
//   const generated = new Set();
//   const res = [];
//   while (true) {
//     const number = getRandomInt(min, max);
//     if (generated.has(number)) {
//       continue;
//     }
//
//     generated.add(number);
//     res.push(number);
//
//     if (res.length === length) {
//       return res.sort((a, b) => a - b);
//     }
//   }
// }
//
// function getRandomInt(min: number, max: number) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
// }
//
// function generateTags() {
//   const nums = getUniqueArray(1, 10, getRandomInt(1, 10));
//
//   return nums.map((num) => `Tag ${num}`).join('\n');
// }

function AddMaterials(): React.ReactNode {
  useGuardedRoute();
  const [message, setMessage] = React.useState<string | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const result = await addMaterial(new FormData(formRef.current!));

    if (result === TAGS_NOT_UNIQUE) {
      setMessage('Tags must be unique');
      return;
    }

    if (result === ADD_MATERIAL_SUCCESS) {
      formRef?.current?.reset();
      setMessage('Material added successfully');
      return;
    }

    setMessage("Something happened. And it wasn't supposed to happen. Sorry");
  };

  // React.useEffect(() => {
  //   const diffs = ['novice', 'intermediate', 'advanced', 'expert'];
  //   Array.from({ length: 100 }, async (_, i) => {
  //     const fd = new FormData();
  //     fd.append('name', `Material ${i}`);
  //     fd.append('url', 'https://example.com/');
  //     fd.append('tags', generateTags());
  //     fd.append('difficulty', diffs[getRandomInt(0, diffs.length)]);
  //     // console.log(fd);
  //     // await addMaterial(fd);
  //   });
  // }, []);

  return (
    <>
      <div>
        Add a material <Link href="/materials">Go to materials</Link>
      </div>
      <br />
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="name">Name* </label>
        <input type="text" name="name" id="name" required={true} />
        <br />
        <br />
        <label htmlFor="url">URL* </label>
        <input type="text" name="url" id="url" required={true} />
        <br />
        <br />
        <label htmlFor="tags">Tags, each on new line* </label>
        <textarea name="tags" id="tags" rows={10} cols={40} required={true} />
        <br />
        <br />
        <label htmlFor="difficulty">Difficulty* </label>
        <select
          name="difficulty"
          id="difficulty"
          required={true}
          defaultValue="novice"
        >
          <option value={Difficulty.Novice}>Novice</option>
          <option value={Difficulty.Intermediate}>Intermediate</option>
          <option value={Difficulty.Advanced}>Advanced</option>
          <option value={Difficulty.Expert}>Expert</option>
        </select>
        <br />
        <br />
        <button type="submit">Add material</button>
        {!!message && (
          <>
            <br /> <span style={{ color: 'red' }}>{message}</span>
          </>
        )}
      </form>
    </>
  );
}

export default AddMaterials;
