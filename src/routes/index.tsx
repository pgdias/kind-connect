import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackEvent } from "../lib/api";

const COURSE_PRESENTATION_VIDEO = "";
const TESTIMONIAL_VIDEO_ONE = "";
const TESTIMONIAL_VIDEO_TWO = "";
const CHECKOUT_URL = "https://pay.cakto.com.br/38xq22v_1131074";

export const Route = createFileRoute("/")({ component: TslSalesPage });

function ShieldMark() {
  return <svg viewBox="0 0 100 112" aria-hidden="true"><path d="M50 4 91 19v31c0 28-16 47-41 58C25 97 9 78 9 50V19L50 4Z" fill="#07316a" stroke="#ffce19" strokeWidth="5"/><path d="M50 13 82 25v25c0 22-12 38-32 48C30 88 18 72 18 50V25l32-12Z" fill="none" stroke="#fff" strokeOpacity=".35"/><circle cx="50" cy="39" r="9" fill="#fff"/><path d="M34 68c1-11 7-17 16-17s15 6 16 17M25 61c0-7 4-11 9-11m41 11c0-7-4-11-9-11" fill="none" stroke="#ffce19" strokeWidth="5" strokeLinecap="round"/></svg>;
}

function PlayMark() {
  return <span className="bl-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5Z" fill="currentColor"/></svg></span>;
}

function VideoSlot({ src, title, eyebrow, kind = "main" }: { src: string; title: string; eyebrow: string; kind?: "main" | "testimonial" }) {
  return (
    <section className={`bl-video-slot ${kind === "testimonial" ? "bl-video-testimonial" : ""}`}>
      <div className="bl-video-copy"><span className="bl-kicker">{eyebrow}</span><h3>{title}</h3><p>{src ? "Assista ao vídeo abaixo." : "Vídeo será adicionado aqui."}</p></div>
      <div className="bl-video-screen">
        {src ? <iframe src={src} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <div className="bl-video-placeholder"><PlayMark/><b>{kind === "main" ? "CONHEÇA O BLINDA POR DENTRO" : "RELATO EM VÍDEO"}</b><small>Espaço reservado para o vídeo</small></div>}
      </div>
    </section>
  );
}

function BuyButton({ label = "QUERO GARANTIR MEU ACESSO AGORA" }: { label?: string }) {
  return <a className="bl-buy" href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" onClick={() => { void trackEvent("checkout_click", { page: "/", checkout_provider: "cakto", funnel: "tsl" }); }}>{label}<span>➜</span></a>;
}

function TslSalesPage() {
  useEffect(() => { void trackEvent("tsl_landing_viewed"); }, []);
  return (
    <main className="bl-page">
      <style>{`
        .bl-page{--navy:#061f4f;--navy2:#092d68;--yellow:#ffd21a;--red:#e21b23;--green:#159b28;--ink:#071c43;--paper:#f4f6fa;background:#f4f6fa;color:var(--ink);font-family:Arial,Helvetica,sans-serif;overflow:hidden;padding-bottom:0}
        .bl-page *{box-sizing:border-box}.bl-shell{width:min(100% - 36px,1040px);margin:0 auto}.bl-top{background:var(--navy);color:#fff;text-align:center;padding:10px 14px;font-size:11px;font-weight:900;letter-spacing:.1em}
        .bl-hero{background:linear-gradient(115deg,#041b45 0%,#082d65 52%,#0a4d45 100%);color:#fff;position:relative;padding:34px 0 44px;isolation:isolate}.bl-hero:before{content:"";position:absolute;z-index:-1;inset:0;background:radial-gradient(circle at 82% 22%,#76c65b55,transparent 28%),linear-gradient(135deg,transparent 58%,#ffcf1930 58.2%,transparent 59%)}.bl-brand{display:flex;align-items:center;gap:12px;margin-bottom:25px}.bl-brand svg{width:60px;flex:none}.bl-brand strong{font-size:clamp(22px,4vw,36px);line-height:.9;font-weight:1000;letter-spacing:-1px}.bl-brand strong span{display:block;color:var(--yellow);font-style:italic;font-size:.78em;margin-top:5px}.bl-hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:28px;align-items:center}.bl-alert{display:inline-block;background:var(--yellow);color:#071b3d;border-radius:8px;padding:8px 13px;font-size:11px;font-weight:1000;letter-spacing:.06em;transform:rotate(-1deg)}.bl-hero h1{font-size:clamp(38px,6.2vw,68px);line-height:.94;letter-spacing:-2px;text-transform:uppercase;font-weight:1000;margin:17px 0 14px}.bl-hero h1 em{color:var(--yellow);font-style:normal}.bl-red-swipe{display:inline-block;background:var(--red);padding:7px 13px 10px;transform:rotate(-1.5deg);box-shadow:5px 5px 0 #9d1118;margin-top:5px}.bl-hero-lead{font-size:17px;line-height:1.45;font-weight:700;max-width:480px;color:#eef4ff}.bl-hero-visual{min-height:300px;border:2px solid #ffffff55;border-radius:22px;background:linear-gradient(145deg,#fff4d3,#f5b14c 45%,#174c48 46%,#061f4f);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;box-shadow:0 20px 45px #0004}.bl-family-art{width:78%;height:260px;border-radius:46% 46% 12px 12px;background:linear-gradient(150deg,#f6bd8b,#d8794c 58%,#164d47 59%);position:relative;display:flex;align-items:center;justify-content:center}.bl-person-head{position:absolute;top:24px;width:112px;height:125px;border-radius:48% 48% 43% 43%;background:linear-gradient(135deg,#a85d3c,#e9a477);box-shadow:inset -15px -8px 0 #81432f}.bl-person-hair{position:absolute;top:6px;width:132px;height:70px;border-radius:60% 55% 20% 20%;background:#211a18}.bl-card-art{position:absolute;bottom:25px;left:18%;width:150px;height:90px;background:#0870d6;border:3px solid #fff;border-radius:10px;transform:rotate(-8deg);box-shadow:0 10px 20px #0004;display:grid;place-items:center;color:#fff;text-align:center;font-weight:1000;font-size:18px}.bl-warning{position:absolute;right:15px;top:16px;background:#e21b23;color:white;border:3px solid white;border-radius:14px;padding:13px;font-size:12px;font-weight:1000;text-align:center;box-shadow:0 8px 18px #0004}.bl-hero-stamp{position:absolute;left:14px;bottom:13px;background:var(--yellow);color:#071b3d;padding:10px 13px;border-radius:9px;font-weight:1000;font-size:12px;transform:rotate(-3deg)}
        .bl-section{padding:48px 0}.bl-section.white{background:#fff}.bl-section.soft{background:linear-gradient(180deg,#eaf0f8,#f7f8fb)}.bl-section.navy{background:var(--navy);color:#fff}.bl-section h2{font-size:clamp(27px,4.3vw,43px);line-height:1.04;letter-spacing:-1px;text-align:center;text-transform:uppercase;font-weight:1000;margin:0 auto 15px;max-width:850px}.bl-section h2 em{color:#e4b900;font-style:normal}.bl-intro{max-width:790px;margin:0 auto 25px;text-align:center;color:#52627a;font-size:16px;line-height:1.65}.bl-section.navy .bl-intro{color:#dce7fb}.bl-kicker{display:block;color:#d21c25;font-size:11px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase;margin-bottom:10px}.bl-section.navy .bl-kicker{color:var(--yellow)}
        .bl-split{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:stretch}.bl-panel{background:#fff;border:1px solid #dce3ee;border-radius:17px;padding:24px;box-shadow:0 12px 28px #061f4f12}.bl-panel h3{font-size:24px;line-height:1.1;margin:0 0 12px;color:var(--navy)}.bl-panel p{font-size:15px;line-height:1.65;color:#43536c}.bl-list{list-style:none;padding:0;margin:15px 0 0}.bl-list li{display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid #edf0f4;font-weight:800;font-size:14px;line-height:1.4;color:#102a55}.bl-x{color:var(--red);font-size:19px;font-weight:1000;line-height:1}.bl-check{color:var(--green);font-size:19px;font-weight:1000;line-height:1}
        .bl-video-slot{background:#071f4d;color:#fff;border:3px solid #fff;border-radius:18px;padding:17px;box-shadow:0 14px 30px #061f4f24}.bl-video-copy h3{font-size:24px;line-height:1.05;margin:0 0 7px}.bl-video-copy p{font-size:12px;color:#d5e2f6;margin:0 0 13px}.bl-video-slot .bl-kicker{color:var(--yellow)}.bl-video-screen{aspect-ratio:16/9;background:linear-gradient(145deg,#123d79,#061735);border:1px solid #ffffff30;border-radius:12px;overflow:hidden;position:relative}.bl-video-screen iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.bl-video-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;padding:15px;color:#fff}.bl-video-placeholder b{font-size:clamp(13px,2vw,20px);color:var(--yellow);font-weight:1000}.bl-video-placeholder small{font-size:11px;color:#d5e2f6}.bl-play{display:grid;place-items:center;width:62px;height:62px;border-radius:50%;background:var(--yellow);color:var(--navy);box-shadow:0 0 0 9px #ffffff25}.bl-play svg{width:28px;height:28px;margin-left:3px}.bl-video-testimonial{background:linear-gradient(145deg,#0a3977,#061b43);padding:14px}.bl-video-testimonial .bl-video-copy h3{font-size:18px}.bl-video-testimonial .bl-play{width:48px;height:48px}.bl-video-testimonial .bl-play svg{width:22px}
        .bl-proof-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.bl-stack{background:#fff;border:2px solid #dbe5f0;border-radius:16px;padding:21px;box-shadow:0 10px 24px #061f4f10}.bl-stack.green{border-color:#b6dcb8}.bl-stack-head{margin:-21px -21px 16px;padding:13px 18px;background:var(--navy);color:#fff;border-radius:13px 13px 0 0;font-size:18px;font-weight:1000;text-transform:uppercase}.bl-stack.green .bl-stack-head{background:#16952b}.bl-stack ul{list-style:none;padding:0;margin:0}.bl-stack li{display:flex;gap:10px;align-items:flex-start;padding:9px 0;color:#112c56;font-size:14px;font-weight:800;line-height:1.4;border-bottom:1px solid #edf0f4}
        .bl-offer{background:linear-gradient(135deg,#061f4f,#0b3978);border:3px solid var(--yellow);border-radius:22px;color:#fff;padding:28px;max-width:820px;margin:25px auto 0;display:grid;grid-template-columns:1fr 1fr;gap:22px;align-items:center;box-shadow:0 18px 38px #061f4f2b}.bl-offer-tag{color:var(--yellow);font-size:12px;font-weight:1000;letter-spacing:.1em}.bl-offer h3{font-size:26px;margin:7px 0}.bl-price{font-size:clamp(44px,7vw,70px);font-weight:1000;letter-spacing:-2px;color:var(--yellow);line-height:1}.bl-price small{font-size:20px;vertical-align:top}.bl-pay-note{font-size:12px;color:#dbe6f7;margin-top:8px}.bl-buy{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(180deg,#25bd36,#087d20);border:2px solid #a8ff8d;color:#fff;text-align:center;border-radius:13px;min-height:64px;padding:14px 17px;font-size:16px;line-height:1.1;font-weight:1000;text-transform:uppercase;box-shadow:0 9px 0 #075c1b,0 14px 22px #0003;transition:transform .15s ease}.bl-buy:hover{transform:translateY(-2px)}.bl-buy span{font-size:22px}.bl-safe{display:flex;justify-content:center;gap:22px;flex-wrap:wrap;color:#dce7f6;font-size:11px;font-weight:800;margin-top:19px}.bl-faq{max-width:790px;margin:25px auto}.bl-faq details{background:#fff;border:1px solid #dce3ee;border-radius:12px;padding:16px 18px;margin:10px 0}.bl-faq summary{font-size:14px;font-weight:900;color:var(--navy);cursor:pointer;line-height:1.4}.bl-faq details p{font-size:13px;color:#53627a;line-height:1.6;margin:10px 0 0}.bl-footer{background:#041638;color:#dbe5f4;padding:27px 0;text-align:center}.bl-footer p{font-size:10px;line-height:1.65;margin:0 auto;max-width:900px}.bl-sticky{display:none}
        @media(max-width:700px){.bl-shell{width:min(100% - 26px,1040px)}.bl-top{font-size:9px;padding:9px 8px}.bl-hero{padding:22px 0 30px}.bl-brand{gap:9px;margin-bottom:20px}.bl-brand svg{width:48px}.bl-brand strong{font-size:25px}.bl-hero-grid{grid-template-columns:1fr;gap:19px}.bl-alert{font-size:9px}.bl-hero h1{font-size:clamp(37px,11vw,53px);letter-spacing:-1.5px;margin:14px 0 12px}.bl-hero-lead{font-size:14px}.bl-hero-visual{min-height:230px;border-radius:15px}.bl-family-art{height:205px;width:74%}.bl-person-head{width:88px;height:103px;top:20px}.bl-person-hair{width:104px;height:58px}.bl-card-art{width:125px;height:73px;font-size:15px;bottom:17px}.bl-warning{font-size:9px;padding:9px;right:9px;top:9px}.bl-hero-stamp{font-size:10px;left:9px;bottom:9px}.bl-section{padding:34px 0}.bl-section h2{font-size:clamp(25px,8vw,34px)}.bl-intro{font-size:14px;line-height:1.55}.bl-split,.bl-proof-grid{grid-template-columns:1fr;gap:13px}.bl-panel{padding:18px}.bl-panel h3{font-size:21px}.bl-panel p{font-size:14px}.bl-video-slot{padding:13px;border-radius:14px}.bl-video-copy h3{font-size:21px}.bl-stack{padding:17px}.bl-stack-head{margin:-17px -17px 12px;padding:12px 15px;font-size:16px}.bl-stack li{font-size:13px}.bl-offer{grid-template-columns:1fr;gap:18px;padding:21px 17px;border-radius:17px}.bl-offer h3{font-size:23px}.bl-price{font-size:58px}.bl-buy{min-height:59px;font-size:14px}.bl-safe{gap:12px;font-size:10px}.bl-sticky{display:block;position:fixed;z-index:100;left:0;right:0;bottom:0;padding:9px 12px calc(9px + env(safe-area-inset-bottom));background:#ffffffed;border-top:1px solid #dce3ee;backdrop-filter:blur(12px)}.bl-sticky .bl-buy{max-width:560px;margin:auto;min-height:48px;font-size:12px;box-shadow:0 5px 0 #075c1b}.bl-footer{padding-bottom:92px}}
        @media(max-width:360px){.bl-hero h1{font-size:35px}.bl-brand strong{font-size:22px}.bl-warning{font-size:8px}.bl-card-art{width:110px}.bl-buy{font-size:12px}}
        @media(prefers-reduced-motion:reduce){.bl-buy{transition:none}}
      `}</style>
      <div className="bl-top">TREINAMENTO EDUCATIVO • CUIDE DO SEU CADASTRO COM INFORMAÇÃO</div>
      <header className="bl-hero">
        <div className="bl-shell">
          <div className="bl-brand"><ShieldMark/><strong>BLINDA <span>BOLSA FAMÍLIA</span></strong></div>
          <div className="bl-hero-grid">
            <div>
              <span className="bl-alert">ATENÇÃO: QUEM RECEBE O BENEFÍCIO</span>
              <h1>OS <em>10 ERROS</em> QUE VOCÊ PODE ESTAR COMETENDO E QUE PODEM COLOCAR SEU <em>BOLSA FAMÍLIA</em> <span className="bl-red-swipe">EM RISCO!</span></h1>
              <p className="bl-hero-lead">Descubra cuidados importantes com informações simples e diretas sobre o Cadastro Único.</p>
            </div>
            <div className="bl-hero-visual" aria-label="Ilustração conceitual de uma pessoa preocupada ao conferir o cartão do benefício">
              <div className="bl-family-art"><div className="bl-person-hair"/><div className="bl-person-head"/><div className="bl-card-art">Bolsa<br/>Família</div></div>
              <div className="bl-warning">⚠<br/>EVITE<br/>SURPRESAS</div><div className="bl-hero-stamp">INFORMAÇÃO É PROTEÇÃO</div>
            </div>
          </div>
        </div>
      </header>

      <section className="bl-section white">
        <div className="bl-shell bl-split">
          <article className="bl-panel">
            <span className="bl-kicker">VOCÊ SABIA?</span>
            <h3>Muitas dúvidas começam com pequenos descuidos no Cadastro Único.</h3>
            <ul className="bl-list">
              <li><span className="bl-x">✕</span> Informações desatualizadas</li>
              <li><span className="bl-x">✕</span> Dados incorretos ou incompletos</li>
              <li><span className="bl-x">✕</span> Mudanças na família não informadas</li>
            </ul>
            <p><strong>Não espere surgir uma dúvida para procurar informação.</strong></p>
          </article>
          <VideoSlot src={COURSE_PRESENTATION_VIDEO} eyebrow="VEJA O BLINDA POR DENTRO" title="Conheça o treinamento antes de comprar" />
        </div>
      </section>

      <section className="bl-section soft">
        <div className="bl-shell">
          <span className="bl-kicker" style={{textAlign:"center"}}>CONHEÇA O CONTEÚDO</span>
          <h2>O que você vai aprender com o <em>Blinda?</em></h2>
          <p className="bl-intro">Um treinamento educativo, em linguagem simples, para entender erros comuns e cuidados importantes relacionados ao Bolsa Família e ao Cadastro Único.</p>
          <div className="bl-proof-grid">
            <article className="bl-stack">
              <div className="bl-stack-head">O QUE VOCÊ VAI RECEBER</div>
              <ul>
                <li><span className="bl-check">✓</span> Treinamento com os 10 erros que merecem sua atenção</li>
                <li><span className="bl-check">✓</span> Cuidados importantes com o Cadastro Único</li>
                <li><span className="bl-check">✓</span> Vídeos explicativos passo a passo</li>
                <li><span className="bl-check">✓</span> Orientações para saber quando buscar os canais oficiais</li>
              </ul>
            </article>
            <article className="bl-stack green">
              <div className="bl-stack-head">POR QUE CONHECER?</div>
              <ul>
                <li><span className="bl-check">✓</span> Organize as informações mais importantes</li>
                <li><span className="bl-check">✓</span> Entenda quais dados merecem atenção</li>
                <li><span className="bl-check">✓</span> Saiba quais dúvidas levar ao atendimento oficial</li>
                <li><span className="bl-check">✓</span> Aprenda no seu ritmo, pelo conteúdo digital</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bl-section navy">
        <div className="bl-shell">
          <span className="bl-kicker" style={{textAlign:"center"}}>QUEM JÁ CONHECEU O BLINDA</span>
          <h2>Relatos em vídeo</h2>
          <p className="bl-intro">Assista aos relatos reais de quem conheceu o treinamento. Os vídeos serão inseridos nesta página.</p>
          <div className="bl-proof-grid">
            <VideoSlot src={TESTIMONIAL_VIDEO_ONE} eyebrow="RELATO 1" title="Experiência de uma aluna" kind="testimonial"/>
            <VideoSlot src={TESTIMONIAL_VIDEO_TWO} eyebrow="RELATO 2" title="Mais uma experiência" kind="testimonial"/>
          </div>
        </div>
      </section>

      <section className="bl-section soft">
        <div className="bl-shell">
          <h2>Cuide das informações do seu cadastro com mais clareza.</h2>
          <p className="bl-intro">Conheça o conteúdo do Blinda Bolsa Família e veja se o treinamento atende ao que você procura.</p>
          <div className="bl-offer">
            <div><span className="bl-offer-tag">ACESSO AO TREINAMENTO</span><h3>BLINDA BOLSA FAMÍLIA</h3><div className="bl-price"><small>R$</small> 12,49</div><div className="bl-pay-note">Pagamento único • Conteúdo digital</div></div>
            <div><BuyButton/><div className="bl-safe"><span>🔒 Compra pela Cakto</span><span>✓ Acesso conforme checkout</span></div></div>
          </div>
        </div>
      </section>

      <section className="bl-section white">
        <div className="bl-shell">
          <span className="bl-kicker" style={{textAlign:"center"}}>DÚVIDAS FREQUENTES</span>
          <h2>Antes de comprar, <em>saiba mais.</em></h2>
          <div className="bl-faq">
            <details><summary>O Blinda Bolsa Família é um programa do Governo?</summary><p>Não. É um treinamento educativo independente, sem vínculo com o Governo Federal, Caixa Econômica Federal ou Cadastro Único.</p></details>
            <details><summary>O treinamento garante que meu benefício não será bloqueado?</summary><p>Não. O treinamento não garante manutenção, desbloqueio ou aprovação de benefício. A situação de cada família depende das regras e da análise dos órgãos responsáveis.</p></details>
            <details><summary>O conteúdo substitui o atendimento do CRAS?</summary><p>Não. O material é educativo. Para atualizar dados ou resolver pendências, procure o CRAS ou os canais oficiais indicados para seu município.</p></details>
            <details><summary>Como recebo o treinamento?</summary><p>Após a confirmação do pagamento, siga as instruções de acesso apresentadas no checkout e enviadas pela plataforma.</p></details>
            <details><summary>O pagamento é único?</summary><p>O valor apresentado nesta página é de R$ 12,49 em pagamento único. Confira as condições finais no checkout antes de concluir a compra.</p></details>
          </div>
          <BuyButton label="QUERO CONHECER O BLINDA AGORA"/>
        </div>
      </section>
      <footer className="bl-footer"><div className="bl-shell"><p>Blinda Bolsa Família — treinamento educativo independente. Não somos órgão governamental e não temos vínculo com o Governo Federal, Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome, Caixa Econômica Federal ou Cadastro Único. O conteúdo não garante manutenção, desbloqueio ou aprovação de benefícios e não substitui os canais oficiais.</p></div></footer>
      <div className="bl-sticky"><BuyButton label="GARANTIR MEU ACESSO • R$ 12,49"/></div>
    </main>
  );
}
