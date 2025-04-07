import { v4 as uuidv4 } from 'uuid';

type TrayaSession = {
  session_id: string;
  question_progress: any[];
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

export function setQuestionProgress(questionId: string, answer: string) {
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


