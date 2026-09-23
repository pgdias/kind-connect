const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

const SESSION_STORAGE_KEY = "blindaQuizSessionId";

function getSessionId() {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(SESSION_STORAGE_KEY, id);
  return id;
}

function getUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
  };
}

async function request(path: string, init: RequestInit = {}) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return false;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
        ...(init.headers || {}),
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function startQuizSession() {
  const sessionId = getSessionId();
  if (!sessionId) return "";

  const utm = getUtmParams();

  await request("quiz_sessions?on_conflict=session_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({
      session_id: sessionId,
      landing_path: window.location.pathname,
      referrer: document.referrer || null,
      ...utm,
    }),
  });

  return sessionId;
}

export async function saveQuizAnswer(questionId: number, answer: string, completed = false) {
  const sessionId = await startQuizSession();
  if (!sessionId) return;

  await request("quiz_answers?on_conflict=session_id,question_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({
      session_id: sessionId,
      question_id: questionId,
      answer,
    }),
  });

  await request(`quiz_sessions?session_id=eq.${encodeURIComponent(sessionId)}`, {
    method: "PATCH",
    body: JSON.stringify({
      current_step: questionId,
      ...(completed ? { completed_at: new Date().toISOString() } : {}),
    }),
  });
}
