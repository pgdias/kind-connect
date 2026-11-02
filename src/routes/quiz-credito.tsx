import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const questions = [
  { title: "Você já tem cartão de crédito?", subtitle: "Queremos entender seu momento.", options: ["Sim, mas o limite é baixo", "Sim, tenho um limite que atende", "Não tenho cartão", "Já tentei, mas não consegui aprovação"] },
  { title: "O que você mais gostaria de conseguir?", subtitle: "Escolha o que é mais importante para você agora.", options: ["Aumentar o limite do meu cartão", "Conseguir meu primeiro cartão", "Encontrar alternativas mesmo com restrição no CPF", "Entender melhor como funciona o score"] },
  { title: "Atualmente, seu nome está com alguma restrição (negativado)?", subtitle: "Essa resposta ajuda a direcionar as informações apresentadas.", options: ["Sim", "Não", "Não sei / nunca consultei"] },
  { title: "Você sabe o que é score de crédito?", subtitle: "Score é uma pontuação que empresas podem considerar ao avaliar pedidos de crédito.", options: ["Sim, sei como funciona", "Já ouvi falar, mas não entendo direito", "Não, é a primeira vez que vejo esse termo"] },
  { title: "Se pudesse aprender sobre isso, o que gostaria de entender primeiro?", subtitle: "Não existe resposta certa ou errada.", options: ["O que pode influenciar meu score", "O que posso fazer para buscar um limite melhor", "Quais alternativas existem para quem está negativado", "Quero aprender tudo isso"] },
];

export const Route = createFileRoute("/quiz-credito")({ component: CreditQuiz });

function CreditQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const q = questions[step];
  if (!q) return null;

  function choose(value: string) {
    const next = [...answers.slice(0, step), value];
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setBusy(true);
    sessionStorage.setItem("blindaCreditQuizAnswers", JSON.stringify(next));
    window.location.assign("/oferta-score");
  }

  return (
    <main className="cq-page">
      <style>{`
        html:has(.cq-page),body:has(.cq-page){margin:0!important;background:#071321!important}
        .cq-page,.cq-page *{box-sizing:border-box}
        .cq-page{min-height:100vh;min-height:100svh;padding:25px 15px 45px;color:#f7f9fc;background:radial-gradient(ellipse at 50% 0%,rgba(26,100,111,.28),transparent 48%),#071321;font-family:Inter,ui-sans-serif,system-ui,sans-serif}
        .cq-shell{max-width:680px;margin:auto}
        .cq-brand{text-align:center;margin:5px 0 32px;color:#e9f0f7;font-size:12px;font-weight:850;letter-spacing:.15em}
        .cq-brand span{color:#83dfc8;margin-right:9px}\n        .cq-welcome{margin:0 0 23px;padding:22px;border:1px solid rgba(231,196,119,.25);border-radius:16px;background:rgba(231,196,119,.06)}.cq-welcome h1{margin:11px 0;color:#fff;font-size:clamp(23px,4.8vw,31px);line-height:1.13;letter-spacing:-.03em}.cq-welcome p{margin:0;color:#c4d0da;font-size:13px;line-height:1.65}
        .cq-progress{height:6px;background:#1b3041;border-radius:99px;overflow:hidden;margin-bottom:27px}
        .cq-progress span{display:block;height:100%;background:linear-gradient(90deg,#55c9ad,#e7c477);transition:width .2s}
        .cq-count{color:#8ce2cb;font-size:11px;font-weight:850;letter-spacing:.12em}
        .cq-card{margin-top:12px;padding:30px;border:1px solid rgba(174,199,218,.16);border-radius:20px;background:linear-gradient(145deg,#122a3c,#0b1b2b);box-shadow:0 22px 60px #0004}
        .cq-card h1{margin:12px 0;color:#fff;font-size:clamp(25px,5vw,34px);line-height:1.15;letter-spacing:-.03em}
        .cq-card p{color:#b9c8d4;font-size:14px;line-height:1.65}
        .cq-options{display:grid;gap:11px;margin-top:25px}
        .cq-options button{width:100%;padding:16px 17px;border:1px solid rgba(174,199,218,.2);border-radius:12px;background:#0a1a29;color:#edf3f7;text-align:left;font-size:14px;font-weight:650;line-height:1.45;cursor:pointer}
        .cq-options button:hover{border-color:#83dfc8;background:#10283a}
        .cq-back{margin-top:20px;border:0;background:none;color:#9fb0bf;font-size:12px;cursor:pointer}
        .cq-foot{margin-top:20px;text-align:center;color:#8293a3;font-size:10px;line-height:1.6}
        @media(max-width:520px){.cq-card{padding:23px 18px}.cq-options button{padding:15px}}
      `}</style>
      <div className="cq-shell">
        <header className="cq-brand"><span>✓</span> BLINDA BOLSA FAMÍLIA</header>
        {step === 0 && <section className="cq-welcome">
          <span className="cq-count">QUIZ GRATUITO · 5 PERGUNTAS RÁPIDAS</span>
          <h1>QUER ENTENDER O QUE PODE ESTAR POR TRÁS DE UM LIMITE BAIXO OU DE UM CARTÃO NÃO APROVADO?</h1>
          <p>Descubra o que é score, por que essa pontuação pode ser considerada pelos bancos e conheça informações sobre alternativas de crédito — inclusive para quem está com o nome negativado.</p>
        </section>}
        <div className="cq-progress"><span style={{width: ((step+1)/questions.length*100)+"%"}} /></div>
        <div className="cq-count">PERGUNTA {step+1} DE {questions.length}</div>
        <section className="cq-card">
          <h1>{q.title}</h1>
          <p>{q.subtitle}</p>
          <div className="cq-options">
            {q.options.map(option=><button type="button" key={option} disabled={busy} onClick={()=>choose(option)}>{option} →</button>)}
          </div>
          {step>0 && <button className="cq-back" type="button" onClick={()=>setStep(step-1)}>← Voltar</button>}
        </section>
        <footer className="cq-foot">Responda sem informar CPF, senha ou dados bancários. Esta é uma orientação educativa, não uma análise de crédito.</footer>
      </div>
    </main>
  );
}
