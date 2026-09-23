import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

type Overview = {
  total_visitors: number;
  visitors_today: number;
  visitors_7d: number;
  visitors_30d: number;
  completed_quizzes: number;
  unfinished_quizzes: number;
};

type Daily = { day: string; visitors: number };
type Funnel = {
  visitors: number;
  quiz_starts: number;
  quiz_completions: number;
  result_views: number;
  checkout_clicks: number;
  cta_clicks: number;
};

type LoadResult<T> = { label: string; data?: T; error?: string };

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });

async function getData<T>(label: string, path: string): Promise<LoadResult<T>> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { label, error: "Variáveis VITE_SUPABASE_URL ou VITE_SUPABASE_PUBLISHABLE_KEY não foram encontradas no build." };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
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

function AnalyticsPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = async () => {
    setLoading(true);
    setErrors([]);
    const cacheBuster = `_t=${Date.now()}`;
    try {
      const [summary, days, funnelData] = await Promise.all([
        getData<Overview[]>("Visitantes", `analytics_visitors_overview?select=*&${cacheBuster}`),
        getData<Daily[]>("Visitantes por dia", `analytics_visitors_daily?select=day,visitors&order=day.asc&${cacheBuster}`),
        getData<Funnel[]>("Funil", `analytics_funnel_overview?select=*&${cacheBuster}`),
      ]);

    const results = [summary, days, funnelData];
    const failures = results.filter((result) => result.error).map((result) => `${result.label}: ${result.error}`);
    setErrors(failures);

      if (summary.data) setOverview(summary.data[0] ?? null);
      if (days.data) setDaily(days.data);
      if (funnelData.data) setFunnel(funnelData.data[0] ?? null);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#f5f7fa", color: "#172033", fontFamily: "Inter, system-ui, sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, color: "#64748b" }}>BLINDA BOLSA</div>
            <h1 style={{ margin: "6px 0 4px", fontSize: 32 }}>Visitantes</h1>
            <p style={{ margin: 0, color: "#64748b" }}>Acompanhamento dos acessos e do funil do quiz.{lastUpdated ? ` Atualizado às ${lastUpdated.toLocaleTimeString("pt-BR")}.` : ""}</p>
          </div>
          <button onClick={() => void load()} disabled={loading} style={{ border: 0, borderRadius: 10, padding: "11px 16px", background: "#172033", color: "#fff", fontWeight: 700, cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1 }}>{loading ? "Atualizando..." : "Atualizar"}</button>
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
                ["Total de visitantes", overview.total_visitors],
                ["Quizzes concluídos", overview.completed_quizzes],
                ["Abandonaram", overview.unfinished_quizzes],
              ].map(([label, value]) => (
                <div key={String(label)} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 4px 20px rgba(15,23,42,.06)" }}>
                  <div style={{ color: "#64748b", fontSize: 13, fontWeight: 700 }}>{label}</div>
                  <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>{Number(value).toLocaleString("pt-BR")}</div>
                </div>
              ))}
            </div>

            {funnel && (
              <section style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 22, boxShadow: "0 4px 20px rgba(15,23,42,.06)" }}>
                <h2 style={{ margin: "0 0 18px", fontSize: 20 }}>Funil</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
                  {[
                    ["Iniciaram o quiz", funnel.quiz_starts],
                    ["Concluíram", funnel.quiz_completions],
                    ["Viram o resultado", funnel.result_views],
                    ["Cliques no checkout", funnel.checkout_clicks],
                    ["Cliques nos CTAs", funnel.cta_clicks],
                  ].map(([label, value]) => (
                    <div key={String(label)} style={{ background: "#f8fafc", borderRadius: 12, padding: 16 }}>
                      <div style={{ color: "#64748b", fontSize: 12, fontWeight: 700 }}>{label}</div>
                      <div style={{ fontSize: 26, fontWeight: 800, marginTop: 7 }}>{Number(value).toLocaleString("pt-BR")}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

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
