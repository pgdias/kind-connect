import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/oferta-score")({ component: ScoreOffer });

function ScoreOffer() {
  const [answers,setAnswers] = useState<string[]>([]);
  useEffect(()=>{try{const value=JSON.parse(sessionStorage.getItem("blindaCreditQuizAnswers")||"[]");if(Array.isArray(value))setAnswers(value)}catch{ /* sessão indisponível */ }},[]);
  const goal=answers[1]||"Entender melhor como funciona o crédito";
  const opening=goal.includes("limite")?"Você quer buscar um limite melhor no cartão.":goal.includes("primeiro cartão")?"Você quer entender como buscar seu primeiro cartão.":goal.includes("negativado")?"Você quer conhecer alternativas mesmo com restrição no CPF.":"Você quer entender melhor como funciona o crédito.";
  return (
    <main className="so-page">
      <style>
        @keyframes so-gentle-pulse{0%,100%{transform:scale(1);box-shadow:0 8px 22px rgba(233,185,0,.16)}50%{transform:scale(1.018);box-shadow:0 12px 28px rgba(233,185,0,.28)}}
        @media(prefers-reduced-motion:reduce){.so-cta{animation:none}}
{`
        html:has(.so-page),body:has(.so-page){margin:0!important;background:#061b2a!important}
        .so-page,.so-page *{box-sizing:border-box}
        .so-page{min-height:100vh;min-height:100svh;padding:25px 15px 45px;color:#f7f9fc;background:radial-gradient(ellipse at 50% 0%,rgba(26,100,111,.28),transparent 48%),#071321;font-family:Inter,ui-sans-serif,system-ui,sans-serif}
        .so-shell{max-width:760px;margin:auto}.so-brand{text-align:center;margin:5px 0 28px;font-size:12px;font-weight:850;letter-spacing:.15em}
        .so-card{padding:34px;border:1px solid rgba(226,192,119,.34);border-radius:22px;background:radial-gradient(ellipse at 100% 0%,rgba(255,204,35,.13),transparent 42%),linear-gradient(145deg,#0b3542,#082a37);box-shadow:0 22px 60px #0004}
        .so-tag{color:#edcf91;font-size:10px;font-weight:900;letter-spacing:.14em}.so-card h1{margin:15px 0;color:#fff;font-size:clamp(28px,5vw,42px);line-height:1.1;letter-spacing:-.04em}.so-card h1 span{color:#ffd12e}
        .so-card p{color:#c6d0d9;font-size:14px;line-height:1.7}.so-highlight{margin:20px 0;padding:17px;border:1px solid rgba(131,223,200,.22);border-radius:13px;background:rgba(7,19,33,.4);color:#e7f2f0;font-weight:700}
        .so-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0}.so-item{padding:17px;border:1px solid rgba(40,214,166,.20);border-radius:13px;background:#082a37;color:#d5dee6;font-size:13px;line-height:1.6}.so-item strong{display:block;margin-bottom:7px;color:#ffe05a}
        .so-product-image{display:flex;justify-content:center;margin:26px auto 10px}.so-product-image img{display:block;width:min(100%,360px);height:auto;border-radius:14px;box-shadow:0 16px 36px #0008;border:1px solid rgba(255,209,46,.3)}
        .so-price{text-align:center;margin:25px 0 4px;color:#f4d895;font-size:clamp(42px,8vw,56px);font-weight:900;letter-spacing:-.05em}.so-sub{text-align:center;color:#aebdca!important;font-size:11px!important}
        .so-cta{display:flex;justify-content:center;align-items:center;min-height:58px;margin:18px auto 0;padding:15px 20px;max-width:500px;border:1px solid #ffe05a;border-radius:13px;background:linear-gradient(135deg,#ffd12e,#e9b900);color:#172334;text-align:center;text-decoration:none;font-size:14px;font-weight:900;transform-origin:center;animation:so-gentle-pulse 2.4s ease-in-out infinite}
        .so-decline{display:block;margin:19px auto 0;color:#b8c5d0;text-align:center;font-size:12px;text-decoration:underline;text-underline-offset:4px}
        .so-legal{max-width:690px;margin:17px auto 0;color:#8495a5;font-size:10px;line-height:1.6;text-align:center}
        @media(max-width:560px){.so-card{padding:25px 18px}.so-grid{grid-template-columns:1fr}}
      `}</style>
      <div className="so-shell">
        <header className="so-brand">✓ BLINDA BOLSA FAMÍLIA</header>
        <section className="so-card">
          <span className="so-tag">SUA PRÓXIMA ETAPA</span>
          <h1>QUER UM <span>LIMITE MAIOR</span> NO CARTÃO? VEJA O QUE VOCÊ PODE APRENDER.</h1>
          <div className="so-highlight">{opening}</div>
          <p>O material <strong>AUMENTA SCORE — LIMITE DE CARTÃO DE CRÉDITO</strong> foi organizado para explicar, em videoaulas, informações que podem ajudar você a entender como buscar um limite melhor e o que observar no seu histórico financeiro.</p><p><strong>E se você está com o nome sujo?</strong> O bônus apresenta uma instituição que divulga opções de crédito para pessoas negativadas.</p><p><strong>O que é score?</strong> É uma pontuação que pode ser considerada pelos bancos na análise de crédito. Vamos explicar isso dentro do curso, sem complicação — porque o foco aqui é entender o caminho para buscar mais limite.</p>
          <div className="so-grid">
            <div className="so-item"><strong>CURSO EM VIDEOAULAS</strong>Conteúdo passo a passo sobre limite de cartão, score e fatores que podem entrar na análise de crédito.</div>
            <div className="so-item"><strong>BÔNUS: DICA DE BANCO</strong>Conheça a instituição apresentada no material, que divulga opções para quem está negativado.</div>
          </div>
          <p>Acesse o conteúdo, assista às aulas no seu ritmo e confira a dica bônus.</p>
          <div className="so-product-image"><img src="/aumenta-score-capa.jpg" alt="Capa do produto Aumenta Score — Limite de Cartão de Crédito" /></div>
          <div className="so-price">R$ 29,00</div>
          <p className="so-sub">Pagamento único · Aumenta Score + Bônus</p>
          <a className="so-cta" href="https://pay.cakto.com.br/rx38zo7_1271604" target="_blank" rel="noopener noreferrer">QUERO APRENDER A BUSCAR UM LIMITE MAIOR →</a>
          <a className="so-decline" href="/oferta-especial">Agora não, obrigado.</a>
          <p className="so-legal">*Importante: o conteúdo é educativo e informativo. Não garante aumento de score, aprovação de cartão, concessão de crédito ou aumento de limite. Cada instituição possui seus próprios critérios de análise.</p>
        </section>
      </div>
    </main>
  );
}
