import { v4 as uuidv4 } from 'uuid';

type TrayaSession = {
  session_id: string;
  question_progress: any[];
};

export function initializeOrGetSession(): {
  session: TrayaSession;
  hasProgress: boolean;
} {
  let sessionDataRaw = localStorage.getItem('traya_session');
  let session: TrayaSession;

  if (!sessionDataRaw) {
    session = {
      session_id: uuidv4(),
      question_progress: [],
    };
    localStorage.setItem('traya_session', JSON.stringify(session));
    return { session, hasProgress: false };
  }

  try {
    session = JSON.parse(sessionDataRaw);
    if (!session.session_id) {
      session.session_id = uuidv4();
    }
    if (!Array.isArray(session.question_progress)) {
      session.question_progress = [];
    }
    localStorage.setItem('traya_session', JSON.stringify(session));
    return { session, hasProgress: session.question_progress.length > 0 };
  } catch {
    session = {
      session_id: uuidv4(),
      question_progress: [],
    };
    localStorage.setItem('traya_session', JSON.stringify(session));
    return { session, hasProgress: false };
  }
}
