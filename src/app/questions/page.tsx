'use client';
import * as React from 'react';
import useSWR from 'swr';
import { Question } from '@/lib/types';
import { useState } from 'react';
import { useGuardedRoute } from '@/lib/hooks/useGuardedRoute';
import Link from 'next/link';
import DifficultyLabel from '@/lib/components/DifficultyLabel';

async function getQuestions(url: string): Promise<Question[]> {
  const res = await fetch(url, { method: 'GET' });
  return await res.json();
}

export default function Questions() {
  useGuardedRoute();
  const { data: questions } = useSWR('/api/questions', getQuestions);

  const [search, setSearch] = useState('');

  const filteredQuestions = !questions
    ? []
    : questions?.filter((question) =>
        question.question.toLowerCase().includes(search.toLowerCase()),
      );

  return (
    <>
      <div>
        All questions <Link href="/questions/add">Add a question</Link>
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
      {filteredQuestions?.length === 0 ? (
        'There is no questions'
      ) : (
        <ul>
          {filteredQuestions?.map((question) => (
            <li key={question.id}>
              <span style={{ fontWeight: 'bold' }}>{question.question}</span>
              <br />
              Difficulty:
              <DifficultyLabel difficulty={question.difficulty} />
              <br />
              Tags: {question.tags.join(', ')}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
