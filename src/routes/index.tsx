import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../lib/api";

const CHECKOUT_URL = "https://pay.cakto.com.br/38xq22v_1131074";
const COURSE_VIDEO_URL = "";
const TESTIMONIAL_VIDEO_ONE_URL = "";
const TESTIMONIAL_VIDEO_TWO_URL = "";

// A/B: A (padrão) — headline: VOCÊ PODE ESTAR COMETENDO UM DOS 10 ERROS QUE COLOCAM SEU BOLSA FAMÍLIA EM RISCO — AGORA MESMO, SEM SABER | CTA: QUERO BLINDAR MEU BOLSA FAMÍLIA
// B — headline: OS 10 ERROS DO DIA A DIA QUE PODEM COLOCAR SEU BOLSA FAMÍLIA EM RISCO — E VOCÊ PODE ESTAR COMETENDO ALGUM AGORA | CTA: QUERO CONHECER OS 10 ERROS AGORA
// C — headline: SERÁ QUE VOCÊ ESTÁ COMETENDO ALGUM DESSES 10 ERROS COM O SEU BOLSA FAMÍLIA? | CTA: QUERO PROTEGER MEU BOLSA FAMÍLIA POR R$ 12,99

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blinda Bolsa Família — Os 10 erros que podem colocar seu benefício em risco" },
      { name: "description", content: "Descubra os 10 erros do dia a dia que podem colocar seu Bolsa Família em risco. Acesso imediato por R$ 12,99." },
      { property: "og:title", content: "Blinda Bolsa Família — Os 10 erros que podem colocar seu benefício em risco" },
    ],
  }),
  component: TslSalesPage,
});

const CSS = [
  "*{box-sizing:border-box}",
  ".bb-page{--navy:#0A1F44;--section:#12295A;--yellow:#FFD400;--red:#E53935;--green:#25D366;--border:#1E3A7B;background:var(--navy);color:#fff;font-family:Arial,Helvetica,sans-serif;overflow:hidden}",
  ".bb-page button,.bb-page a{font:inherit}",
  ".bb-progress{position:fixed;z-index:1200;top:0;left:0;width:100%;height:3px;background:#ffffff20}.bb-progress span{display:block;height:100%;width:0;background:var(--yellow)}",
  ".bb-wrap{width:min(100% - 32px,720px);margin:0 auto}",
  ".bb-section{padding:52px 0;opacity:0;transform:translateY(12px);transition:opacity .3s ease,transform .3s ease}.bb-section.bb-visible{opacity:1;transform:translateY(0)}",
  ".bb-hero{padding:48px 0 50px;text-align:center;background:radial-gradient(ellipse at 50% 0%,#244782 0%,transparent 58%),var(--navy)}",
  ".bb-topband{display:block;background:var(--yellow);color:#111;padding:10px 12px;border-radius:7px;font-size:12px;font-weight:900;letter-spacing:.06em}",
  ".bb-hero h1,.bb-section h2{font-size:clamp(32px,7vw,48px);line-height:1.08;font-weight:950;letter-spacing:-.04em;text-transform:uppercase;margin:22px 0 17px}.bb-hero h1 strong,.bb-yellow{color:var(--yellow)}",
  ".bb-subtitle{font-size:clamp(18px,3.6vw,26px);line-height:1.35;font-weight:750;margin:0 auto 20px;max-width:660px}",
  ".bb-section p{font-size:17px;line-height:1.6;margin:0 0 14px}.bb-section p strong{font-weight:900}",
  ".bb-muted{color:#d5deee;font-size:13px!important;text-align:center;margin:8px 0 0!important}.bb-trust{font-size:13px!important;color:#e8eef9;text-align:center;margin:14px auto 0!important}",
  ".bb-button{display:flex;align-items:center;justify-content:center;width:fit-content;max-width:100%;min-height:58px;padding:16px 22px;margin:23px auto 9px;border:0;border-radius:12px;background:var(--green);color:#fff;text-decoration:none;text-align:center;font-size:16px;font-weight:900;line-height:1.2;box-shadow:0 5px 0 #168b42;transition:background .15s ease,transform .15s ease;cursor:pointer}.bb-button:hover{background:#20bd5b;filter:brightness(.9);transform:translateY(-1px)}.bb-button:focus-visible{outline:3px solid var(--yellow);outline-offset:4px}.bb-full{width:100%}",
  ".bb-band{background:var(--section)}.bb-section h2{color:var(--yellow);margin:0 0 20px}.bb-section .bb-white-title{color:#fff}",
  ".bb-story{font-size:18px!important;line-height:1.7!important}.bb-warning{border:2px solid var(--red);border-radius:12px;padding:17px 16px;margin:19px 0;color:#ff7772;font-size:21px;font-weight:950;text-align:center;background:#e5393510}",
  ".bb-callout{border:2px solid var(--yellow);border-radius:12px;padding:20px;margin:22px 0;background:#ffd4000b}.bb-callout p:last-child{margin-bottom:0}",
  ".bb-clues{list-style:none;padding:0;margin:17px 0 22px}.bb-clues li{position:relative;padding:9px 0 9px 34px;font-size:16px;line-height:1.55}.bb-clues li:before{content:'?';position:absolute;left:0;top:8px;color:var(--yellow);font-size:22px;font-weight:950}",
  ".bb-question{font-size:clamp(21px,4.5vw,28px)!important;line-height:1.2!important;font-weight:950;color:var(--yellow);text-align:center;margin:23px 0!important}",
  ".bb-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:23px 0}.bb-card{background:var(--section);border:1px solid var(--border);border-radius:12px;padding:17px;color:#fff}.bb-card p{font-size:16px;margin:0;line-height:1.5}.bb-card b{display:block;margin-bottom:7px;color:#fff;font-size:17px}.bb-check{color:var(--green);font-size:20px;margin-right:7px}",
  ".bb-simple{text-align:center;color:var(--yellow);font-size:23px!important;font-weight:950;margin:24px 0!important}",
  ".bb-video-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:22px 0}.bb-video-card{min-width:0}.bb-video-poster{width:100%;aspect-ratio:16/9;border:1px solid var(--border);border-radius:12px;background:var(--section);display:grid;place-items:center;color:var(--yellow);overflow:hidden}.bb-play{display:grid;place-items:center;width:64px;height:64px;border:2px solid var(--yellow);border-radius:50%;font-size:27px;padding-left:4px;background:#ffd40012}.bb-video-poster button{border:0;background:transparent;color:inherit;cursor:pointer}.bb-video-poster button:disabled{cursor:default;opacity:.9}.bb-video-frame{position:relative;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#000}.bb-video-frame iframe,.bb-video-frame video{position:absolute;inset:0;width:100%;height:100%;border:0}.bb-video-caption{font-size:14px!important;font-weight:800;text-align:center;margin:9px 0 0!important}",
  ".bb-offer{border:3px solid var(--yellow);border-radius:14px;padding:25px 20px;background:var(--navy);text-align:center}.bb-offer h2{margin:0 0 17px}.bb-offer .bb-checklist{list-style:none;text-align:left;padding:0;margin:18px 0}.bb-offer .bb-checklist li{padding:9px 0;font-size:17px;line-height:1.5}.bb-divider{height:1px;background:#ffffff35;margin:21px 0}.bb-price{font-size:clamp(32px,7vw,42px);font-weight:950;margin:13px 0!important}.bb-price strong{color:var(--yellow)}",
  ".bb-faq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.bb-faq .bb-card{padding:17px}.bb-faq .bb-card b{color:var(--yellow)}",
  ".bb-choice{border:1px solid var(--red);border-radius:12px;padding:17px;margin:12px 0;font-size:16px;line-height:1.6}.bb-choice-green{border-color:var(--green)}.bb-bottomline{padding-bottom:48px;text-align:center}",
  ".bb-sticky{display:none}",
  "@media(max-width:600px){.bb-wrap{width:calc(100% - 34px)}.bb-section{padding:42px 0}.bb-hero{padding:30px 0 38px}.bb-topband{font-size:10px}.bb-hero h1,.bb-section h2{font-size:32px;line-height:1.08}.bb-subtitle{font-size:18px}.bb-section p{font-size:17px;line-height:1.6}.bb-story{font-size:17px!important}.bb-grid,.bb-faq,.bb-video-grid{grid-template-columns:1fr}.bb-card{padding:16px}.bb-button{width:100%;font-size:14px;min-height:56px;padding:15px 12px}.bb-offer{padding:23px 16px}.bb-sticky{display:none;position:fixed;z-index:1100;left:0;right:0;bottom:0;padding:9px 12px calc(9px + env(safe-area-inset-bottom));background:var(--navy);border-top:2px solid var(--yellow)}.bb-sticky.bb-sticky-show{display:block}.bb-sticky-inner{display:flex;align-items:center;gap:9px;max-width:720px;margin:0 auto}.bb-sticky .bb-button{flex:1;margin:0;min-height:46px;font-size:12px;padding:11px 8px;box-shadow:0 3px 0 #168b42}.bb-sticky-price{flex:none;color:#fff;font-size:12px;font-weight:900;white-space:nowrap}.bb-page{padding-bottom:68px}}",
  "@media(prefers-reduced-motion:reduce){.bb-section{transition:none;transform:none}.bb-button{transition:none}}"
].join("\n");

function fireMeta(event: string) {
  const w = window as typeof window & { fbq?: (...args: unknown[]) => void; gtag?: (...args: unknown[]) => void };
  if (w.fbq) w.fbq("track", event);
  if (w.gtag && event === "InitiateCheckout") w.gtag("event", "begin_checkout");
}

function BuyButton({ placement, full = false }: { placement: string; full?: boolean }) {
  return (
    <a className={"bb-button" + (full ? " bb-full" : "")} href={CHECKOUT_URL}
      onClick={() => {
        fireMeta("InitiateCheckout");
        void trackEvent("InitiateCheckout", { placement, provider: "cakto", price: 12.99, currency: "BRL" });
      }}>
      QUERO BLINDAR MEU BOLSA FAMÍLIA
    </a>
  );
}

function VideoCard({ src, title, caption }: { src: string; title: string; caption: string }) {
  const [playing, setPlaying] = useState(false);
  const isMp4 = src.toLowerCase().includes(".mp4");
  return (
    <div className="bb-video-card">
      {playing && src ? <div className="bb-video-frame">
        {isMp4 ? <video src={src} controls autoPlay playsInline /> : <iframe src={src} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />}
      </div> : <div className="bb-video-poster">
        <button type="button" aria-label={src ? "Reproduzir " + title : title + " ainda não disponível"} disabled={!src} onClick={() => setPlaying(true)}><span className="bb-play">▶</span></button>
      </div>}
      <p className="bb-video-caption">{caption}</p>
    </div>
  );
}

function TslSalesPage() {
  const [showSticky, setShowSticky] = useState(false);
  const [progress, setProgress] = useState(0);
  const productTracked = useRef(false);

  useEffect(() => {
    fireMeta("PageView");
    void trackEvent("PageView", { page: "/" });
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, Math.max(0, window.scrollY / total * 100)) : 0);
      setShowSticky(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".bb-section"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("bb-visible");
          if (entry.target.id === "produto" && !productTracked.current) {
            productTracked.current = true;
            fireMeta("ViewContent");
            void trackEvent("ViewContent", { content_name: "Blinda Bolsa Família" });
          }
        }
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  return (
    <main className="bb-page">
      <style>{CSS}</style>
      <div className="bb-progress" aria-hidden="true"><span style={{ width: progress + "%" }} /></div>

      <header className="bb-hero"><div className="bb-wrap">
        <div className="bb-topband">ATENÇÃO: BENEFICIÁRIOS DO BOLSA FAMÍLIA</div>
        <h1>VOCÊ PODE ESTAR COMETENDO UM DOS <strong>10 ERROS</strong> QUE COLOCAM SEU <strong>BOLSA FAMÍLIA EM RISCO</strong> — AGORA MESMO, SEM SABER</h1>
        <p className="bb-subtitle">A lista está trancada dentro do Blinda Bolsa Família. Enquanto você não conhece, os erros continuam acontecendo.</p>
        <BuyButton placement="hero" />
        <p className="bb-trust">🔒 Compra segura · Acesso imediato · Sem mensalidade</p>
        <p className="bb-muted">R$ 12,99 — pagamento único</p>
      </div></header>

      <section className="bb-section bb-band"><div className="bb-wrap">
        <p className="bb-story">O dinheiro não cai.<br />Você abre o Caixa Tem. Nada.<br />Vai à lotérica. Pega a fila. Recebe o extrato.</p>
        <div className="bb-warning">“Seu Bolsa Família foi cancelado.”</div>
        <p className="bb-story">E a pergunta que não sai da cabeça:<br /><em>“O que eu fiz de errado?”</em></p>
        <p className="bb-story"><strong className="bb-yellow">A resposta pode estar em algo que passou despercebido — e que você nem imaginava que precisava conferir.</strong></p>
      </div></section>

      <section className="bb-section"><div className="bb-wrap">
        <h2>OS 10 ERROS QUE PODEM COLOCAR SEU BENEFÍCIO EM RISCO</h2>
        <p>Existem <strong>10 erros do dia a dia</strong> que beneficiários podem cometer sem perceber.</p>
        <p>Hábitos. Atitudes no automático. Descuidos que parecem inofensivos.</p>
        <p><strong>Não é sobre cadastro. Não é sobre papelada.</strong><br />É sobre o que você faz todos os dias sem imaginar que aquilo tem peso.</p>
        <div className="bb-callout">
          <p>Não vou listar aqui. <strong>A lista completa está dentro do treinamento.</strong></p>
          <p>Mas eu te dou <strong>3 pistas</strong>:</p>
          <ul className="bb-clues">
            <li>Tem um hábito que quase ninguém percebe que repete.</li>
            <li>Tem uma atitude que muita gente toma achando que está certa.</li>
            <li>E tem um erro que a maioria comete <strong>sem imaginar que conta</strong>.</li>
          </ul>
        </div>
        <p className="bb-question">SERÁ QUE EU ESTOU COMETENDO ALGUM DESSES ERROS E NEM SEI?</p>
        <p>Se você não sabe a resposta, esse é o sinal.</p>
        <BuyButton placement="curiosidade" />
        <p className="bb-muted">R$ 12,99 — pagamento único</p>
      </div></section>

      <section className="bb-section bb-band" id="produto"><div className="bb-wrap">
        <h2>BLINDA BOLSA FAMÍLIA</h2>
        <p className="bb-subtitle">Treinamento em vídeo que revela os <strong>10 erros do dia a dia</strong> e mostra o que fazer com cada um.</p>
        <div className="bb-grid">
          <div className="bb-card"><b><span className="bb-check">✓</span>A revelação dos 10 erros</b></div>
          <div className="bb-card"><b><span className="bb-check">✓</span>Por que cada um é perigoso</b></div>
          <div className="bb-card"><b><span className="bb-check">✓</span>Como identificar se você comete algum</b></div>
          <div className="bb-card"><b><span className="bb-check">✓</span>O que evitar na rotina</b></div>
        </div>
        {COURSE_VIDEO_URL ? <VideoCard src={COURSE_VIDEO_URL} title="Demonstração do Blinda Bolsa Família" caption="Assista: por dentro do Blinda Bolsa Família" /> : <div className="bb-video-card"><div className="bb-video-poster"><span className="bb-play">▶</span></div><p className="bb-video-caption">Assista: por dentro do Blinda Bolsa Família</p></div>}
        <p className="bb-simple">Simples. Popular. Direto.</p>
        <BuyButton placement="produto" />
        <p className="bb-muted">R$ 12,99 — pagamento único</p>
      </div></section>

      <section className="bb-section"><div className="bb-wrap">
        <h2 className="bb-white-title">VEJA O QUE QUEM CONHECEU O BLINDA DIZ</h2>
        <div className="bb-video-grid">
          <VideoCard src={TESTIMONIAL_VIDEO_ONE_URL} title="Depoimento Guilherme" caption="Depoimento — Guilherme" />
          <VideoCard src={TESTIMONIAL_VIDEO_TWO_URL} title="Depoimento 2" caption="Depoimento 2" />
        </div>
        <p className="bb-question">SERÁ QUE EU TAMBÉM ESTOU COMETENDO ESSES ERROS?</p>
      </div></section>

      <section className="bb-section bb-band"><div className="bb-wrap">
        <div className="bb-offer">
          <h2>O QUE VOCÊ RECEBE</h2>
          <ul className="bb-checklist">
            <li><span className="bb-check">✓</span>Treinamento completo em vídeo</li>
            <li><span className="bb-check">✓</span>A revelação dos 10 erros</li>
            <li><span className="bb-check">✓</span>Acesso imediato</li>
          </ul>
          <div className="bb-divider" />
          <p className="bb-price"><strong>R$ 12,99</strong> — pagamento único.</p>
          <p>Menos que um lanche.</p>
          <p>Por R$ 12,99 você finalmente descobre quais são os 10 erros — <strong>antes que seja tarde.</strong></p>
          <p className="bb-muted">Você paga uma vez. Assiste quando quiser.</p>
          <BuyButton placement="oferta-final" full />
          <p className="bb-muted">R$ 12,99 — pagamento único</p>
        </div>
      </div></section>

      <section className="bb-section"><div className="bb-wrap">
        <h2 className="bb-white-title">AINDA COM DÚVIDAS?</h2>
        <div className="bb-faq">
          <div className="bb-card"><b>É sobre cadastro?</b><p>Não. É sobre erros do dia a dia.</p></div>
          <div className="bb-card"><b>É difícil?</b><p>Não. Vídeo, linguagem simples.</p></div>
          <div className="bb-card"><b>Como recebo?</b><p>Online, acesso imediato, assista onde quiser.</p></div>
          <div className="bb-card"><b>Garante que não perco o benefício?</b><p>Não. Nenhum treinamento garante. Mas te mostra o que observar.</p></div>
          <div className="bb-card"><b>Pagamento único?</b><p>Sim. R$ 12,99. Sem mensalidade.</p></div>
          <div className="bb-card"><b>É do governo?</b><p>Não. É independente, educativo.</p></div>
        </div>
        <p className="bb-muted">Mais de 6 dúvidas respondidas. Se a sua não estiver aqui, o conteúdo te orienta.</p>
      </div></section>

      <section className="bb-section bb-band bb-bottomline"><div className="bb-wrap">
        <h2 className="bb-white-title">VOCÊ TEM DUAS OPÇÕES</h2>
        <div className="bb-choice"><strong>1.</strong> Fechar esta página e continuar sem saber quais são os 10 erros.</div>
        <div className="bb-choice bb-choice-green"><strong>2.</strong> Pagar R$ 12,99 e descobrir <strong>hoje</strong> o que pode estar colocando seu Bolsa Família em risco.</div>
        <p className="bb-question">A LISTA ESTÁ LÁ DENTRO. E ENQUANTO VOCÊ NÃO CONHECE, ELA CONTINUA ESCONDIDA.</p>
        <BuyButton placement="fechamento" />
        <p className="bb-muted">R$ 12,99 — pagamento único</p>
        <p className="bb-muted">Acesso liberado na hora, direto no seu celular.</p>
      </div></section>

      <div className={"bb-sticky" + (showSticky ? " bb-sticky-show" : "")}>
        <div className="bb-sticky-inner"><BuyButton placement="barra-fixa-mobile" /><span className="bb-sticky-price">R$ 12,99</span></div>
      </div>
    </main>
  );
}
