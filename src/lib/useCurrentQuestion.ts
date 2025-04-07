'use client';

import { useEffect, useState } from 'react';
import questionnaire from '@/data/questionnaire.json';

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

  useEffect(() => {
    try {
      const sessionData = localStorage.getItem('traya_session');
      if (!sessionData) return;

      const parsed = JSON.parse(sessionData);
      const progress: ProgressItem[] = parsed.question_progress || [];

      let questionData: Question | undefined;

      if (progress.length === 0) {
        // No progress — get first question
        const firstKey = Object.keys(questionnaire)[0];
        questionData = (questionnaire as Record<string, Question>)[firstKey];
      } else {
        // Get the last question in progress
        const lastEntry = progress[progress.length - 1];
        questionData = (questionnaire as Record<string, Question>)[lastEntry.questionId];
      }

      if (questionData) {
        setCurrentQuestion({ ...questionData });
      }
    } catch (err) {
      console.error('Failed to get current question', err);
    }
  }, []);

  return currentQuestion;
}
