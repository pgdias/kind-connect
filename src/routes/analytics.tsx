import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

type Overview = {
  total_visitors: number;
  unique_visitors: number;
  visitors_today: number;
  visitors_7d: number;
  visitors_30d: number;
  completed_quizzes: number;
  unfinished_quizzes: number;
};

type Daily = { day: string; visitors: number };
type TrafficSource = { source: string; medium: string; unique_visitors: number; sessions: number };
type Device = { device: string; unique_visitors: number; sessions: number };
type Campaign = { source: string; medium: string; campaign: string; content: string; term: string; unique_visitors: number; sessions: number };
type CampaignFunnel = Campaign & {
  unique_quiz_starters: number;
  quiz_starts: number;
  unique_quiz_completions: number;
  quiz_completions: number;
  unique_result_viewers: number;
  result_views: number;
  unique_checkout_visitors: number;
  checkout_clicks: number;
  unique_cta_visitors: number;
  cta_clicks: number;
};
type Funnel = {
  visitors: number;
  quiz_starts: number;
  quiz_completions: number;
  result_views: number;
  checkout_clicks: number;
  cta_clicks: number;
  unique_quiz_starters: number;
  unique_quiz_completions: number;
  unique_result_viewers: number;
  unique_checkout_visitors: number;
  unique_cta_visitors: number;
};

type LoadResult<T> = { label: string; data?: T; error?: string };

type QuizSessionRow = {
  session_id: string;
  visitor_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
};

type QuizEventRow = {
  session_id: string;
  event_name: string;
};

function buildCampaignFunnel(sessions: QuizSessionRow[], events: QuizEventRow[]): CampaignFunnel[] {
  const bySession = new Map<string, QuizSessionRow>();
  sessions.forEach((session) => bySession.set(session.session_id, session));

  const eventSets = new Map<string, Set<string>>();
  events.forEach((event) => {
    const set = eventSets.get(event.session_id) ?? new Set<string>();
    set.add(event.event_name);
    eventSets.set(event.session_id, set);
  });

  const groups = new Map<string, CampaignFunnel>();

  for (const session of sessions) {
    const eventsForSession = eventSets.get(session.session_id) ?? new Set<string>();
    const source = session.utm_source?.trim() || "Direto / não identificado";
    const medium = session.utm_medium?.trim() || "—";
    const campaign = session.utm_campaign?.trim() || "—";
    const content = session.utm_content?.trim() || "—";
    const term = session.utm_term?.trim() || "—";
    const key = [source, medium, campaign, content, term].join("\u001f");
    const current = groups.get(key) ?? {
      source, medium, campaign, content, term,
      unique_visitors: 0, sessions: 0,
      unique_quiz_starters: 0, quiz_starts: 0,
      unique_quiz_completions: 0, quiz_completions: 0,
      unique_result_viewers: 0, result_views: 0,
      unique_checkout_visitors: 0, checkout_clicks: 0,
      unique_cta_visitors: 0, cta_clicks: 0,
    };

    current.sessions += 1;
    current.unique_visitors += session.visitor_id ? 1 : 0;
    if (eventsForSession.has("quiz_started")) { current.quiz_starts += 1; if (session.visitor_id) current.unique_quiz_starters += 1; }
    if (eventsForSession.has("quiz_completed")) { current.quiz_completions += 1; if (session.visitor_id) current.unique_quiz_completions += 1; }
    if (eventsForSession.has("quiz_completed") && eventsForSession.has("result_viewed")) { current.result_views += 1; if (session.visitor_id) current.unique_result_viewers += 1; }
    if (eventsForSession.has("quiz_completed") && eventsForSession.has("result_viewed") && eventsForSession.has("checkout_click")) { current.checkout_clicks += 1; if (session.visitor_id) current.unique_checkout_visitors += 1; }
    if (eventsForSession.has("cta_click")) { current.cta_clicks += 1; if (session.visitor_id) current.unique_cta_visitors += 1; }

    groups.set(key, current);
  }

  return Array.from(groups.values()).sort((a, b) =>
    b.unique_checkout_visitors - a.unique_checkout_visitors ||
    b.unique_quiz_completions - a.unique_quiz_completions ||
    b.unique_visitors - a.unique_visitors ||
    b.sessions - a.sessions
  );
}

async function getCampaignFunnelWithFallback(): Promise<LoadResult<CampaignFunnel[]>> {
  const primary = await getData<CampaignFunnel[]>(
    "Funil por campanha",
    "analytics_campaign_funnel?select=*&order=unique_checkout_visitors.desc,unique_quiz_completions.desc,unique_visitors.desc"
  );
  if (!primary.error || !primary.error.includes("analytics_campaign_funnel")) return primary;

  const [sessions, events] = await Promise.all([
    getData<QuizSessionRow[]>(
      "Dados de campanha",
      "quiz_sessions?select=session_id,visitor_id,utm_source,utm_medium,utm_campaign,utm_content,utm_term&order=started_at.asc"
    ),
    getData<QuizEventRow[]>(
      "Eventos de campanha",
      "quiz_events?select=session_id,event_name&order=created_at.asc"
    ),
  ]);

  if (sessions.error || events.error) {
    return { label: "Funil por campanha", error: primary.error };
  }

  return { label: "Funil por campanha", data: buildCampaignFunnel(sessions.data ?? [], events.data ?? []) };
}



export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });

async function getData<T>(label: string, path: string): Promise<LoadResult<T>> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { label, error: "Variáveis VITE_SUPABASE_URL ou VITE_SUPABASE_PUBLISHABLE_KEY não foram encontradas no build." };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      cache: "no-store",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Cache-Control": "no-cache" },
    });

    const body = await response.text();

    if (!response.ok) {
      let detail = body;
      try {
        const parsed = JSON.parse(body);
        detail = parsed.message || parsed.error || parsed.hint || body;
      } catch {
        // Keep the raw response when it is not JSON.
      }
      return { label, error: `${response.status} ${response.statusText}: ${detail}` };
    }

    try {
      return { label, data: JSON.parse(body) as T };
    } catch {
      return { label, error: "O Supabase respondeu com um formato inesperado." };
    }
  } catch (err) {
    return { label, error: err instanceof Error ? err.message : "Erro de rede ao acessar o Supabase." };
  }
}

function formatDay(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(new Date(value + "T12:00:00"));
}

function conversionRate(value: number, base: number) {
  if (!base) return 0;
  return Math.min((value / base) * 100, 100);
}

function formatPercent(value: number) {
  return value.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "%";
}

function AnalyticsPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignFunnel, setCampaignFunnel] = useState<CampaignFunnel[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [resetting, setResetting] = useState(false);

  const load = async () => {
    setLoading(true);
    setErrors([]);
    try {
      const [summary, days, funnelData, trafficSourcesData, devicesData, campaignsData, campaignFunnelData] = await Promise.all([
        getData<Overview[]>("Visitantes", "analytics_visitors_overview?select=*"),
        getData<Daily[]>("Visitantes por dia", "analytics_visitors_daily?select=day,visitors&order=day.asc"),
        getData<Funnel[]>("Funil", "analytics_funnel_overview?select=*"),
        getData<TrafficSource[]>("Origem do tráfego", "analytics_traffic_sources?select=source,medium,unique_visitors,sessions"),
        getData<Device[]>("Dispositivos", "analytics_devices?select=device,unique_visitors,sessions"),
        getData<Campaign[]>("Campanhas UTM", "analytics_campaigns?select=source,medium,campaign,content,term,unique_visitors,sessions"),
        getCampaignFunnelWithFallback(),
      ]);

    const results = [summary, days, funnelData, trafficSourcesData, devicesData, campaignsData, campaignFunnelData];
    const failures = results.filter((result) => result.error).map((result) => `${result.label}: ${result.error}`);
    setErrors(failures);

      if (summary.data) setOverview(summary.data[0] ?? null);
      if (days.data) setDaily(days.data);
      if (funnelData.data) setFunnel(funnelData.data[0] ?? null);
      if (trafficSourcesData.data) setTrafficSources(trafficSourcesData.data);
      if (devicesData.data) setDevices(devicesData.data);
      if (campaignsData.data) setCampaigns(campaignsData.data);
      if (campaignFunnelData.data) setCampaignFunnel(campaignFunnelData.data);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const resetTestData = async () => {
    const confirmed = window.confirm("Isso vai apagar todos os dados de Analytics e do quiz. Use somente antes de começar os testes reais. Continuar?");
    if (!confirmed || !SUPABASE_URL || !SUPABASE_KEY) return;

    setResetting(true);
    try {
      const response = await fetch(SUPABASE_URL + "/rest/v1/rpc/reset_analytics_data", {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: "Bearer " + SUPABASE_KEY,
          "Content-Type": "application/json",
        },
        body: "{}",
      });
      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(body || "HTTP " + response.status);
      }
      await load();
      window.alert("Dados de teste apagados. O Analytics está zerado.");
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Não foi possível zerar os dados.");
    } finally {
      setResetting(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#f5f7fa", color: "#172033", fontFamily: "Inter, system-ui, sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, color: "#64748b" }}>BLINDA BOLSA</div>
            <h1 style={{ margin: "6px 0 4px", fontSize: 32 }}>Visitantes</h1>
            <p style={{ margin: 0, color: "#64748b" }}>Acompanhamento dos acessos e do funil do quiz.{lastUpdated ? ` Atualizado às ${lastUpdated.toLocaleTimeString("pt-BR")}.` : ""}</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <button onClick={() => void resetTestData()} disabled={loading || resetting} style={{ border: "1px solid #fecaca", borderRadius: 10, padding: "11px 16px", background: "#fff", color: "#b91c1c", fontWeight: 700, cursor: resetting ? "wait" : "pointer", opacity: resetting ? 0.7 : 1 }}>{resetting ? "Zerando..." : "Zerar dados de teste"}</button>
            <button onClick={() => void load()} disabled={loading || resetting} style={{ border: 0, borderRadius: 10, padding: "11px 16px", background: "#172033", color: "#fff", fontWeight: 700, cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1 }}>{loading ? "Atualizando..." : "Atualizar"}</button>
          </div>
        </div>

        {errors.length > 0 && (
          <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", color: "#9f1239", borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <strong>Não foi possível carregar todos os dados.</strong>
            <div style={{ marginTop: 8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, lineHeight: 1.6, overflowWrap: "anywhere" }}>
              {errors.map((message) => <div key={message}>{message}</div>)}
            </div>
            <small style={{ display: "block", marginTop: 10 }}>Esse diagnóstico mostra o erro devolvido pelo Supabase para sabermos exatamente o que corrigir.</small>
          </div>
        )}

        {!overview ? (
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 4px 20px rgba(15,23,42,.06)" }}>Carregando dados...</div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 14, marginBottom: 22 }}>
              {[
                ["Visitantes hoje", overview.visitors_today],
                ["Últimos 7 dias", overview.visitors_7d],
                ["Últimos 30 dias", overview.visitors_30d],
                ["Sessões registradas", overview.total_visitors],
                ["Visitantes únicos", overview.unique_visitors],
                ["Quizzes concluídos", overview.completed_quizzes],
                ["Abandonaram", overview.unfinished_quizzes],
              ].map(([label, value]) => (
                <div key={String(label)} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 4px 20px rgba(15,23,42,.06)" }}>
                  <div style={{ color: "#64748b", fontSize: 13, fontWeight: 700 }}>{label}</div>
                  <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>{Number(value).toLocaleString("pt-BR")}</div>
                </div>
              ))}
            </div>

            {funnel && overview && (
              <section style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 22, boxShadow: "0 4px 20px rgba(15,23,42,.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 20 }}>Funil de conversão</h2>
                    <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13 }}>Veja quantos avançam em cada etapa e onde o funil perde visitantes.</p>
                  </div>
                  <div style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#64748b" }}>
                    Conversão geral: <strong style={{ color: "#172033" }}>{formatPercent(conversionRate(funnel.unique_checkout_visitors, overview.unique_visitors))}</strong> até o checkout
                  </div>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  {[
                    {
                      label: "Visitantes únicos",
                      value: overview.unique_visitors,
                      base: overview.unique_visitors,
                      rate: 100,
                    },
                    {
                      label: "Iniciaram o quiz",
                      value: funnel.quiz_starts,
                      base: overview.unique_visitors,
                      rate: conversionRate(funnel.unique_quiz_starters, overview.unique_visitors),
                    },
                    {
                      label: "Concluíram",
                      value: funnel.quiz_completions,
                      base: funnel.quiz_starts,
                      rate: conversionRate(funnel.unique_quiz_completions, funnel.unique_quiz_starters),
                    },
                    {
                      label: "Viram o resultado",
                      value: funnel.result_views,
                      base: funnel.quiz_completions,
                      rate: conversionRate(funnel.unique_result_viewers, funnel.unique_quiz_completions),
                    },
                    {
                      label: "Cliques no checkout",
                      value: funnel.checkout_clicks,
                      base: funnel.result_views,
                      rate: conversionRate(funnel.unique_checkout_visitors, funnel.unique_result_viewers),
                    },
                    {
                      label: "Cliques nos CTAs",
                      value: funnel.cta_clicks,
                      base: overview.unique_visitors,
                      rate: conversionRate(funnel.unique_cta_visitors, overview.unique_visitors),
                    },
                  ].map((step) => (
                    <div key={step.label} style={{ display: "grid", gridTemplateColumns: "minmax(170px,1fr) 70px minmax(180px,2fr) 80px", alignItems: "center", gap: 14, background: "#f8fafc", borderRadius: 12, padding: "13px 16px" }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{step.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, textAlign: "right" }}>{step.value.toLocaleString("pt-BR")}</div>
                      <div>
                        <div style={{ height: 9, background: "#e9eef5", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ width: `${step.rate}%`, height: "100%", background: "#172033", borderRadius: 99 }} />
                        </div>
                      </div>
                      <div style={{ textAlign: "right", fontSize: 13, fontWeight: 800 }}>{formatPercent(step.rate)}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 14, color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>
                  A porcentagem de cada etapa usa visitantes únicos. Os números grandes representam sessões. A conversão geral considera visitantes únicos até o checkout. “Cliques nos CTAs” é mostrado separadamente porque pode acontecer fora da sequência principal do quiz.
                </div>
              </section>
            )}

            <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14, marginBottom: 22 }}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 4px 20px rgba(15,23,42,.06)" }}>
                <h2 style={{ margin: 0, fontSize: 20 }}>Origem do tráfego</h2>
                <p style={{ margin: "6px 0 18px", color: "#64748b", fontSize: 13 }}>Visitantes únicos e sessões por origem e mídia. Links sem UTM aparecem como direto / não identificado.</p>
                {trafficSources.length === 0 ? <p style={{ color: "#64748b" }}>Ainda não há dados de origem.</p> : (
                  <div style={{ display: "grid", gap: 8 }}>
                    {trafficSources.map((item) => (
                      <div key={item.source + item.medium} style={{ display: "grid", gridTemplateColumns: "minmax(120px,1fr) 90px 70px", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eef2f7" }}>
                        <div>
                          <strong style={{ fontSize: 13 }}>{item.source}</strong>
                          <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{item.medium}</div>
                        </div>
                        <div style={{ textAlign: "right", fontSize: 13 }}><strong>{item.unique_visitors}</strong><div style={{ color: "#64748b", fontSize: 10 }}>únicos</div></div>
                        <div style={{ textAlign: "right", fontSize: 13 }}><strong>{item.sessions}</strong><div style={{ color: "#64748b", fontSize: 10 }}>sessões</div></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 4px 20px rgba(15,23,42,.06)" }}>
                <h2 style={{ margin: 0, fontSize: 20 }}>Dispositivos</h2>
                <p style={{ margin: "6px 0 18px", color: "#64748b", fontSize: 13 }}>Distribuição das sessões e visitantes únicos por tipo de dispositivo.</p>
                {devices.length === 0 ? <p style={{ color: "#64748b" }}>Ainda não há dados de dispositivo.</p> : (
                  <div style={{ display: "grid", gap: 8 }}>
                    {devices.map((item) => (
                      <div key={item.device} style={{ display: "grid", gridTemplateColumns: "1fr 90px 70px", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eef2f7" }}>
                        <strong style={{ fontSize: 13 }}>{item.device === "mobile" ? "Celular" : item.device === "tablet" ? "Tablet" : item.device === "desktop" ? "Computador" : "Não identificado"}</strong>
                        <div style={{ textAlign: "right", fontSize: 13 }}><strong>{item.unique_visitors}</strong><div style={{ color: "#64748b", fontSize: 10 }}>únicos</div></div>
                        <div style={{ textAlign: "right", fontSize: 13 }}><strong>{item.sessions}</strong><div style={{ color: "#64748b", fontSize: 10 }}>sessões</div></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 22, boxShadow: "0 4px 20px rgba(15,23,42,.06)" }}>
              <h2 style={{ margin: 0, fontSize: 20 }}>Desempenho por campanha</h2>
              <p style={{ margin: "6px 0 18px", color: "#64748b", fontSize: 13 }}>Mostra o caminho de cada origem/campanha desde a chegada até o checkout. Os percentuais usam visitantes únicos.</p>
              {campaignFunnel.length === 0 ? <p style={{ color: "#64748b" }}>Ainda não há dados de campanha.</p> : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 980, fontSize: 13 }}>
                    <thead><tr style={{ textAlign: "left", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
                      <th style={{ padding: "10px 8px" }}>Campanha</th><th style={{ padding: "10px 8px", textAlign: "right" }}>Visitantes</th><th style={{ padding: "10px 8px", textAlign: "right" }}>Iniciaram</th><th style={{ padding: "10px 8px", textAlign: "right" }}>Concluíram</th><th style={{ padding: "10px 8px", textAlign: "right" }}>Resultado</th><th style={{ padding: "10px 8px", textAlign: "right" }}>Checkout</th><th style={{ padding: "10px 8px", textAlign: "right" }}>Conv.</th>
                    </tr></thead>
                    <tbody>
                      {campaignFunnel.map((item, index) => {
                        const checkoutRate = conversionRate(item.unique_checkout_visitors, item.unique_visitors);
                        return (
                          <tr key={item.source + item.medium + item.campaign + item.content + item.term + index} style={{ borderBottom: "1px solid #eef2f7" }}>
                            <td style={{ padding: "11px 8px" }}><strong>{item.campaign}</strong><div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{item.source} · {item.medium}</div></td>
                            <td style={{ padding: "11px 8px", textAlign: "right", fontWeight: 700 }}>{item.unique_visitors}</td>
                            <td style={{ padding: "11px 8px", textAlign: "right" }}><strong>{item.unique_quiz_starters}</strong><div style={{ color: "#64748b", fontSize: 10 }}>{formatPercent(conversionRate(item.unique_quiz_starters, item.unique_visitors))}</div></td>
                            <td style={{ padding: "11px 8px", textAlign: "right" }}><strong>{item.unique_quiz_completions}</strong><div style={{ color: "#64748b", fontSize: 10 }}>{formatPercent(conversionRate(item.unique_quiz_completions, item.unique_quiz_starters))}</div></td>
                            <td style={{ padding: "11px 8px", textAlign: "right" }}><strong>{item.unique_result_viewers}</strong><div style={{ color: "#64748b", fontSize: 10 }}>{formatPercent(conversionRate(item.unique_result_viewers, item.unique_quiz_completions))}</div></td>
                            <td style={{ padding: "11px 8px", textAlign: "right" }}><strong>{item.unique_checkout_visitors}</strong><div style={{ color: "#64748b", fontSize: 10 }}>{formatPercent(conversionRate(item.unique_checkout_visitors, item.unique_result_viewers))}</div></td>
                            <td style={{ padding: "11px 8px", textAlign: "right", fontWeight: 800 }}>{formatPercent(checkoutRate)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              <div style={{ marginTop: 14, color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>“Conv.” é a conversão geral da campanha: visitantes únicos que chegaram ao checkout ÷ visitantes únicos da campanha. As demais porcentagens mostram a passagem entre etapas.</div>
            </section>

            <section style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 22, boxShadow: "0 4px 20px rgba(15,23,42,.06)" }}>
              <h2 style={{ margin: 0, fontSize: 20 }}>Campanhas / UTM</h2>
              <p style={{ margin: "6px 0 18px", color: "#64748b", fontSize: 13 }}>Mostra quais links de campanha trouxeram visitantes e quantas sessões foram registradas.</p>
              {campaigns.length === 0 ? <p style={{ color: "#64748b" }}>Ainda não há dados de campanhas.</p> : (
                <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720, fontSize: 13 }}>
                  <thead><tr style={{ textAlign: "left", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "10px 8px" }}>Origem</th><th style={{ padding: "10px 8px" }}>Mídia</th><th style={{ padding: "10px 8px" }}>Campanha</th><th style={{ padding: "10px 8px" }}>Conteúdo</th><th style={{ padding: "10px 8px" }}>Termo</th><th style={{ padding: "10px 8px", textAlign: "right" }}>Únicos</th><th style={{ padding: "10px 8px", textAlign: "right" }}>Sessões</th>
                  </tr></thead>
                  <tbody>{campaigns.map((item, index) => (
                    <tr key={item.source + item.medium + item.campaign + item.content + item.term + index} style={{ borderBottom: "1px solid #eef2f7" }}>
                      <td style={{ padding: "11px 8px", fontWeight: 700 }}>{item.source}</td><td style={{ padding: "11px 8px" }}>{item.medium}</td><td style={{ padding: "11px 8px" }}>{item.campaign}</td><td style={{ padding: "11px 8px" }}>{item.content}</td><td style={{ padding: "11px 8px" }}>{item.term}</td><td style={{ padding: "11px 8px", textAlign: "right", fontWeight: 700 }}>{item.unique_visitors}</td><td style={{ padding: "11px 8px", textAlign: "right", fontWeight: 700 }}>{item.sessions}</td>
                    </tr>
                  ))}</tbody>
                </table></div>
              )}
            </section>

            <section style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 4px 20px rgba(15,23,42,.06)" }}>
              <h2 style={{ margin: "0 0 20px", fontSize: 20 }}>Visitantes por dia</h2>
              {daily.length === 0 ? <p style={{ color: "#64748b" }}>Ainda não há visitantes registrados.</p> : (
                <div style={{ display: "grid", gap: 10 }}>
                  {daily.map((item) => {
                    const max = Math.max(...daily.map((d) => d.visitors), 1);
                    return (
                      <div key={item.day} style={{ display: "grid", gridTemplateColumns: "70px 1fr 45px", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 12, color: "#64748b" }}>{formatDay(item.day)}</span>
                        <div style={{ height: 10, background: "#e9eef5", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ width: `${(item.visitors / max) * 100}%`, height: "100%", background: "#172033", borderRadius: 99 }} />
                        </div>
                        <strong style={{ textAlign: "right", fontSize: 13 }}>{item.visitors}</strong>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
