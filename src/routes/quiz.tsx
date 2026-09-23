import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

type Answer = { questionId: number; value: string; detail?: string[] };
type Question = { id: number; title: string; options: string[]; helper?: string };

const questions: Question[] = [
  { id: 1, title: "Você recebe o Bolsa Família atualmente?", options: ["Sim, recebo todos os meses", "Sim, mas meu benefício está bloqueado ou com alguma pendência", "Recebo, mas não sei se está tudo certo", "Não tenho certeza"] },
  { id: 2, title: "Você sabe quando foi a última vez que seu Cadastro Único foi atualizado?", options: ["Há menos de 2 anos", "Há mais de 2 anos", "Não lembro", "Não sei"] },
  { id: 3, title: "Alguma coisa mudou na sua família desde a última atualização?", options: ["Sim", "Não", "Não tenho certeza"] },
  { id: 4, title: "Na sua família existe alguma criança ou adolescente?", options: ["Sim", "Não", "Não tenho certeza"] },
  { id: 5, title: "Na sua família existe criança pequena ou gestante?", options: ["Sim", "Não", "Não tenho certeza"] },
  { id: 6, title: "Você ou alguém da sua família começou a trabalhar ou passou a ter uma nova fonte de renda recentemente?", options: ["Sim", "Não", "Não tenho certeza"] },
  { id: 7, title: "Você costuma conferir as informações e mensagens relacionadas ao seu benefício?", options: ["Sim, sempre", "Às vezes", "Quase nunca", "Não sei onde consultar"] },
  { id: 8, title: "Se aparecesse uma pendência relacionada ao seu Bolsa Família, você saberia o que fazer?", options: ["Sim", "Mais ou menos", "Não"] },
];

const familyChanges = ["Alguém começou a trabalhar", "Alguém deixou de trabalhar", "Entrou uma pessoa na família", "Saiu uma pessoa da família", "Mudamos de endereço", "Outra mudança"];
const yesNoUnsure = ["Sim", "Não", "Não tenho certeza"];

export const Route = createFileRoute("/quiz")({ component: QuizPage });

function QuizPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [details, setDetails] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  const question = questions[current];
  const selected = answers.find((a) => a.questionId === question.id)?.value;
  const progress = ((current + 1) / questions.length) * 100;

  const isConditional = (current === 2 && selected === "Sim") || ((current === 3 || current === 4) && selected === "Sim");

  const detailTitle = useMemo(() => {
    if (current === 2) return "Que tipo de mudança aconteceu?";
    if (current === 3) return "Você sabe se os acompanhamentos exigidos estão sendo realizados?";
    if (current === 4) return "Você sabe se os acompanhamentos de saúde aplicáveis estão em dia?";
    return "";
  }, [current]);

  const setAnswer = (value: string) => {
    setAnswers((prev) => [...prev.filter((a) => a.questionId !== question.id), { questionId: question.id, value }]);
    setDetails([]);
    if (current !== 2 && current !== 3 && current !== 4 && current !== 5) {
      window.setTimeout(() => {
        if (current === questions.length - 1) {
          setProcessing(true);
          window.setTimeout(() => { sessionStorage.setItem("blindaQuizAnswers", JSON.stringify(answers)); navigate({ to: "/resultado" }); }, 1800);
        } else {
          setCurrent((n) => n + 1);
        }
      }, 520);
    }
  };

  const toggleDetail = (value: string) => {
    if (current === 2) setDetails((prev) => prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]);
    else setDetails([value]);
  };

  const next = () => {
    if (!selected) return;
    if (isConditional && details.length === 0) return;
    setAnswers((prev) => prev.map((a) => a.questionId === question.id ? { ...a, detail: details } : a));
    if (current === questions.length - 1) {
      setProcessing(true);
      window.setTimeout(() => navigate({ to: "/resultado" }), 1800);
      return;
    }
    setCurrent((n) => n + 1);
    setDetails(answers.find((a) => a.questionId === question.id)?.detail ?? []);
  };

  const back = () => {
    if (current === 0) return navigate({ to: "/" });
    setCurrent((n) => n - 1);
    const previous = answers.find((a) => a.questionId === question.id - 1);
    setDetails(previous?.detail ?? []);
  };

  if (processing) return <ProcessingScreen />;

  return (
    <main className="quiz-shell">
      <header className="quiz-header">
        <Link to="/" className="quiz-brand"><span className="quiz-brand-mark">✓</span><strong>BLINDA BOLSA FAMÍLIA</strong></Link>
        <span className="quiz-safe">TESTE INFORMATIVO</span>
      </header>

      <section className="quiz-main">
        <div className="quiz-container">
          <div className="quiz-topline">
            <button className="quiz-back" onClick={back} aria-label="Voltar">← Voltar</button>
            <span>Pergunta {current + 1} de {questions.length}</span>
          </div>
          <div className="quiz-progress"><span style={{ width: `${progress}%` }} /></div>

          <div className="quiz-card">
            <div className="quiz-number">0{current + 1}</div>
            <p className="quiz-eyebrow">RESPONDA COM TRANQUILIDADE</p>
            <h1>{question.title}</h1>
            <p className="quiz-subtitle">Escolha a opção que mais corresponde à sua situação.</p>

            <div className="answer-list">
              {question.options.map((option) => (
                <button key={option} className={`answer-option ${selected === option ? "selected" : ""}`} onClick={() => setAnswer(option)}>
                  <span className="answer-radio">{selected === option ? "✓" : ""}</span>
                  <span>{option}</span>
                  <span className="answer-arrow">→</span>
                </button>
              ))}
            </div>

            {isConditional && (
              <div className="conditional-box">
                <p>{detailTitle}</p>
                <div className="detail-list">
                  {(current === 2 ? familyChanges : yesNoUnsure).map((item) => (
                    <button key={item} className={`detail-option ${details.includes(item) ? "selected" : ""}`} onClick={() => toggleDetail(item)}>
                      <span>{details.includes(item) ? "✓" : "○"}</span>{item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {current === 5 && selected === "Sim" && <div className="educational-note"><strong>Uma informação importante</strong><p>Ter trabalho ou outra fonte de renda não significa automaticamente perder o Bolsa Família. A situação depende das regras aplicáveis e da composição e renda da família.</p></div>}

            {(current === 2 || current === 3 || current === 4 || current === 5) && (
              <button className="quiz-continue" disabled={!selected || (isConditional && details.length === 0)} onClick={next}>Continuar <span>→</span></button>
            )}
          </div>
          <p className="quiz-disclaimer">Suas respostas são usadas apenas para esta avaliação informativa. O teste não representa uma análise ou decisão oficial do Governo Federal.</p>
        </div>
      </section>
    </main>
  );
}

function ProcessingScreen() {
  return (
    <main className="processing-screen">
      <div className="processing-card">
        <div className="processing-spinner" />
        <p className="quiz-eyebrow">FINALIZANDO</p>
        <h1>Analisando suas respostas...</h1>
        <div className="processing-steps"><span>✓ Conferindo suas respostas</span><span>✓ Identificando pontos de atenção</span><span>• Preparando sua avaliação</span></div>
      </div>
    </main>
  );
}
