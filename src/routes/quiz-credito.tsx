import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const questions = [
  { title: "Hoje você tem cartão de crédito?", subtitle: "Escolha a opção que mais combina com sua situação.", options: ["Tenho, mas o limite é muito baixo", "Tenho e queria aumentar meu limite", "Ainda não tenho cartão", "Já tentei conseguir, mas fui recusado"] },
  { title: "Qual é seu maior objetivo?", subtitle: "Queremos mostrar o conteúdo mais relacionado ao que você procura.", options: ["Aumentar o limite do meu cartão", "Conseguir meu primeiro cartão", "Encontrar uma opção mesmo estando negativado", "Entender por que meu limite é tão baixo"] },
  { title: "Seu CPF está negativado atualmente?", subtitle: "Pode responder sem informar nenhum dado pessoal.", options: ["Sim, estou negativado", "Não, meu nome está limpo", "Não sei"] },
  { title: "Quando você pede aumento de limite, o que acontece?", subtitle: "Se ainda não tem cartão, escolha a última opção.", options: ["O banco nega meu pedido", "O banco oferece um aumento muito pequeno", "Nunca pedi aumento", "Ainda não tenho cartão"] },
  { title: "O que você mais gostaria de descobrir?", subtitle: "Escolha o assunto que mais interessa a você.", options: ["O que pode ajudar a buscar um limite maior", "Como os bancos avaliam um pedido de crédito", "Uma opção de banco para quem está negativado", "Quero conhecer tudo isso"] },
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
        html:has(.cq-page),body:has(.cq-page){margin:0!important;background:#061b2a!important}
        .cq-page,.cq-page *{box-sizing:border-box}
        .cq-page{min-height:100vh;min-height:100svh;padding:25px 15px 45px;color:#f7f9fc;background:radial-gradient(ellipse at 50% 0%,rgba(0,160,130,.20),transparent 48%),#071321;font-family:Inter,ui-sans-serif,system-ui,sans-serif}
        .cq-shell{max-width:680px;margin:auto}
        .cq-brand{text-align:center;margin:5px 0 32px;color:#e9f0f7;font-size:12px;font-weight:850;letter-spacing:.15em}
        .cq-brand span{color:#38d6a6;margin-right:9px}\n        .cq-welcome{margin:0 0 23px;padding:22px;border:1px solid rgba(231,196,119,.25);border-radius:16px;background:rgba(231,196,119,.06)}.cq-welcome h1{margin:11px 0;color:#fff;font-size:clamp(23px,4.8vw,31px);line-height:1.13;letter-spacing:-.03em}.cq-welcome p{margin:0;color:#c4d0da;font-size:13px;line-height:1.65}
        .cq-progress{height:6px;background:#173b4a;border-radius:99px;overflow:hidden;margin-bottom:27px}
        .cq-progress span{display:block;height:100%;background:linear-gradient(90deg,#28c99b,#ffd12e);transition:width .2s}
        .cq-count{color:#8ce2cb;font-size:11px;font-weight:850;letter-spacing:.12em}
        .cq-card{margin-top:12px;padding:30px;border:1px solid rgba(174,199,218,.16);border-radius:20px;background:linear-gradient(145deg,#0b3542,#082a37);box-shadow:0 22px 60px #0004}
        .cq-card h1{margin:12px 0;color:#fff;font-size:clamp(25px,5vw,34px);line-height:1.15;letter-spacing:-.03em}
        .cq-card p{color:#b9c8d4;font-size:14px;line-height:1.65}
        .cq-options{display:grid;gap:11px;margin-top:25px}
        .cq-options button{width:100%;padding:16px 17px;border:1px solid rgba(174,199,218,.2);border-radius:12px;background:#092d39;color:#edf3f7;text-align:left;font-size:14px;font-weight:650;line-height:1.45;cursor:pointer}
        .cq-options button:hover{border-color:#83dfc8;background:#10483f}
        .cq-back{margin-top:20px;border:0;background:none;color:#9fb0bf;font-size:12px;cursor:pointer}
        .cq-foot{margin-top:20px;text-align:center;color:#8293a3;font-size:10px;line-height:1.6}
        @media(max-width:520px){.cq-card{padding:23px 18px}.cq-options button{padding:15px}}
      `}</style>
      <div className="cq-shell">
        <header className="cq-brand"><span>✓</span> </header>
        {step === 0 && <section className="cq-welcome">
          <span className="cq-count">5 PERGUNTAS RÁPIDAS · GRÁTIS</span>
          <h1>QUER AUMENTAR O LIMITE DO SEU CARTÃO OU CONSEGUIR UM, MESMO COM O NOME SUJO?</h1>
          <p>Responda 5 perguntas rápidas e veja um conteúdo sobre o que pode influenciar o limite do cartão, além de uma dica de instituição que oferece opções para quem está negativado.</p>
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
        <footer className="cq-foot">Não informe CPF, senha ou dados bancários. O quiz é gratuito e não consulta seu crédito.</footer>
      </div>
    </main>
  );
}
