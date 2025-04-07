'use client';

import { useEffect, useState } from 'react';
import questionnaire from '@/data/questionnaire.json';
import { setQuestionProgress } from '@/lib/session';

export type Question = {
  id: string;
  text: string;
  [key: string]: any;
};

type ProgressItem = {
  questionId: string;
  answer: string;
};

export function useCurrentQuestion() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const keys = Object.keys(questionnaire);

  const findNextQuestion = (questionId: string | null): Question | null => {
    if (!questionId) {
      const firstKey = keys[0];
      return { ...(questionnaire as Record<string, Question>)[firstKey], first_question: true }; // ✅ added
    }

    const currentIndex = keys.findIndex((key) => key === questionId);
    const nextKey = keys[currentIndex + 1];
    return nextKey ? (questionnaire as Record<string, Question>)[nextKey] : null;
  };

  const loadCurrentQuestion = () => {
    try {
      const sessionData = localStorage.getItem('traya_session');
      if (!sessionData) return;

      const parsed = JSON.parse(sessionData);
      const progress: ProgressItem[] = parsed.question_progress || [];

      let question;

      if (progress.length === 0) {
        const firstKey = keys[0];
        question = { ...(questionnaire as Record<string, Question>)[firstKey], first_question: true }; // ✅ already present
      } else {
        const last = progress[progress.length - 1];
        question = (questionnaire as Record<string, Question>)[last.questionId];
      }

      if (question) {
        setCurrentQuestion({ ...question });
      }
    } catch (err) {
      console.error('Failed to get current question', err);
    }
  };

  const getNextQuestion = (): Question | null => {
    if (!currentQuestion) return null;

    const next = findNextQuestion(currentQuestion.id);
    if (next) {
      setQuestionProgress(next.id, '');
      setCurrentQuestion({ ...next });
    }
    return next;
  };

  const getPreviousQuestion = (): Question | null => {
    try {
      const sessionData = localStorage.getItem('traya_session');
      if (!sessionData || !currentQuestion) return null;

      const parsed = JSON.parse(sessionData);
      let progress: ProgressItem[] = parsed.question_progress || [];

      if (progress.length <= 1) return null; // No previous question

      const previousItem = progress[progress.length - 2];
      progress = progress.slice(0, progress.length - 1); // Remove current

      parsed.question_progress = progress;
      localStorage.setItem('traya_session', JSON.stringify(parsed));

      const isFirst = previousItem.questionId === keys[0]; // ✅ added
      const previous = (questionnaire as Record<string, Question>)[previousItem.questionId];
      setCurrentQuestion({ ...previous, ...(isFirst && { first_question: true }) }); // ✅ modified
      return { ...previous, ...(isFirst && { first_question: true }) }; // ✅ return updated
    } catch (err) {
      console.error('Failed to get previous question', err);
      return null;
    }
  };

  useEffect(() => {
    loadCurrentQuestion();
  }, []);

  return {
    currentQuestion,
    getNextQuestion,
    getPreviousQuestion,
  };
}
