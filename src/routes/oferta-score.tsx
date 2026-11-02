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
      <style>{`
        html:has(.so-page),body:has(.so-page){margin:0!important;background:#071321!important}
        .so-page,.so-page *{box-sizing:border-box}
        .so-page{min-height:100vh;min-height:100svh;padding:25px 15px 45px;color:#f7f9fc;background:radial-gradient(ellipse at 50% 0%,rgba(26,100,111,.28),transparent 48%),#071321;font-family:Inter,ui-sans-serif,system-ui,sans-serif}
        .so-shell{max-width:760px;margin:auto}.so-brand{text-align:center;margin:5px 0 28px;font-size:12px;font-weight:850;letter-spacing:.15em}
        .so-card{padding:34px;border:1px solid rgba(226,192,119,.34);border-radius:22px;background:radial-gradient(ellipse at 100% 0%,rgba(217,177,98,.13),transparent 42%),linear-gradient(145deg,#172a3b,#0d1c2b);box-shadow:0 22px 60px #0004}
        .so-tag{color:#edcf91;font-size:10px;font-weight:900;letter-spacing:.14em}.so-card h1{margin:15px 0;color:#fff;font-size:clamp(28px,5vw,42px);line-height:1.1;letter-spacing:-.04em}.so-card h1 span{color:#e7c477}
        .so-card p{color:#c6d0d9;font-size:14px;line-height:1.7}.so-highlight{margin:20px 0;padding:17px;border:1px solid rgba(131,223,200,.22);border-radius:13px;background:rgba(7,19,33,.4);color:#e7f2f0;font-weight:700}
        .so-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0}.so-item{padding:17px;border:1px solid rgba(174,199,218,.15);border-radius:13px;background:#0b1b2b;color:#d5dee6;font-size:13px;line-height:1.6}.so-item strong{display:block;margin-bottom:7px;color:#f0d18e}
        .so-price{text-align:center;margin:25px 0 4px;color:#f4d895;font-size:clamp(42px,8vw,56px);font-weight:900;letter-spacing:-.05em}.so-sub{text-align:center;color:#aebdca!important;font-size:11px!important}
        .so-cta{display:flex;justify-content:center;align-items:center;min-height:58px;margin:18px auto 0;padding:15px 20px;max-width:500px;border:1px solid #ffe6a6;border-radius:13px;background:linear-gradient(135deg,#f3d58e,#d9ad54);color:#172334;text-align:center;text-decoration:none;font-size:14px;font-weight:900}
        .so-decline{display:block;margin:19px auto 0;color:#b8c5d0;text-align:center;font-size:12px;text-decoration:underline;text-underline-offset:4px}
        .so-legal{max-width:690px;margin:17px auto 0;color:#8495a5;font-size:10px;line-height:1.6;text-align:center}
        @media(max-width:560px){.so-card{padding:25px 18px}.so-grid{grid-template-columns:1fr}}
      `}</style>
      <div className="so-shell">
        <header className="so-brand">✓ BLINDA BOLSA FAMÍLIA</header>
        <section className="so-card">
          <span className="so-tag">SUA PRÓXIMA ETAPA</span>
          <h1>ENTENDA O SCORE E CONHEÇA CAMINHOS PARA <span>BUSCAR CRÉDITO.</span></h1>
          <div className="so-highlight">{opening}</div>
          <p><strong>Mas o que é score?</strong> É uma pontuação que empresas podem usar como um dos dados para avaliar um pedido de crédito. Em palavras simples, funciona como uma nota relacionada ao seu histórico financeiro. Ela pode influenciar a análise, mas não garante aprovação nem define sozinha o limite do cartão.</p>
          <p>O <strong>AUMENTA SCORE + BÔNUS</strong> reúne videoaulas para explicar esse assunto de forma simples e um conteúdo complementar sobre uma instituição que divulga possibilidades de crédito para pessoas com restrição no CPF.</p>
          <div className="so-grid">
            <div className="so-item"><strong>CURSO EM VIDEOAULAS</strong>Entenda o que é score, quais fatores podem influenciar essa pontuação e conheça cuidados relacionados ao seu histórico de crédito.</div>
            <div className="so-item"><strong>BÔNUS SOBRE CRÉDITO</strong>Conheça a alternativa apresentada no material e consulte diretamente a instituição para verificar condições e requisitos para seu caso.</div>
          </div>
          <p>Você pode estudar no seu ritmo e conhecer melhor o assunto antes de avaliar suas opções.</p>
          <div className="so-price">R$ 29,00</div>
          <p className="so-sub">Pagamento único · Aumenta Score + Bônus</p>
          <a className="so-cta" href="https://pay.cakto.com.br/rx38zo7_1271604" target="_blank" rel="noopener noreferrer">QUERO ACESSAR O CURSO + BÔNUS →</a>
          <a className="so-decline" href="/oferta-especial">Não quero essa oferta por R$ 29,00 — ver opção de R$ 9,90</a>
          <p className="so-legal">*Importante: o conteúdo é educativo e informativo. Não garante aumento de score, aprovação de cartão, concessão de crédito ou aumento de limite. Cada instituição possui seus próprios critérios de análise.</p>
        </section>
      </div>
    </main>
  );
}
