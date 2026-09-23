import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { saveQuizAnswer, saveQuizSummary, startQuizSession, trackEvent } from "../lib/supabase";

type Answer = { questionId: number; value: string };
type Question = { id: number; tag: string; title: string; subtitle?: string; options: string[] };

const questions: Question[] = [
  {
    id: 1,
    tag: "SITUAÇÃO 01",
    title: "Você tem certeza de que o seu cadastro ainda retrata exatamente a realidade da sua família?",
    subtitle: "Pense no que mudou desde a última atualização: renda, trabalho, endereço ou quem mora com você.",
    options: ["Não tenho certeza", "Mudou alguma coisa", "Sim, está exatamente igual", "Nunca conferi"],
  },
  {
    id: 2,
    tag: "SITUAÇÃO 02",
    title: "Alguém da família começou ou parou de trabalhar — ou a renda mudou — e você conferiu isso no cadastro?",
    subtitle: 'Se a resposta não for um "sim" com certeza, vale prestar atenção neste ponto.',
    options: ["Não conferi", "Não tenho certeza", "Sim, conferi", "Não aconteceu"],
  },
  {
    id: 3,
    tag: "SITUAÇÃO 03",
    title: "Entrou ou saiu alguém da família e você sabe se essa mudança foi informada corretamente?",
    subtitle: "Composição familiar também faz parte das informações registradas no Cadastro Único.",
    options: ["Não sei se foi informado", "Sim, foi informado", "Não aconteceu", "Nunca conferi"],
  },
  {
    id: 4,
    tag: "SITUAÇÃO 04",
    title: "Seu endereço ou telefone mudou e você tem certeza de que o cadastro continua com os dados certos?",
    subtitle: "Uma mudança pode acontecer no dia a dia e o cadastro continuar com a informação anterior.",
    options: ["Não tenho certeza", "Mudei e não conferi", "Sim, está atualizado", "Não mudou"],
  },
  {
    id: 5,
    tag: "SITUAÇÃO 05",
    title: "Você sabe quando foi a última vez que o seu Cadastro Único foi atualizado?",
    subtitle: "A atualização deve ocorrer a cada 24 meses e também quando há mudanças relevantes na família.",
    options: ["Não lembro", "Acho que faz mais de 2 anos", "Sei a data e está dentro do prazo", "Não sei"],
  },
  {
    id: 6,
    tag: "SITUAÇÃO 06",
    title: "Você saberia se existe alguma diferença entre o que foi declarado no cadastro e uma informação em outra base oficial?",
    subtitle: "O Governo realiza cruzamentos de informações para identificar possíveis divergências cadastrais.",
    options: ["Não saberia", "Nunca conferi", "Sim, saberia", "Não tenho certeza"],
  },
  {
    id: 7,
    tag: "SITUAÇÃO 07",
    title: "Se você recebesse uma convocação para atualizar ou verificar o cadastro, saberia exatamente o que fazer?",
    subtitle: "Famílias podem ser chamadas quando é necessário atualizar dados ou tratar possíveis inconsistências.",
    options: ["Não saberia", "Não tenho certeza", "Sim, saberia", "Nunca passei por isso"],
  },
  {
    id: 8,
    tag: "ÚLTIMA PERGUNTA",
    title: "Agora seja sincero: você consegue apontar algum ponto do seu cadastro que merece ser conferido?",
    subtitle: "Suas respostas vão mostrar quais situações merecem mais atenção na sua avaliação.",
    options: ["Não faço ideia", "Tenho algumas dúvidas", "Sim, sei qual é", "Acho que está tudo certo"],
  },
];

export const Route = createFileRoute("/quiz")({ component: QuizPage });

function readStep() {
  if (typeof window === "undefined") return 1;
  const value = Number(new URLSearchParams(window.location.search).get("step") || "1");
  return Number.isFinite(value) ? Math.min(Math.max(Math.trunc(value), 1), questions.length) : 1;
}

function readAnswers(): Answer[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(sessionStorage.getItem("blindaQuizAnswers") || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function QuizPage() {
  const [current, setCurrent] = useState(() => readStep() - 1);
  const [answers, setAnswers] = useState<Answer[]>(readAnswers);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    void startQuizSession();
    void trackEvent("quiz_started");
  }, []);

  useEffect(() => {
    const onPopState = () => setCurrent(readStep() - 1);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const question = questions[current];
  const selected = answers.find((answer) => answer.questionId === question.id)?.value;
  const progress = ((current + 1) / questions.length) * 100;

  const goToStep = (nextIndex: number, replace = false) => {
    const step = nextIndex + 1;
    const url = "/quiz?step=" + step;
    if (replace) window.history.replaceState({}, "", url);
    else window.history.pushState({}, "", url);
    setCurrent(nextIndex);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const answer = async (value: string) => {
    if (processing) return;

    const next = [
      ...answers.filter((item) => item.questionId !== question.id),
      { questionId: question.id, value },
    ];

    setAnswers(next);
    sessionStorage.setItem("blindaQuizAnswers", JSON.stringify(next));

    const isLastQuestion = current === questions.length - 1;
    if (isLastQuestion) {
      setProcessing(true);
      await Promise.all([
        saveQuizAnswer(question.id, value, true),
        trackEvent("quiz_answered", { question_id: question.id }),
        saveQuizSummary(next, []),
        new Promise((resolve) => setTimeout(resolve, 4500)),
      ]);
    } else {
      void saveQuizAnswer(question.id, value, false);
      void trackEvent("quiz_answered", { question_id: question.id });
    }

    if (isLastQuestion) {
      window.location.assign("/resultado");
      return;
    }

    goToStep(current + 1);
  };

  const back = () => {
    if (processing) return;
    if (current === 0) {
      window.history.pushState({}, "", "/");
      window.location.assign("/");
      return;
    }
    goToStep(current - 1);
  };

  if (processing) return <ProcessingScreen />;

  return (
    <main className="quiz-v3">
      <header className="quiz-v3-header">
        <Link to="/" className="quiz-v3-brand">
          <span>✓</span>
          <strong>BLINDA BOLSA FAMÍLIA</strong>
        </Link>
        <div><i /> AVALIAÇÃO GRATUITA</div>
      </header>

      <section className="quiz-v3-main">
        <div className="quiz-v3-container">
          <div className="quiz-v3-top">
            <button type="button" onClick={back}>← Voltar</button>
            <span>{current + 1} / {questions.length}</span>
          </div>

          <div className="quiz-v3-progress"><span style={{ width: `${progress}%` }} /></div>

          <div className="quiz-v3-intro">
            <span>ATENÇÃO: RESPONDA SEM CHUTAR</span>
            <h1>Você pode descobrir pontos que nunca parou para conferir.</h1>
            <p>Responda com o que você realmente sabe. Quando você não tiver certeza, marque isso.</p>
          </div>

          <div className="quiz-v3-card">
            <div className="quiz-v3-number">{String(current + 1).padStart(2, "0")}</div>
            <div className="quiz-v3-tag">{question.tag}</div>
            <h2>{question.title}</h2>
            {question.subtitle && <p className="quiz-v3-subtitle">{question.subtitle}</p>}

            <div className="quiz-v3-options">
              {question.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={selected === option ? "selected" : ""}
                  onClick={() => void answer(option)}
                  aria-pressed={selected === option}
                >
                  <span className="quiz-v3-radio">{selected === option ? "✓" : ""}</span>
                  <span>{option}</span>
                  <b>→</b>
                </button>
              ))}
            </div>
          </div>

          <div className="quiz-v3-foot">
            <span>✓</span> Não pedimos CPF, senha, cartão ou dados bancários.
          </div>
        </div>
      </section>
    </main>
  );
}

function ProcessingScreen() {
  return (
    <main className="quiz-v3-processing">
      <div className="quiz-v3-processing-card">
        <div className="quiz-v3-spinner" />
        <span>ANALISANDO SUAS RESPOSTAS</span>
        <h1>Preparando sua avaliação.</h1>
        <p>Suas respostas foram registradas.</p>
      </div>
    </main>
  );
}
