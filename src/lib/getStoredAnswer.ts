// lib/getStoredAnswer.ts
export const getStoredAnswer = (questionId: string): string | null => {
    try {
      const sessionData = localStorage.getItem('traya_session');
      if (!sessionData) return null;
  
      const parsed = JSON.parse(sessionData);
      const progress = parsed.question_progress || [];
  
      const entry = progress.find((p: any) => p.questionId === questionId);
      return entry ? entry.answer : null;
    } catch (err) {
      console.error('Failed to fetch stored answer:', err);
      return null;
    }
  };
  