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

  // Helper: find the next question after a given questionId
  const findNextQuestion = (questionId: string | null): Question | null => {
    const keys = Object.keys(questionnaire);
    if (!questionId) return (questionnaire as Record<string, Question>)[keys[0]];

    const currentIndex = keys.findIndex((key) => key === questionId);
    const nextKey = keys[currentIndex + 1];
    return nextKey ? (questionnaire as Record<string, Question>)[nextKey] : null;
  };

  // Loads the current question based on session
  const loadCurrentQuestion = () => {
    try {
      const sessionData = localStorage.getItem('traya_session');
      if (!sessionData) return;
  
      const parsed = JSON.parse(sessionData);
      const progress: ProgressItem[] = parsed.question_progress || [];
  
      let question;
  
      if (progress.length === 0) {
        // First question
        const firstKey = Object.keys(questionnaire)[0];
        question = (questionnaire as Record<string, Question>)[firstKey];
      } else {
        const last = progress[progress.length - 1];
        if (last.answer === '' || last.answer == null) {
          question = (questionnaire as Record<string, Question>)[last.questionId];
        } else {
          question = findNextQuestion(last.questionId);
        }
      }
  
      if (question) {
        setCurrentQuestion({ ...question });
      }
    } catch (err) {
      console.error('Failed to get current question', err);
    }
  };

  // Called manually to fetch and update to next question
  const getNextQuestion = (): Question | null => {
    if (!currentQuestion) return null;

    const next = findNextQuestion(currentQuestion.id);
    if (next) {
      setQuestionProgress(next.id, '');
      setCurrentQuestion({ ...next });
    }
    return next;
  };

  useEffect(() => {
    loadCurrentQuestion();
  }, []);

  return {
    currentQuestion,
    getNextQuestion,
  };
}
