const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

const SESSION_STORAGE_KEY = "blindaQuizSessionId";
const VISITOR_STORAGE_KEY = "blindaVisitorId";
const SESSION_CREATED_KEY = "blindaQuizSessionCreated";
const SESSION_VERSION_KEY = "blindaQuizSessionVersion";
const SESSION_VERSION = "4";
let sessionCreationPromise: Promise<string> | null = null;

function getVisitorId() {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(VISITOR_STORAGE_KEY);
  if (existing) return existing;
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(VISITOR_STORAGE_KEY, id);
  return id;
}

function getSessionId() {
  if (typeof window === "undefined") return "";

  if (window.localStorage.getItem(SESSION_VERSION_KEY) !== SESSION_VERSION) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    window.localStorage.removeItem(SESSION_CREATED_KEY);
    window.localStorage.setItem(SESSION_VERSION_KEY, SESSION_VERSION);
  }

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

export async function recordQuizCompletion() {
  const sessionId = await startQuizSession();
  if (!sessionId || !SUPABASE_URL || !SUPABASE_KEY) return false;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/record_quiz_completion`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_session_id: sessionId }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error(`[Blinda Bolsa] Supabase ${response.status} em record_quiz_completion`, body);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Blinda Bolsa] Falha de rede em record_quiz_completion", error);
    return false;
  }
}

export async function startQuizSession() {
  const sessionId = getSessionId();
  const visitorId = getVisitorId();
  if (!sessionId || !visitorId || typeof window === "undefined") return "";

  if (sessionCreationPromise) return sessionCreationPromise;

  sessionCreationPromise = (async () => {
    const alreadyCreated = window.localStorage.getItem(SESSION_CREATED_KEY) === "1";

    if (alreadyCreated) {
      return sessionId;
    }

    const utm = getUtmParams();

    const ok = await request("quiz_sessions", {
      method: "POST",
      body: JSON.stringify({
        session_id: sessionId,
        visitor_id: visitorId,
        landing_path: window.location.pathname,
        referrer: document.referrer || null,
        ...utm,
      }),
    });

    if (!ok) return "";

    window.localStorage.setItem(SESSION_CREATED_KEY, "1");
    return sessionId;
  })();

  try {
    return await sessionCreationPromise;
  } finally {
    sessionCreationPromise = null;
  }
}

export async function saveQuizAnswer(
  questionId: number,
  answer: string,
  completed = false,
) {
  const sessionId = await startQuizSession();
  if (!sessionId) return false;

  return request("quiz_answers", {
    method: "POST",
    body: JSON.stringify({
      session_id: sessionId,
      question_id: questionId,
      answer,
    }),
  });
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
