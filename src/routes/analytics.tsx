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

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });

async function getData<T>(path: string): Promise<T> {
  if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Supabase não configurado.");
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!response.ok) throw new Error("Não foi possível carregar os dados.");
  return response.json() as Promise<T>;
}

function formatDay(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(new Date(value + "T12:00:00"));
}

function AnalyticsPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const [summary, days] = await Promise.all([
        getData<Overview[]>( "analytics_visitors_overview?select=*" ),
        getData<Daily[]>( "analytics_visitors_daily?select=day,visitors&order=day.asc" ),
      ]);
      setOverview(summary[0] ?? null);
      setDaily(days);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar.");
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
            <p style={{ margin: 0, color: "#64748b" }}>Acompanhamento dos acessos e do funil do quiz.</p>
          </div>
          <button onClick={() => void load()} style={{ border: 0, borderRadius: 10, padding: "11px 16px", background: "#172033", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Atualizar</button>
        </div>

        {error && (
          <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", color: "#9f1239", borderRadius: 12, padding: 16, marginBottom: 20 }}>
            {error}<br /><small>Execute o SQL atualizado em supabase/schema.sql no Supabase.</small>
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
