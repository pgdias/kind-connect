import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

async function getData<T>(label: string, path: string): Promise<LoadResult<T>> {
  try {
    const response = await fetch(`/api/analytics/${path}`, { cache: "no-store" });
    const body = await response.text();
    if (!response.ok) {
      let detail = body;
      try {
        const parsed = JSON.parse(body);
        detail = parsed.message || parsed.error || parsed.hint || body;
      } catch {
        // Ignore JSON parse errors
      }
      return { label, error: `${response.status}: ${detail}` };
    }
    return { label, data: JSON.parse(body) as T };
  } catch (err) {
    return { label, error: err instanceof Error ? err.message : "Erro de rede." };
  }
}

async function getCampaignFunnel(): Promise<LoadResult<CampaignFunnel[]>> {
  const primary = await getData<CampaignFunnel[]>("Campanhas", "campaign-funnel");
  if (!primary.error) return primary;
  return { label: "Campanhas", error: primary.error };
}

function pct(v: number, b: number) { return b ? Math.min(v / b * 100, 100) : 0; }
function fmtPct(v: number) { return v.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "%"; }
function day(v: string) { return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(v + "T12:00:00")).replace(".", ""); }
function icon(kind: string) { return kind === "users" ? "◉" : kind === "quiz" ? "✦" : kind === "check" ? "✓" : kind === "cart" ? "↗" : "•"; }

function AnalyticsPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [sources, setSources] = useState<TrafficSource[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignFunnel, setCampaignFunnel] = useState<CampaignFunnel[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState<Date | null>(null);

  const load = async () => {
    setLoading(true);
    setErrors([]);
    const [summary, days, fun, src, dev, camp, cf] = await Promise.all([
      getData<Overview>("Resumo", "visitors"),
      getData<Daily[]>("Diário", "daily"),
      getData<Funnel>("Funil", "funnel"),
      getData<TrafficSource[]>("Origens", "traffic"),
      getData<Device[]>("Dispositivos", "devices"),
      getData<Campaign[]>("UTM", "campaigns"),
      getCampaignFunnel(),
    ]);
    const fails = [summary, days, fun, src, dev, camp, cf].filter((x) => x.error).map((x) => `${x.label}: ${x.error}`);
    setErrors(fails);
    if (summary.data) setOverview(summary.data as Overview);
    if (days.data) setDaily(days.data);
    if (fun.data) setFunnel(fun.data as Funnel);
    if (src.data) setSources(src.data);
    if (dev.data) setDevices(dev.data);
    if (camp.data) setCampaigns(camp.data);
    if (cf.data) setCampaignFunnel(cf.data);
    setUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const maxDaily = Math.max(...daily.map((x) => x.visitors), 1);
  const primarySource = sources[0];
  const primaryDevice = devices.slice().sort((a, b) => b.unique_visitors - a.unique_visitors)[0];

  const css = `
  *{box-sizing:border-box}.ba{min-height:100vh;background:#07110d;color:#edf5f0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:28px 18px 60px}.ba-wrap{max-width:1220px;margin:auto}.ba-top{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:28px}.ba-brand{display:flex;align-items:center;gap:12px}.ba-logo{width:44px;height:44px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(145deg,#2fc378,#0f5535);font-weight:900;box-shadow:0 10px 30px #0c5b3844}.ba-kicker{font-size:11px;letter-spacing:.16em;color:#769083;font-weight:800}.ba-title{font-size:30px;letter-spacing:-.04em;margin:3px 0 0;font-weight:850}.ba-actions{display:flex;align-items:center;gap:10px}.ba-live{padding:9px 12px;border:1px solid #254235;border-radius:999px;color:#77d5a2;background:#0d2118;font-size:12px;font-weight:800}.ba-dot{display:inline-block;width:7px;height:7px;background:#3ed181;border-radius:50%;margin-right:7px;box-shadow:0 0 0 4px #3ed18116}.ba-refresh{border:1px solid #294638!important;background:#11251c!important;color:#eaf4ef!important;border-radius:11px!important;padding:10px 15px!important;box-shadow:none!important}.ba-refresh:hover{background:#183226!important}.ba-hero{padding:25px;border:1px solid #20392d;border-radius:22px;background:linear-gradient(135deg,#102219,#0b1812);box-shadow:0 24px 65px #00000030;margin-bottom:18px}.ba-hero-label{color:#88a095;font-size:12px;font-weight:700}.ba-hero-number{font-size:52px;line-height:1;font-weight:900;letter-spacing:-.06em;margin:8px 0}.ba-hero-meta{color:#789086;font-size:13px}.ba-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px}.ba-card{background:linear-gradient(145deg,#0e1d16,#0a1711);border:1px solid #20392d;border-radius:18px;padding:19px;box-shadow:0 14px 42px #0000001c}.ba-card-head{display:flex;justify-content:space-between;color:#789086;font-size:12px;font-weight:750}.ba-icon{width:32px;height:32px;display:grid;place-items:center;background:#0f2a1e;border-radius:10px;font-size:16px}.ba-value{font-size:32px;font-weight:900;margin:6px 0 2px}.ba-sub{color:#789086;font-size:12px}.ba-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-bottom:18px}.ba-section{background:linear-gradient(145deg,#0e1d16,#0a1711);border:1px solid #20392d;border-radius:18px;padding:19px}.ba-section h2{margin:0 0 6px;font-size:16px;font-weight:800}.ba-section p{margin:0 0 14px;color:#789086;font-size:12px}.ba-chart{display:flex;gap:8px;height:180px;align-items:flex-end}.ba-bar-wrap{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px}.ba-bar{width:100%;background:linear-gradient(180deg,#2fc378,#0f5535);border-radius:4px 4px 0 0;min-height:2%}.ba-labels{display:flex;gap:8px;font-size:10px;color:#789086}.ba-label{flex:1;text-align:center}.ba-empty{color:#789086;text-align:center;padding:20px}.ba-funnel{display:flex;flex-direction:column;gap:10px}.ba-stage{display:flex;align-items:center;gap:12px}.ba-stage-name{width:100px;font-size:13px;font-weight:700}.ba-stage-value{width:60px;text-align:right;font-size:16px}.ba-track{flex:1;height:10px;background:#0f2a1e;border-radius:5px;overflow:hidden}.ba-fill{height:100%;background:linear-gradient(90deg,#2fc378,#0f5535);border-radius:5px}.ba-rate{width:60px;text-align:right;font-size:12px;color:#77d5a2}.ba-list{display:flex;flex-direction:column;gap:10px}.ba-row{display:flex;align-items:center;justify-content:space-between;padding:10px;background:#0a1711;border:1px solid #20392d;border-radius:10px}.ba-row div{display:flex;flex-direction:column}.ba-row strong{font-size:14px}.ba-row small{font-size:11px;color:#789086}.ba-num{display:flex;flex-direction:column;align-items:flex-end;gap:2px}.ba-num b{font-size:16px}.ba-num span{font-size:10px;color:#789086}.ba-wide{grid-column:1/-1}.ba-table{width:100%;border-collapse:collapse;font-size:13px}.ba-table th,.ba-table td{padding:10px;text-align:left;border-bottom:1px solid #20392d}.ba-table th{color:#789086;font-weight:700}.ba-table .num{text-align:right}.ba-badge{background:#1a3a2e;color:#77d5a2;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700}.ba-gold{color:#f5d742;font-weight:800}.ba-footer{margin-top:24px;text-align:center;color:#789086;font-size:12px}.ba-error{background:#2a0f0f;border:1px solid #5a1a1a;color:#f5a0a0;padding:12px;border-radius:10px;margin-bottom:18px}.ba-error strong{display:block;margin-bottom:4px}@media(max-width:900px){.ba-grid{grid-template-columns:1fr}.ba-kpis{grid-template-columns:repeat(2,1fr)}.ba-wide{grid-column:auto}}@media(max-width:520px){.ba-kpis{grid-template-columns:1fr}.ba-actions{flex-direction:column;align-items:flex-start}}`;

  return (
    <main className="ba">
      <style>{css}</style>
      <div className="ba-wrap">
        <header className="ba-top">
          <div className="ba-brand">
            <div className="ba-logo">B</div>
            <div>
              <div className="ba-kicker">BLINDA BOLSA · ANALYTICS</div>
              <div className="ba-title">Visão geral</div>
            </div>
          </div>
          <div className="ba-actions">
            <span className="ba-live"><i className="ba-dot" />Dados em tempo real</span>
            <button className="ba-refresh" onClick={() => void load()} disabled={loading}>
              {loading ? "Atualizando…" : "↻ Atualizar"}
            </button>
          </div>
        </header>
        {errors.length > 0 && (
          <div className="ba-error">
            <strong>Alguns dados não puderam ser carregados.</strong>
            <div style={{ marginTop: 6 }}>{errors.join(" · ")}</div>
          </div>
        )}
        {!overview ? (
          <div className="ba-card">Carregando analytics…</div>
        ) : (
          <>
            <section className="ba-hero">
              <div className="ba-hero-label">VISITANTES HOJE</div>
              <div className="ba-hero-number">{overview.visitors_today.toLocaleString("pt-BR")}</div>
              <div className="ba-hero-meta">
                Últimos 7 dias <b>{overview.visitors_7d}</b> · Últimos 30 dias <b>{overview.visitors_30d}</b> · Atualizado {updated?.toLocaleTimeString("pt-BR")}
              </div>
            </section>
            <div className="ba-kpis">
              {[
                [icon("users"), "Visitantes únicos", overview.unique_visitors, "Pessoas diferentes"],
                [icon("quiz"), "Quizzes iniciados", funnel?.unique_quiz_starters || 0, "Visitantes que começaram"],
                [icon("check"), "Quizzes concluídos", overview.completed_quizzes, "Finalizações"],
                [icon("cart"), "Checkout", funnel?.unique_checkout_visitors || 0, "Visitantes que chegaram"],
              ].map(([i, l, v, s]) => (
                <div className="ba-card" key={String(l)}>
                  <div className="ba-card-head"><span>{l}</span><span className="ba-icon">{i}</span></div>
                  <div className="ba-value">{Number(v).toLocaleString("pt-BR")}</div>
                  <div className="ba-sub">{s}</div>
                </div>
              ))}
            </div>
            <div className="ba-grid">
              <section className="ba-section">
                <h2>Tráfego diário</h2>
                <p>Visitantes registrados por dia.</p>
                {daily.length ? (
                  <>
                    <div className="ba-chart">
                      {daily.map((x) => (
                        <div className="ba-bar-wrap" key={x.day} title={`${x.visitors} visitantes em ${day(x.day)}`}>
                          <div className="ba-bar" style={{ height: `${Math.max(x.visitors / maxDaily * 100, 2)}%` }} />
                        </div>
                      ))}
                    </div>
                    <div className="ba-labels">
                      {daily.map((x) => <span key={x.day} className="ba-label">{day(x.day)}</span>)}
                    </div>
                  </>
                ) : (
                  <div className="ba-empty">Ainda não há visitantes registrados.</div>
                )}
              </section>
              <section className="ba-section">
                <h2>Funil</h2>
                <p>Passagem entre as principais etapas.</p>
                {funnel ? (
                  <div className="ba-funnel">
                    {[
                      ["Visitantes", overview.unique_visitors, 100],
                      ["Iniciaram", funnel.unique_quiz_starters, pct(funnel.unique_quiz_starters, overview.unique_visitors)],
                      ["Concluíram", funnel.unique_quiz_completions, pct(funnel.unique_quiz_completions, funnel.unique_quiz_starters)],
                      ["Resultado", funnel.unique_result_viewers, pct(funnel.unique_result_viewers, funnel.unique_quiz_completions)],
                      ["Checkout", funnel.unique_checkout_visitors, pct(funnel.unique_checkout_visitors, funnel.unique_result_viewers)],
                    ].map(([n, v, r]) => (
                      <div className="ba-stage" key={String(n)}>
                        <span className="ba-stage-name">{n}</span>
                        <strong className="ba-stage-value">{Number(v)}</strong>
                        <div className="ba-track"><div className="ba-fill" style={{ width: `${Number(r)}%` }} /></div>
                        <span className="ba-rate">{fmtPct(Number(r))}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ba-empty">Sem dados de funil.</div>
                )}
              </section>
            </div>
            <div className="ba-grid">
              <section className="ba-section">
                <h2>Origem do tráfego</h2>
                <p>De onde os visitantes estão chegando.</p>
                {sources.length ? (
                  <div className="ba-list">
                    {sources.slice(0, 6).map((x) => (
                      <div className="ba-row" key={x.source + x.medium}>
                        <div><strong>{x.source}</strong><small>{x.medium}</small></div>
                        <div className="ba-num"><b>{x.unique_visitors}</b><span>únicos</span></div>
                        <div className="ba-num"><b>{x.sessions}</b><span>sessões</span></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ba-empty">Nenhuma origem registrada.</div>
                )}
              </section>
              <section className="ba-section">
                <h2>Dispositivos</h2>
                <p>Como o público acessa o quiz.</p>
                {devices.length ? (
                  <div className="ba-list">
                    {devices.map((x) => (
                      <div className="ba-row" key={x.device}>
                        <div>
                          <strong>{x.device === "mobile" ? "Celular" : x.device === "tablet" ? "Tablet" : x.device === "desktop" ? "Computador" : "Não identificado"}</strong>
                          <small>{primaryDevice?.device === x.device ? "Principal" : "Dispositivo"}</small>
                        </div>
                        <div className="ba-num"><b>{x.unique_visitors}</b><span>únicos</span></div>
                        <div className="ba-num"><b>{x.sessions}</b><span>sessões</span></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ba-empty">Nenhum dispositivo registrado.</div>
                )}
              </section>
            </div>
            <section className="ba-section ba-wide">
              <h2>Desempenho por campanha</h2>
              <p>Veja quais campanhas levam visitantes mais longe no funil.</p>
              {campaignFunnel.length ? (
                <div style={{ overflowX: "auto" }}>
                  <table className="ba-table">
                    <thead>
                      <tr>
                        <th>Campanha</th>
                        <th className="num">Visitantes</th>
                        <th className="num">Iniciaram</th>
                        <th className="num">Concluíram</th>
                        <th className="num">Resultado</th>
                        <th className="num">Checkout</th>
                        <th className="num">Conversão</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaignFunnel.map((x, i) => (
                        <tr key={x.source + x.medium + x.campaign + i}>
                          <td><b>{x.campaign}</b><div style={{ color: "#667e73", marginTop: 4 }}>{x.source} · {x.medium}</div></td>
                          <td className="num">{x.unique_visitors}</td>
                          <td className="num">{x.unique_quiz_starters}</td>
                          <td className="num">{x.unique_quiz_completions}</td>
                          <td className="num">{x.unique_result_viewers}</td>
                          <td className="num"><span className="ba-badge">{x.unique_checkout_visitors}</span></td>
                          <td className="num"><span className="ba-gold">{fmtPct(pct(x.unique_checkout_visitors, x.unique_visitors))}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="ba-empty">Nenhuma campanha registrada ainda.</div>
              )}
            </section>
            <section className="ba-section ba-wide">
              <h2>Campanhas / UTM</h2>
              <p>Detalhamento dos links rastreados.</p>
              {campaigns.length ? (
                <div style={{ overflowX: "auto" }}>
                  <table className="ba-table">
                    <thead>
                      <tr>
                        <th>Origem</th>
                        <th>Mídia</th>
                        <th>Campanha</th>
                        <th>Conteúdo</th>
                        <th>Termo</th>
                        <th className="num">Únicos</th>
                        <th className="num">Sessões</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((x, i) => (
                        <tr key={x.source + x.medium + x.campaign + i}>
                          <td>{x.source}</td>
                          <td>{x.medium}</td>
                          <td><span className="ba-badge">{x.campaign}</span></td>
                          <td>{x.content}</td>
                          <td>{x.term}</td>
                          <td className="num">{x.unique_visitors}</td>
                          <td className="num">{x.sessions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="ba-empty">Nenhuma UTM registrada ainda.</div>
              )}
            </section>
            <div className="ba-footer">Blinda Bolsa Analytics · <span className="ba-gold">produção</span> · {primarySource ? primarySource.source : "aguardando tráfego"}</div>
          </>
        )}
      </div>
    </main>
  );
}

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });