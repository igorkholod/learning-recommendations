'use client';
import * as React from 'react';
import { useRef } from 'react';
import { MaterialWithStatus, Question, QuestionResult } from '@/lib/types';
import {
  getRecommendedMaterialsForQuestion,
  getRecommendedQuestion,
  submitResult,
} from '@/app/quiz/apiService';
import { QuizResult } from '@/app/quiz/types';
import { useUser } from '@/store';
import DifficultyLabel from '@/lib/components/DifficultyLabel';
import {
  addToUserCurrency,
  addToUserExperience,
  takeFromUserCurrency,
} from '@/lib/data/user/apiService';
import { getExperienceByDifficulty } from '@/lib/utils/experience';
import { getCurrencyByDifficulty } from '@/lib/utils/currency';
import { getUniqueArray } from '@/lib/utils/arrays';

const getRemovedAnswers = (
  allAnswers: string[],
  correctAnswer: string,
): string[] => {
  const answers = allAnswers.filter((answer) => answer !== correctAnswer);
  const removeIndexes = getUniqueArray(
    0,
    answers.length,
    Math.floor(allAnswers.length / 2),
  );

  return answers.filter((_, i) => removeIndexes.includes(i));
};

function Quiz(): React.ReactNode {
  const { user, setUser } = useUser();

  const formRef = useRef<HTMLFormElement | null>(null);
  const [questionNumber, setQuestionNumber] = React.useState(1);
  const [currentQuestion, setCurrentQuestion] = React.useState<Question | null>(
    null,
  );
  const [result, setResult] = React.useState<QuestionResult | null>(null);
  const [recommendedMaterials, setRecommendedMaterials] = React.useState<
    MaterialWithStatus[]
  >([]);
  const quizResults = React.useRef<QuizResult[]>([]);
  const [isFiftyFiftyUsed, setIsFiftyFiftyUsed] = React.useState(false);
  const [removedAnswers, setRemovedAnswers] = React.useState<string[]>([]);
  const isCorrect = result === QuestionResult.Correct;
  const getNextQuestion = React.useCallback(async () => {
    if (!user) {
      return;
    }
    const question = await getRecommendedQuestion({
      quizResults: quizResults.current,
      userId: user.id,
    });
    setCurrentQuestion(question);
  }, [user?.id]);

  React.useEffect(() => {
    getNextQuestion();
  }, [user?.id, getNextQuestion]);

  if (!currentQuestion) {
    return 'Loading...';
  }

  const handleTryAgain = async () => {
    if (!user) {
      return;
    }
    const newUser = await takeFromUserCurrency(user.id, 300);
    setUser(newUser);
    setResult(null);
  };

  const handleFiftyFifty = async () => {
    if (!user) {
      return;
    }

    const newUser = await takeFromUserCurrency(user.id, 200);
    setUser(newUser);
    setRemovedAnswers(
      getRemovedAnswers(currentQuestion.answers, currentQuestion.correctAnswer),
    );
    setIsFiftyFiftyUsed(true);
    formRef?.current?.reset();
  };

  const addQuizResult = async (
    question: Question,
    newResult: QuestionResult,
  ) => {
    setResult(newResult);
    await submitResult({
      userId: user!.id,
      questionId: question.id,
      result: newResult,
    });
    quizResults.current.push({ result: newResult, question });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const answer = formData.get('answer');

    if (!user) {
      return;
    }

    if (answer === null) {
      return;
    }

    if (answer === currentQuestion.correctAnswer) {
      await addQuizResult(currentQuestion, QuestionResult.Correct);
      await addToUserExperience(
        user.id,
        getExperienceByDifficulty(currentQuestion.difficulty),
      );
      const newUser = await addToUserCurrency(
        user.id,
        getCurrencyByDifficulty(currentQuestion.difficulty),
      );
      setUser(newUser);
      return;
    }

    await addQuizResult(currentQuestion, QuestionResult.Wrong);
    const recommendedMaterials = await getRecommendedMaterialsForQuestion(
      currentQuestion,
      user!.id,
    );

    setRecommendedMaterials(recommendedMaterials);
  };

  const handleNext = async () => {
    setQuestionNumber((prev) => prev + 1);
    setResult(null);
    setRecommendedMaterials([]);
    formRef?.current?.reset();
    setIsFiftyFiftyUsed(false);
    setRemovedAnswers([]);
    await getNextQuestion();
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div>
        Store:{' '}
        <button
          disabled={
            user?.currency < 200 ||
            currentQuestion?.answers.length < 4 ||
            isFiftyFiftyUsed
          }
          onClick={handleFiftyFifty}
        >
          50/50 (200 currency)
        </button>{' '}
        <button
          disabled={
            user?.currency < 300 ||
            result === null ||
            result === QuestionResult.Correct
          }
          onClick={handleTryAgain}
        >
          Try again (300 currency)
        </button>
      </div>
      <span style={{ fontStyle: 'italic' }}>Question #{questionNumber}</span>
      <br />
      <br />
      <form ref={formRef} onSubmit={handleSubmit}>
        <p style={{ fontWeight: 'bold' }}>
          {currentQuestion.question}:{' '}
          <DifficultyLabel difficulty={currentQuestion.difficulty} /> (Correct:{' '}
          {currentQuestion.correctAnswer})
        </p>
        {currentQuestion.answers.map((answer) => (
          <>
            {!removedAnswers.includes(answer) && (
              <>
                <input
                  type="radio"
                  name="answer"
                  value={answer}
                  key={answer}
                  id={answer}
                />
                <label htmlFor={answer}>{answer}</label>
              </>
            )}
            <br />
          </>
        ))}
        <br />
        <button type="submit" disabled={!!result}>
          Submit
        </button>
      </form>
      {!!result && (
        <>
          <br />
          <span style={{ color: isCorrect ? 'green' : 'red' }}>
            {isCorrect ? 'Correct!' : 'Wrong!'}
          </span>
          <br />
          <button onClick={handleNext}>Next question!</button>
          {recommendedMaterials.length !== 0 && (
            <>
              <div>
                If you struggle with understanding this topic, you may be
                interested in looking into these materials:
              </div>
              <ul>
                {recommendedMaterials.map(
                  ({ id, name, url, difficulty, status }) => {
                    return (
                      <li key={id}>
                        <a href={url} target="_blank">
                          {name}
                        </a>
                        :
                        <DifficultyLabel difficulty={difficulty} /> - {status}
                      </li>
                    );
                  },
                )}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Quiz;
