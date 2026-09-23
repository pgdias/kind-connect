const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

const SESSION_STORAGE_KEY = "blindaQuizSessionId";
const SESSION_CREATED_KEY = "blindaQuizSessionCreated";

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
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("[Blinda Bolsa] Supabase env vars ausentes.");
    return false;
  }

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

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error(`[Blinda Bolsa] Supabase ${response.status} em ${path}`, body);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`[Blinda Bolsa] Falha de rede em ${path}`, error);
    return false;
  }
}

export async function trackEvent(
  eventName: string,
  metadata: Record<string, unknown> = {},
) {
  const sessionId = await startQuizSession();
  if (!sessionId) return false;

  return request("quiz_events", {
    method: "POST",
    body: JSON.stringify({
      session_id: sessionId,
      event_name: eventName,
      metadata,
    }),
  });
}

export async function startQuizSession() {
  const sessionId = getSessionId();
  if (!sessionId || typeof window === "undefined") return "";

  if (window.localStorage.getItem(SESSION_CREATED_KEY) === "1") return sessionId;

  const utm = getUtmParams();

  const ok = await request("quiz_sessions", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      session_id: sessionId,
      landing_path: window.location.pathname,
      referrer: document.referrer || null,
      ...utm,
    }),
  });

  if (!ok) return "";

  window.localStorage.setItem(SESSION_CREATED_KEY, "1");
  return sessionId;
}

export async function saveQuizAnswer(
  questionId: number,
  answer: string,
  completed = false,
) {
  const sessionId = await startQuizSession();
  if (!sessionId) return false;

  const answerSaved = await request(
    "quiz_answers?on_conflict=session_id,question_id",
    {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        session_id: sessionId,
        question_id: questionId,
        answer,
      }),
    },
  );

  const sessionUpdated = await request(
    `quiz_sessions?session_id=eq.${encodeURIComponent(sessionId)}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        current_step: questionId,
        ...(completed ? { completed_at: new Date().toISOString() } : {}),
      }),
    },
  );

  return answerSaved && sessionUpdated;
}

type QuizAnswer = {
  questionId: number;
  value: string;
};

export async function saveQuizSummary(
  answers: QuizAnswer[],
  attentionPoints: string[],
) {
  const values = Object.fromEntries(
    answers.map((answer) => [answer.questionId, answer.value]),
  ) as Record<number, string>;

  const result = JSON.stringify({
    pontos_atencao: attentionPoints,
    respostas_completas: answers,
  });

  return request("respostas_quiz", {
    method: "POST",
    body: JSON.stringify({
      resposta_1: values[1] ?? null,
      resposta_2: values[2] ?? null,
      resposta_3: values[3] ?? null,
      resposta_4: values[4] ?? null,
      resposta_5: values[5] ?? null,
      resposta_6: values[6] ?? null,
      resposta_7: values[7] ?? null,
      resposta_8: values[8] ?? null,
      resultado: result,
    }),
  });
}
