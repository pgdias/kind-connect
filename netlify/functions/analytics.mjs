const COOKIE_NAME = "blinda_analytics_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

const RESOURCES = {
  analytics_visitors_overview: "analytics_visitors_overview?select=*",
  analytics_visitors_daily: "analytics_visitors_daily?select=day,visitors&order=day.asc",
  analytics_funnel_overview: "analytics_funnel_overview?select=*",
  analytics_traffic_sources: "analytics_traffic_sources?select=source,medium,unique_visitors,sessions",
  analytics_devices: "analytics_devices?select=device,unique_visitors,sessions",
  analytics_campaigns: "analytics_campaigns?select=source,medium,campaign,content,term,unique_visitors,sessions",
  analytics_campaign_funnel: "analytics_campaign_funnel?select=*&order=unique_checkout_visitors.desc,unique_quiz_completions.desc,unique_visitors.desc",
};

function readCookie(request, name) {
  const header = request.headers.get("cookie") || "";
  const match = header.split(";").map((part) => part.trim()).find((part) => part.startsWith(name + "="));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

function safeEqual(left, right) {
  if (!left || !right || left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

function response(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}

function authorized(request) {
  const expected = process.env.ANALYTICS_ADMIN_KEY || "";
  const cookie = readCookie(request, COOKIE_NAME);
  return safeEqual(cookie, expected);
}

async function fetchResource(resource) {
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const secretKey = process.env.SUPABASE_SECRET_KEY || "";

  if (!supabaseUrl || !secretKey) {
    throw new Error("A função de analytics não está configurada no Netlify.");
  }

  const path = RESOURCES[resource];
  if (!path) {
    throw new Error("Recurso de analytics não permitido.");
  }

  const result = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    headers: {
      apikey: secretKey,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const body = await result.text();
  if (!result.ok) {
    throw new Error(`Supabase respondeu ${result.status}: ${body}`);
  }

  return JSON.parse(body);
}

export default async function handler(request) {
  const adminKey = process.env.ANALYTICS_ADMIN_KEY || "";

  if (!adminKey) {
    return response({ error: "ANALYTICS_ADMIN_KEY não configurada." }, 503);
  }

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": process.env.URL || "*",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  if (request.method === "POST") {
    let body;
    try {
      body = await request.json();
    } catch {
      return response({ error: "Corpo inválido." }, 400);
    }

    if (!safeEqual(String(body?.key || ""), adminKey)) {
      return response({ error: "Chave inválida." }, 401, {
        "Cache-Control": "no-store",
      });
    }

    return response(
      { ok: true },
      200,
      {
        "Set-Cookie": `${COOKIE_NAME}=${encodeURIComponent(adminKey)}; Max-Age=${SESSION_MAX_AGE}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    );
  }

  if (request.method === "DELETE") {
    return response(
      { ok: true },
      200,
      {
        "Set-Cookie": `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    );
  }

  if (request.method !== "GET") {
    return response({ error: "Método não permitido." }, 405, { Allow: "GET, POST, DELETE, OPTIONS" });
  }

  if (!authorized(request)) {
    return response({ error: "Não autorizado." }, 401);
  }

  const url = new URL(request.url);
  const resource = url.searchParams.get("resource");

  if (!resource) {
    return response({ authenticated: true });
  }

  try {
    const data = await fetchResource(resource);
    return response({ data });
  } catch (error) {
    return response(
      { error: error instanceof Error ? error.message : "Erro ao carregar analytics." },
      502,
    );
  }
}

export const config = {
  path: "/api/analytics",
};
