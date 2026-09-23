import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

type Overview={total_visitors:number;unique_visitors:number;visitors_today:number;visitors_7d:number;visitors_30d:number;completed_quizzes:number;unfinished_quizzes:number};
type Daily={day:string;visitors:number};
type TrafficSource={source:string;medium:string;unique_visitors:number;sessions:number};
type Device={device:string;unique_visitors:number;sessions:number};
type Campaign={source:string;medium:string;campaign:string;content:string;term:string;unique_visitors:number;sessions:number};
type CampaignFunnel=Campaign&{unique_quiz_starters:number;quiz_starts:number;unique_quiz_completions:number;quiz_completions:number;unique_result_viewers:number;result_views:number;unique_checkout_visitors:number;checkout_clicks:number;unique_cta_visitors:number;cta_clicks:number};
type Funnel={visitors:number;quiz_starts:number;quiz_completions:number;result_views:number;checkout_clicks:number;cta_clicks:number;unique_quiz_starters:number;unique_quiz_completions:number;unique_result_viewers:number;unique_checkout_visitors:number;unique_cta_visitors:number};
type LoadResult<T>={label:string;data?:T;error?:string};
type SessionRow={session_id:string;visitor_id:string|null;utm_source:string|null;utm_medium:string|null;utm_campaign:string|null;utm_content:string|null;utm_term:string|null};
type EventRow={session_id:string;event_name:string};

async function getData<T>(label:string,path:string):Promise<LoadResult<T>>{
  if(!SUPABASE_URL||!SUPABASE_KEY)return{label,error:"Configuração do Supabase não encontrada."};
  try{
    const response=await fetch(`${SUPABASE_URL}/rest/v1/${path}`,{cache:"no-store",headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,"Cache-Control":"no-cache"}});
    const body=await response.text();
    if(!response.ok){
      let detail=body;try{const parsed=JSON.parse(body);detail=parsed.message||parsed.error||parsed.hint||body}catch{}
      return{label,error:`${response.status}: ${detail}`};
    }
    return{label,data:JSON.parse(body) as T};
  }catch(err){return{label,error:err instanceof Error?err.message:"Erro de rede."}};
}

function buildCampaignFunnel(sessions:SessionRow[],events:EventRow[]):CampaignFunnel[]{
  const eventSets=new Map<string,Set<string>>();
  events.forEach(e=>{const s=eventSets.get(e.session_id)||new Set<string>();s.add(e.event_name);eventSets.set(e.session_id,s)});
  const groups=new Map<string,CampaignFunnel>();
  const visitors=new Map<string,{v:Set<string>;s:Set<string>;c:Set<string>;r:Set<string>;k:Set<string>;a:Set<string>}>();
  sessions.forEach(x=>{
    const ev=eventSets.get(x.session_id)||new Set<string>();
    const source=x.utm_source?.trim()||"Direto";const medium=x.utm_medium?.trim()||"—";const campaign=x.utm_campaign?.trim()||"—";const content=x.utm_content?.trim()||"—";const term=x.utm_term?.trim()||"—";
    const key=[source,medium,campaign,content,term].join("\u001f");
    const g=groups.get(key)||{source,medium,campaign,content,term,unique_visitors:0,sessions:0,unique_quiz_starters:0,quiz_starts:0,unique_quiz_completions:0,quiz_completions:0,unique_result_viewers:0,result_views:0,unique_checkout_visitors:0,checkout_clicks:0,unique_cta_visitors:0,cta_clicks:0};
    const u=visitors.get(key)||{v:new Set<string>(),s:new Set<string>(),c:new Set<string>(),r:new Set<string>(),k:new Set<string>(),a:new Set<string>()};
    g.sessions++;if(x.visitor_id)u.v.add(x.visitor_id);
    if(ev.has("quiz_started")){g.quiz_starts++;if(x.visitor_id)u.s.add(x.visitor_id)}
    if(ev.has("quiz_completed")){g.quiz_completions++;if(x.visitor_id)u.c.add(x.visitor_id)}
    if(ev.has("quiz_completed")&&ev.has("result_viewed")){g.result_views++;if(x.visitor_id)u.r.add(x.visitor_id)}
    if(ev.has("quiz_completed")&&ev.has("result_viewed")&&ev.has("checkout_click")){g.checkout_clicks++;if(x.visitor_id)u.k.add(x.visitor_id)}
    if(ev.has("cta_click")){g.cta_clicks++;if(x.visitor_id)u.a.add(x.visitor_id)}
    groups.set(key,g);visitors.set(key,u);
  });
  return [...groups].map(([key,g])=>{const u=visitors.get(key)!;return{...g,unique_visitors:u.v.size,unique_quiz_starters:u.s.size,unique_quiz_completions:u.c.size,unique_result_viewers:u.r.size,unique_checkout_visitors:u.k.size,unique_cta_visitors:u.a.size}}).sort((a,b)=>b.unique_visitors-a.unique_visitors||b.sessions-a.sessions);
}

async function getCampaignFunnel():Promise<LoadResult<CampaignFunnel[]>>{
  const primary=await getData<CampaignFunnel[]>("Campanhas","analytics_campaign_funnel?select=*&order=unique_visitors.desc");
  if(!primary.error)return primary;
  const [s,e]=await Promise.all([
    getData<SessionRow[]>("Sessões","quiz_sessions?select=session_id,visitor_id,utm_source,utm_medium,utm_campaign,utm_content,utm_term&order=started_at.asc"),
    getData<EventRow[]>("Eventos","quiz_events?select=session_id,event_name&order=created_at.asc")
  ]);
  if(!s.error&&!e.error)return{label:"Campanhas",data:buildCampaignFunnel(s.data||[],e.data||[])};
  return{label:"Campanhas",error:[primary.error,s.error,e.error].filter(Boolean).join(" | ")};
}

function pct(v:number,b:number){return b?Math.min(v/b*100,100):0}
function fmtPct(v:number){return v.toLocaleString("pt-BR",{maximumFractionDigits:1})+"%"}
function day(v:string){return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"short"}).format(new Date(v+"T12:00:00")).replace(".","")}
function icon(kind:string){return kind==="users"?"◉":kind==="quiz"?"✦":kind==="check"?"✓":kind==="cart"?"↗":"•"}

function AnalyticsPage(){
  const[overview,setOverview]=useState<Overview|null>(null);const[daily,setDaily]=useState<Daily[]>([]);const[funnel,setFunnel]=useState<Funnel|null>(null);const[sources,setSources]=useState<TrafficSource[]>([]);const[devices,setDevices]=useState<Device[]>([]);const[campaigns,setCampaigns]=useState<Campaign[]>([]);const[campaignFunnel,setCampaignFunnel]=useState<CampaignFunnel[]>([]);const[errors,setErrors]=useState<string[]>([]);const[loading,setLoading]=useState(false);const[updated,setUpdated]=useState<Date|null>(null);
  const load=async()=>{
    setLoading(true);setErrors([]);
    const[summary,days,fun,src,dev,camp,cf]=await Promise.all([
      getData<Overview[]>("Resumo","analytics_visitors_overview?select=*"),getData<Daily[]>("Diário","analytics_visitors_daily?select=day,visitors&order=day.asc"),getData<Funnel[]>("Funil","analytics_funnel_overview?select=*"),getData<TrafficSource[]>("Origens","analytics_traffic_sources?select=source,medium,unique_visitors,sessions"),getData<Device[]>("Dispositivos","analytics_devices?select=device,unique_visitors,sessions"),getData<Campaign[]>("UTM","analytics_campaigns?select=source,medium,campaign,content,term,unique_visitors,sessions"),getCampaignFunnel()
    ]);
    const fails=[summary,days,fun,src,dev,camp,cf].filter(x=>x.error).map(x=>`${x.label}: ${x.error}`);setErrors(fails);
    if(summary.data)setOverview(summary.data[0]||null);if(days.data)setDaily(days.data);if(fun.data)setFunnel(fun.data[0]||null);if(src.data)setSources(src.data);if(dev.data)setDevices(dev.data);if(camp.data)setCampaigns(camp.data);if(cf.data)setCampaignFunnel(cf.data);setUpdated(new Date());setLoading(false);
  };
  useEffect(()=>{void load()},[]);
  const maxDaily=Math.max(...daily.map(x=>x.visitors),1);
  const primarySource=sources[0];const primaryDevice=devices.slice().sort((a,b)=>b.unique_visitors-a.unique_visitors)[0];
  const css=`
  *{box-sizing:border-box}.ba{min-height:100vh;background:#07110d;color:#edf5f0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:28px 18px 60px}.ba-wrap{max-width:1220px;margin:auto}.ba-top{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:28px}.ba-brand{display:flex;align-items:center;gap:12px}.ba-logo{width:44px;height:44px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(145deg,#2fc378,#0f5535);font-weight:900;box-shadow:0 10px 30px #0c5b3844}.ba-kicker{font-size:11px;letter-spacing:.16em;color:#769083;font-weight:800}.ba-title{font-size:30px;letter-spacing:-.04em;margin:3px 0 0;font-weight:850}.ba-actions{display:flex;align-items:center;gap:10px}.ba-live{padding:9px 12px;border:1px solid #254235;border-radius:999px;color:#77d5a2;background:#0d2118;font-size:12px;font-weight:800}.ba-dot{display:inline-block;width:7px;height:7px;background:#3ed181;border-radius:50%;margin-right:7px;box-shadow:0 0 0 4px #3ed18116}.ba-refresh{border:1px solid #294638!important;background:#11251c!important;color:#eaf4ef!important;border-radius:11px!important;padding:10px 15px!important;box-shadow:none!important}.ba-refresh:hover{background:#183226!important}.ba-hero{padding:25px;border:1px solid #20392d;border-radius:22px;background:linear-gradient(135deg,#102219,#0b1812);box-shadow:0 24px 65px #00000030;margin-bottom:18px}.ba-hero-label{color:#88a095;font-size:12px;font-weight:700}.ba-hero-number{font-size:52px;line-height:1;font-weight:900;letter-spacing:-.06em;margin:8px 0}.ba-hero-meta{color:#789086;font-size:13px}.ba-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px}.ba-card{background:linear-gradient(145deg,#0e1d16,#0a1711);border:1px solid #20392d;border-radius:18px;padding:19px;box-shadow:0 14px 42px #0000001c}.ba-card-head{display:flex;justify-content:space-between;color:#789086;font-size:12px;font-weight:750}.ba-icon{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:#163628;color:#55cf8c;font-weight:900}.ba-value{font-size:28px;font-weight:850;margin-top:13px;letter-spacing:-.04em}.ba-sub{color:#71877d;font-size:11px;margin-top:4px}.ba-grid{display:grid;grid-template-columns:1.5fr 1fr;gap:14px;margin-bottom:14px}.ba-section{background:linear-gradient(145deg,#0d1c15,#09150f);border:1px solid #20392d;border-radius:20px;padding:21px;box-shadow:0 15px 45px #00000020}.ba-section h2{font-size:17px;margin:0;letter-spacing:-.02em}.ba-section p{font-size:12px;color:#758c81;margin:6px 0 18px}.ba-chart{height:205px;display:flex;align-items:end;gap:8px;padding:12px 4px 0;border-bottom:1px solid #20392d}.ba-bar-wrap{flex:1;height:100%;display:flex;align-items:end;min-width:10px}.ba-bar{width:100%;min-height:3px;border-radius:7px 7px 2px 2px;background:linear-gradient(180deg,#4bd48d,#167449);transition:height .3s}.ba-bar:hover{background:linear-gradient(180deg,#70e5a8,#20945c)}.ba-labels{display:flex;gap:8px;margin-top:8px}.ba-labels span{flex:1;text-align:center;font-size:9px;color:#667d72;overflow:hidden}.ba-funnel{display:grid;gap:10px}.ba-stage{display:grid;grid-template-columns:130px 52px 1fr 50px;align-items:center;gap:10px}.ba-stage-name{font-size:12px;color:#b8c9c1}.ba-stage-value{text-align:right;font-weight:850}.ba-track{height:9px;border-radius:99px;background:#1a2e25;overflow:hidden}.ba-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#28b86f,#5ee09c)}.ba-rate{text-align:right;font-size:11px;color:#79a18d}.ba-list{display:grid;gap:9px}.ba-row{display:grid;grid-template-columns:1fr 65px 65px;gap:10px;align-items:center;padding:11px 0;border-bottom:1px solid #1b3027}.ba-row:last-child{border-bottom:0}.ba-row strong{font-size:12px}.ba-row small{display:block;color:#637a70;margin-top:3px}.ba-num{text-align:right;font-size:12px}.ba-num span{display:block;color:#61786d;font-size:10px;margin-top:2px}.ba-wide{margin-bottom:14px}.ba-table{width:100%;border-collapse:collapse;font-size:12px;min-width:760px}.ba-table th{color:#70877d;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.08em;padding:10px;border-bottom:1px solid #20392d}.ba-table td{padding:13px 10px;border-bottom:1px solid #182c23}.ba-table tr:hover td{background:#10231a}.ba-table .num{text-align:right}.ba-badge{display:inline-flex;padding:5px 8px;border-radius:7px;background:#143324;color:#76d6a0;font-size:10px;font-weight:800}.ba-empty{padding:28px 0;color:#61786d;font-size:13px}.ba-error{padding:14px;border:1px solid #61323a;background:#261419;color:#ffb4be;border-radius:14px;margin-bottom:14px;font-size:12px}.ba-footer{margin-top:15px;color:#50685d;font-size:11px;text-align:center}.ba-gold{color:#d0b56a}@media(max-width:900px){.ba-kpis{grid-template-columns:repeat(2,1fr)}.ba-grid{grid-template-columns:1fr}}@media(max-width:600px){.ba{padding:18px 11px 40px}.ba-top{align-items:flex-start}.ba-title{font-size:25px}.ba-live{display:none}.ba-hero-number{font-size:42px}.ba-kpis{gap:8px}.ba-card{padding:15px}.ba-stage{grid-template-columns:105px 40px 1fr 42px;font-size:11px}.ba-section{padding:17px}.ba-chart{height:170px}}
  `;
  return <main className="ba"><style>{css}</style><div className="ba-wrap">
    <header className="ba-top"><div className="ba-brand"><div className="ba-logo">B</div><div><div className="ba-kicker">BLINDA BOLSA · ANALYTICS</div><div className="ba-title">Visão geral</div></div></div><div className="ba-actions"><span className="ba-live"><i className="ba-dot"/>Dados em tempo real</span><button className="ba-refresh" onClick={()=>void load()} disabled={loading}>{loading?"Atualizando…":"↻ Atualizar"}</button></div></header>
    {errors.length>0&&<div className="ba-error"><strong>Alguns dados não puderam ser carregados.</strong><div style={{marginTop:6}}>{errors.join(" · ")}</div></div>}
    {!overview?<div className="ba-card">Carregando analytics…</div>:<>
      <section className="ba-hero"><div className="ba-hero-label">VISITANTES HOJE</div><div className="ba-hero-number">{overview.visitors_today.toLocaleString("pt-BR")}</div><div className="ba-hero-meta">Últimos 7 dias <b>{overview.visitors_7d}</b> · Últimos 30 dias <b>{overview.visitors_30d}</b> · Atualizado {updated?.toLocaleTimeString("pt-BR")}</div></section>
      <div className="ba-kpis">
        {[[icon("users"),"Visitantes únicos",overview.unique_visitors,"Pessoas diferentes"],[icon("quiz"),"Quizzes iniciados",funnel?.unique_quiz_starters||0,"Visitantes que começaram"],[icon("check"),"Quizzes concluídos",overview.completed_quizzes,"Finalizações"],[icon("cart"),"Checkout",funnel?.unique_checkout_visitors||0,"Visitantes que chegaram"]].map(([i,l,v,s])=><div className="ba-card" key={String(l)}><div className="ba-card-head"><span>{l}</span><span className="ba-icon">{i}</span></div><div className="ba-value">{Number(v).toLocaleString("pt-BR")}</div><div className="ba-sub">{s}</div></div>)}
      </div>
      <div className="ba-grid">
        <section className="ba-section"><h2>Tráfego diário</h2><p>Visitantes registrados por dia.</p>{daily.length?<><div className="ba-chart">{daily.map(x=><div className="ba-bar-wrap" key={x.day} title={`${x.visitors} visitantes em ${day(x.day)}`}><div className="ba-bar" style={{height:`${Math.max(x.visitors/maxDaily*100,2)}%`}}/></div>)}</div><div className="ba-labels">{daily.map(x=><span key={x.day}>{day(x.day)}</span>)}</div></>:<div className="ba-empty">Ainda não há visitantes registrados.</div>}</section>
        <section className="ba-section"><h2>Funil</h2><p>Passagem entre as principais etapas.</p>{funnel?<div className="ba-funnel">{[
          ["Visitantes",overview.unique_visitors,100],["Iniciaram",funnel.unique_quiz_starters,pct(funnel.unique_quiz_starters,overview.unique_visitors)],["Concluíram",funnel.unique_quiz_completions,pct(funnel.unique_quiz_completions,funnel.unique_quiz_starters)],["Resultado",funnel.unique_result_viewers,pct(funnel.unique_result_viewers,funnel.unique_quiz_completions)],["Checkout",funnel.unique_checkout_visitors,pct(funnel.unique_checkout_visitors,funnel.unique_result_viewers)]
        ].map(([n,v,r])=><div className="ba-stage" key={String(n)}><span className="ba-stage-name">{n}</span><strong className="ba-stage-value">{Number(v)}</strong><div className="ba-track"><div className="ba-fill" style={{width:`${Number(r)}%`}}/></div><span className="ba-rate">{fmtPct(Number(r))}</span></div>)}</div>:<div className="ba-empty">Sem dados de funil.</div>}</section>
      </div>
      <div className="ba-grid">
        <section className="ba-section"><h2>Origem do tráfego</h2><p>De onde os visitantes estão chegando.</p>{sources.length?<div className="ba-list">{sources.slice(0,6).map(x=><div className="ba-row" key={x.source+x.medium}><div><strong>{x.source}</strong><small>{x.medium}</small></div><div className="ba-num"><b>{x.unique_visitors}</b><span>únicos</span></div><div className="ba-num"><b>{x.sessions}</b><span>sessões</span></div></div>)}</div>:<div className="ba-empty">Nenhuma origem registrada.</div>}</section>
        <section className="ba-section"><h2>Dispositivos</h2><p>Como o público acessa o quiz.</p>{devices.length?<div className="ba-list">{devices.map(x=><div className="ba-row" key={x.device}><div><strong>{x.device==="mobile"?"Celular":x.device==="tablet"?"Tablet":x.device==="desktop"?"Computador":"Não identificado"}</strong><small>{primaryDevice?.device===x.device?"Principal":"Dispositivo"}</small></div><div className="ba-num"><b>{x.unique_visitors}</b><span>únicos</span></div><div className="ba-num"><b>{x.sessions}</b><span>sessões</span></div></div>)}</div>:<div className="ba-empty">Nenhum dispositivo registrado.</div>}</section>
      </div>
      <section className="ba-section ba-wide"><h2>Desempenho por campanha</h2><p>Veja quais campanhas levam visitantes mais longe no funil.</p>{campaignFunnel.length?<div style={{overflowX:"auto"}}><table className="ba-table"><thead><tr><th>Campanha</th><th className="num">Visitantes</th><th className="num">Iniciaram</th><th className="num">Concluíram</th><th className="num">Resultado</th><th className="num">Checkout</th><th className="num">Conversão</th></tr></thead><tbody>{campaignFunnel.map((x,i)=><tr key={x.source+x.medium+x.campaign+i}><td><b>{x.campaign}</b><div style={{color:"#667e73",marginTop:4}}>{x.source} · {x.medium}</div></td><td className="num">{x.unique_visitors}</td><td className="num">{x.unique_quiz_starters}</td><td className="num">{x.unique_quiz_completions}</td><td className="num">{x.unique_result_viewers}</td><td className="num"><span className="ba-badge">{x.unique_checkout_visitors}</span></td><td className="num"><span className="ba-gold">{fmtPct(pct(x.unique_checkout_visitors,x.unique_visitors))}</span></td></tr>)}</tbody></table></div>:<div className="ba-empty">Nenhuma campanha registrada ainda.</div>}</section>
      <section className="ba-section ba-wide"><h2>Campanhas / UTM</h2><p>Detalhamento dos links rastreados.</p>{campaigns.length?<div style={{overflowX:"auto"}}><table className="ba-table"><thead><tr><th>Origem</th><th>Mídia</th><th>Campanha</th><th>Conteúdo</th><th>Termo</th><th className="num">Únicos</th><th className="num">Sessões</th></tr></thead><tbody>{campaigns.map((x,i)=><tr key={x.source+x.medium+x.campaign+i}><td>{x.source}</td><td>{x.medium}</td><td><span className="ba-badge">{x.campaign}</span></td><td>{x.content}</td><td>{x.term}</td><td className="num">{x.unique_visitors}</td><td className="num">{x.sessions}</td></tr>)}</tbody></table></div>:<div className="ba-empty">Nenhuma UTM registrada ainda.</div>}</section>
      <div className="ba-footer">Blinda Bolsa Analytics · <span className="ba-gold">produção</span> · {primarySource?primarySource.source:"aguardando tráfego"}</div>
    </>}
  </div></main>
}
export const Route=createFileRoute("/analytics")({component:AnalyticsPage});
