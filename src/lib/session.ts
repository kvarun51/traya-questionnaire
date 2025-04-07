import { v4 as uuidv4 } from 'uuid';
import questionnaire from '@/data/questionnaire.json';

type TrayaSession = {
  session_id: string;
  question_progress: any[];
};

// Define a more accurate type for the questionnaire
type QuestionnaireType = {
  [key: string]: {
    id: string;
    group: string;
    text: string;
    type: string;
    [key: string]: any; // For other properties
  };
};

export function initializeOrGetSession(): {
  session: TrayaSession;
  hasProgress: boolean;
} {
  let session: TrayaSession | null = null;

  try {
    const raw = localStorage.getItem('traya_session');
    if (raw) {
      const parsed = JSON.parse(raw);
      session = {
        session_id: parsed.session_id || uuidv4(),
        question_progress: Array.isArray(parsed.question_progress) ? parsed.question_progress : [],
      };
    }
  } catch {
    // Ignore parse error and fallback to new session
  }

  // Only create a new session if we couldn't retrieve or parse an existing one
  if (!session) {
    session = {
      session_id: uuidv4(),
      question_progress: [],
    };
  }

  const hasProgress = session.question_progress.length > 0;
  localStorage.setItem('traya_session', JSON.stringify(session));
  return { session, hasProgress };
}

export function setQuestionProgress(questionId: string, answer: string | string[]) {
  const { session } = initializeOrGetSession();
  const progress = session.question_progress;

  const index = progress.findIndex((item: any) => item.questionId === questionId);

  if (index !== -1) {
    // Update existing
    progress[index].answer = answer;
  } else {
    // Add new
    progress.push({ questionId, answer });
  }

  localStorage.setItem('traya_session', JSON.stringify({
    ...session,
    question_progress: progress,
  }));
}

// export function getNextQuestion() {
//   const { session } = initializeOrGetSession();
//   const progress = session.question_progress;
  
//   const lastAnsweredId = progress.length ? progress[progress.length - 1].questionId : null;
//   const keys = Object.keys(questionnaire);

//   // If no question has been answered yet, return the first
//   if (!lastAnsweredId) {
//     const firstKey = keys[0];
//     const firstQuestion = (questionnaire as unknown as QuestionnaireType)[firstKey];

//     // Save it with empty answer
//     setQuestionProgress(firstQuestion.id, '');
//     return firstQuestion;
//   }

//   const currentIndex = keys.findIndex((key) => key === lastAnsweredId);
//   const nextKey = keys[currentIndex + 1];

//   if (nextKey) {
//     const nextQuestion = (questionnaire as unknown as QuestionnaireType)[nextKey];

//     // Save next question with empty answer
//     setQuestionProgress(nextQuestion.id, '');
//     return nextQuestion;
//   }

//   return null; // No more questions
// }
