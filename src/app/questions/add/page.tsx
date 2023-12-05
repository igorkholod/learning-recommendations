'use client';
import * as React from 'react';
import { useGuardedRoute } from '@/lib/hooks/useGuardedRoute';
import { addQuestion } from '@/app/questions/add/apiService';
import {
  ADD_QUESTION_FAILURE,
  ADD_QUESTION_SUCCESS,
  ANSWERS_NOT_UNIQUE,
  CORRECT_ANSWER_NOT_PRESENT_IN_ANSWERS,
  NO_MULTIPLE_ANSWERS,
  TAGS_NOT_UNIQUE,
} from '@/app/questions/add/constants';
import { Difficulty } from '@/lib/types';
import Link from 'next/link';
// import { getRandomInt } from '@/lib/utils/random';

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
// function generateTags() {
//   const nums = getUniqueArray(1, 10, getRandomInt(1, 10));
//
//   return nums.map((num) => `Tag ${num}`).join('\n');
// }

function AddQuestions(): React.ReactNode {
  useGuardedRoute();
  const [message, setMessage] = React.useState<string | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const result = await addQuestion(new FormData(formRef.current!));

    if (result === NO_MULTIPLE_ANSWERS) {
      setMessage('There should be at least two answers.');
      return;
    }

    if (result === CORRECT_ANSWER_NOT_PRESENT_IN_ANSWERS) {
      setMessage('Correct answer should be present in answers list');
      return;
    }

    if (result === ADD_QUESTION_FAILURE) {
      setMessage('Something went wrong, please try again');
      return;
    }

    if (result === ANSWERS_NOT_UNIQUE) {
      setMessage('Answers must be unique');
      return;
    }
    if (result === TAGS_NOT_UNIQUE) {
      setMessage('Tags must be unique');
      return;
    }

    if (result === ADD_QUESTION_SUCCESS) {
      formRef?.current?.reset();
      setMessage('Question added successfully');
      return;
    }

    setMessage("Something happened. And it wasn't supposed to happen. Sorry");
  };

  // React.useEffect(() => {
  //   const diffs = ['novice', 'intermediate', 'advanced', 'expert'];
  //   Array.from({ length: 100 }, async (_, i) => {
  //     const fd = new FormData();
  //     fd.append('question', `Question ${i}`);
  //     fd.append('answers', 'Answer 1\nAnswer 2\nAnswer 3\nAnswer 4');
  //     fd.append('correctAnswer', `Answer ${getRandomInt(1, 5)}`);
  //     fd.append('tags', generateTags());
  //     fd.append('difficulty', diffs[getRandomInt(0, diffs.length)]);
  //     // console.log(fd);
  //     await addQuestion(fd);
  //   });
  // }, []);

  return (
    <>
      <div>
        Add a question <Link href="/questions">Go to questions</Link>
      </div>
      <br />
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="question">Question* </label>
        <input type="text" name="question" id="question" required={true} />
        <br />
        <br />
        <label htmlFor="answers">Answers, each answer on new line* </label>
        <textarea
          name="answers"
          id="answers"
          rows={10}
          cols={40}
          required={true}
        />
        <br />
        <br />
        <label htmlFor="correctAnswer">Correct answer* </label>
        <input
          type="text"
          name="correctAnswer"
          id="correctAnswer"
          required={true}
        />
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
        <button type="submit">Add question</button>
        {!!message && (
          <>
            <br /> <span style={{ color: 'red' }}>{message}</span>
          </>
        )}
      </form>
    </>
  );
}

export default AddQuestions;
