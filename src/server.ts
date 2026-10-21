import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { sql } from "./db/client";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

async function handleApiRoutes(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (!path.startsWith("/api/")) return null;

  try {
    if (path === "/api/quiz-sessions" && request.method === "POST") {
      const body = await request.json();
      const { session_id, visitor_id, landing_path, referrer, utm_source, utm_medium, utm_campaign, utm_content, utm_term, device_type } = body;

      if (!session_id || !visitor_id) {
        return new Response(JSON.stringify({ error: "session_id and visitor_id are required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      await sql`
        INSERT INTO public.quiz_sessions (
          session_id, visitor_id, landing_path, referrer,
          utm_source, utm_medium, utm_campaign, utm_content, utm_term, device_type
        ) VALUES (
          ${session_id}, ${visitor_id}, ${landing_path}, ${referrer},
          ${utm_source}, ${utm_medium}, ${utm_campaign}, ${utm_content}, ${utm_term}, ${device_type}
        )
        ON CONFLICT (session_id) DO NOTHING
      `;

      return new Response(JSON.stringify({ success: true }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/api/quiz-answers" && request.method === "POST") {
      const body = await request.json();
      const { session_id, question_id, answer } = body;

      if (!session_id || question_id === undefined || answer === undefined) {
        return new Response(JSON.stringify({ error: "session_id, question_id, and answer are required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      await sql`
        INSERT INTO public.quiz_answers (session_id, question_id, answer)
        VALUES (${session_id}, ${question_id}, ${answer})
        ON CONFLICT (session_id, question_id) DO UPDATE SET
          answer = EXCLUDED.answer,
          answered_at = now()
      `;

      return new Response(JSON.stringify({ success: true }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/api/quiz-events" && request.method === "POST") {
      const body = await request.json();
      const { session_id, event_name, metadata } = body;

      if (!session_id || !event_name) {
        return new Response(JSON.stringify({ error: "session_id and event_name are required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      await sql`
        INSERT INTO public.quiz_events (session_id, event_name, metadata)
        VALUES (${session_id}, ${event_name}, ${JSON.stringify(metadata ?? {})})
      `;

      return new Response(JSON.stringify({ success: true }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/api/respostas-quiz" && request.method === "POST") {
      const body = await request.json();
      const { resposta_1, resposta_2, resposta_3, resposta_4, resposta_5, resposta_6, resposta_7, resposta_8, resultado } = body;

      await sql`
        INSERT INTO public.respostas_quiz (
          resposta_1, resposta_2, resposta_3, resposta_4,
          resposta_5, resposta_6, resposta_7, resposta_8, resultado
        ) VALUES (
          ${resposta_1 ?? null}, ${resposta_2 ?? null}, ${resposta_3 ?? null}, ${resposta_4 ?? null},
          ${resposta_5 ?? null}, ${resposta_6 ?? null}, ${resposta_7 ?? null}, ${resposta_8 ?? null}, ${resultado}
        )
      `;

      return new Response(JSON.stringify({ success: true }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/api/rpc/record-completion" && request.method === "POST") {
      const body = await request.json();
      const { p_session_id } = body;

      if (!p_session_id) {
        return new Response(JSON.stringify({ error: "p_session_id is required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const session = await sql`
        SELECT 1 FROM public.quiz_sessions WHERE session_id = ${p_session_id}
      `;

      if (session.length === 0) {
        return new Response(JSON.stringify({ result: false }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      await sql`
        INSERT INTO public.quiz_events (session_id, event_name, metadata)
        VALUES (${p_session_id}, 'quiz_completed', '{}'::jsonb)
      `;

      await sql`
        UPDATE public.quiz_sessions
        SET completed_at = COALESCE(completed_at, now()), current_step = 8
        WHERE session_id = ${p_session_id}
      `;

      return new Response(JSON.stringify({ result: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/api/analytics/funnel" && request.method === "GET") {
      const result = await sql`SELECT * FROM public.analytics_funnel_overview`;
      return new Response(JSON.stringify(result[0] ?? {}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/api/analytics/visitors" && request.method === "GET") {
      const result = await sql`SELECT * FROM public.analytics_visitors_overview`;
      return new Response(JSON.stringify(result[0] ?? {}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/api/analytics/daily" && request.method === "GET") {
      const result = await sql`SELECT * FROM public.analytics_visitors_daily`;
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/api/analytics/traffic" && request.method === "GET") {
      const result = await sql`SELECT * FROM public.analytics_traffic_sources`;
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/api/analytics/devices" && request.method === "GET") {
      const result = await sql`SELECT * FROM public.analytics_devices`;
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/api/analytics/campaigns" && request.method === "GET") {
      const result = await sql`SELECT * FROM public.analytics_campaigns`;
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/api/analytics/campaign-funnel" && request.method === "GET") {
      try {
        const result = await sql`SELECT * FROM public.analytics_campaign_funnel ORDER BY unique_visitors DESC`;
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch {
        type SessionRow = { session_id: string; visitor_id: string | null; utm_source: string | null; utm_medium: string | null; utm_campaign: string | null; utm_content: string | null; utm_term: string | null };
        type EventRow = { session_id: string; event_name: string };
        type CampaignFunnel = { source: string; medium: string; campaign: string; content: string; term: string; unique_visitors: number; sessions: number; unique_quiz_starters: number; quiz_starts: number; unique_quiz_completions: number; quiz_completions: number; unique_result_viewers: number; result_views: number; unique_checkout_visitors: number; checkout_clicks: number; unique_cta_visitors: number; cta_clicks: number };

        const [sessionsResult, eventsResult] = await Promise.all([
          sql<SessionRow[]>`SELECT session_id, visitor_id, utm_source, utm_medium, utm_campaign, utm_content, utm_term FROM public.quiz_sessions ORDER BY started_at ASC`,
          sql<EventRow[]>`SELECT session_id, event_name FROM public.quiz_events ORDER BY created_at ASC`,
        ]);

        const eventSets = new Map<string, Set<string>>();
        eventsResult.forEach((e) => { const s = eventSets.get(e.session_id) || new Set<string>(); s.add(e.event_name); eventSets.set(e.session_id, s); });

        const groups = new Map<string, CampaignFunnel>();
        const visitors = new Map<string, { v: Set<string>; s: Set<string>; c: Set<string>; r: Set<string>; k: Set<string>; a: Set<string> }>();

        sessionsResult.forEach((x) => {
          const ev = eventSets.get(x.session_id) || new Set<string>();
          const source = x.utm_source?.trim() || "Direto";
          const medium = x.utm_medium?.trim() || "—";
          const campaign = x.utm_campaign?.trim() || "—";
          const content = x.utm_content?.trim() || "—";
          const term = x.utm_term?.trim() || "—";
          const key = [source, medium, campaign, content, term].join("\u001f");

          const g = groups.get(key) || { source, medium, campaign, content, term, unique_visitors: 0, sessions: 0, unique_quiz_starters: 0, quiz_starts: 0, unique_quiz_completions: 0, quiz_completions: 0, unique_result_viewers: 0, result_views: 0, unique_checkout_visitors: 0, checkout_clicks: 0, unique_cta_visitors: 0, cta_clicks: 0 };
          const u = visitors.get(key) || { v: new Set<string>(), s: new Set<string>(), c: new Set<string>(), r: new Set<string>(), k: new Set<string>(), a: new Set<string>() };

          g.sessions++; if (x.visitor_id) u.v.add(x.visitor_id);
          if (ev.has("quiz_started")) { g.quiz_starts++; if (x.visitor_id) u.s.add(x.visitor_id); }
          if (ev.has("quiz_completed")) { g.quiz_completions++; if (x.visitor_id) u.c.add(x.visitor_id); }
          if (ev.has("quiz_completed") && ev.has("result_viewed")) { g.result_views++; if (x.visitor_id) u.r.add(x.visitor_id); }
          if (ev.has("quiz_completed") && ev.has("result_viewed") && ev.has("checkout_click")) { g.checkout_clicks++; if (x.visitor_id) u.k.add(x.visitor_id); }
          if (ev.has("cta_click")) { g.cta_clicks++; if (x.visitor_id) u.a.add(x.visitor_id); }

          groups.set(key, g); visitors.set(key, u);
        });

        const data = [...groups].map(([key, g]) => { const u = visitors.get(key)!; return { ...g, unique_visitors: u.v.size, unique_quiz_starters: u.s.size, unique_quiz_completions: u.c.size, unique_result_viewers: u.r.size, unique_checkout_visitors: u.k.size, unique_cta_visitors: u.a.size }; }).sort((a, b) => b.unique_visitors - a.unique_visitors || b.sessions - a.sessions);

        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return null;
  } catch (error) {
    console.error("[API] Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function serveStatic(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (!path.startsWith("/assets/") && path !== "/favicon.ico") return null;

  try {
    const filePath = path === "/favicon.ico"
      ? "dist/client/favicon.ico"
      : `dist/client${path}`;

    const f = Bun.file(filePath);
    if (!(await f.exists())) return null;

    const ext = filePath.split(".").pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      js: "application/javascript",
      mjs: "application/javascript",
      css: "text/css",
      ico: "image/x-icon",
      png: "image/png",
      svg: "image/svg+xml",
      woff: "font/woff",
      woff2: "font/woff2",
    };

    return new Response(f, {
      headers: {
        "Content-Type": mimeTypes[ext ?? ""] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return null;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const apiResponse = await handleApiRoutes(request);
      if (apiResponse) return apiResponse;

      const staticResponse = await serveStatic(request);
      if (staticResponse) return staticResponse;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};