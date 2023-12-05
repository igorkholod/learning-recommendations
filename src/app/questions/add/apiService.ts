import {
  NO_MULTIPLE_ANSWERS,
  ADD_QUESTION_SUCCESS,
  CORRECT_ANSWER_NOT_PRESENT_IN_ANSWERS,
  ADD_QUESTION_FAILURE,
  ANSWERS_NOT_UNIQUE,
  TAGS_NOT_UNIQUE,
} from '@/app/questions/add/constants';

export async function addQuestion(formData: FormData) {
  const question = (formData.get('question') as string).trim();
  const answers = (formData.get('answers') as string)
    .trim()
    .split('\n')
    .map((answer) => answer.trim());
  const correctAnswer = (formData.get('correctAnswer') as string).trim();
  const tags = (formData.get('tags') as string)
    .trim()
    .split('\n')
    .map((tag) => tag.trim());
  const difficulty = formData.get('difficulty') as string;

  if (answers.length === 1) {
    return NO_MULTIPLE_ANSWERS;
  }

  if (!answers.includes(correctAnswer)) {
    return CORRECT_ANSWER_NOT_PRESENT_IN_ANSWERS;
  }

  if (new Set(answers).size !== answers.length) {
    return ANSWERS_NOT_UNIQUE;
  }
  if (new Set(tags).size !== tags.length) {
    return TAGS_NOT_UNIQUE;
  }

  const res = await fetch('/api/questions', {
    method: 'POST',
    body: JSON.stringify({
      question,
      answers,
      correctAnswer,
      tags,
      difficulty,
    }),
  });

  if (res.status !== 200) {
    return ADD_QUESTION_FAILURE;
  }

  return ADD_QUESTION_SUCCESS;
}
