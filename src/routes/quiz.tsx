import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { recordQuizCompletion, saveQuizAnswer, saveQuizSummary, startQuizSession, trackEvent } from "../lib/api";
import { trackKwaiEvent } from "../lib/kwai-pixel";

type Answer = { questionId: number; value: string };
type Question = { id: number; tag: string; title: string; subtitle?: string; options: string[] };

const QUIZ_VERSION_KEY = "blindaQuizVersion";
const QUIZ_VERSION = "2";
const ANSWERS_KEY = "blindaQuizAnswers";

const questions: Question[] = [
  {
    id: 1,
    tag: "PERGUNTA 01",
    title: "Você sabe se o seu Cadastro Único foi atualizado nos últimos 24 meses?",
    subtitle: "Também é importante atualizar os dados quando houver mudanças relevantes na família.",
    options: ["Sim, tenho certeza", "Não sei quando foi", "Faz mais de 24 meses", "Preciso conferir"],
  },
  {
    id: 2,
    tag: "PERGUNTA 02",
    title: "A renda ou a situação de trabalho de alguém da família mudou recentemente?",
    subtitle: "Por exemplo: alguém começou ou parou de trabalhar, ou a renda aumentou ou diminuiu.",
    options: ["Sim, e ainda não conferi", "Sim, e já conferi", "Não mudou", "Não tenho certeza"],
  },
  {
    id: 3,
    tag: "PERGUNTA 03",
    title: "Mudou quem mora com você, seu endereço ou telefone desde a última atualização?",
    subtitle: "Mudanças na composição familiar e nos dados de contato também merecem ser conferidas.",
    options: ["Sim, e ainda não atualizei", "Sim, e já atualizei", "Não houve mudanças", "Não tenho certeza"],
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
    if (window.sessionStorage.getItem(QUIZ_VERSION_KEY) !== QUIZ_VERSION) {
      window.sessionStorage.removeItem(ANSWERS_KEY);
      window.sessionStorage.setItem(QUIZ_VERSION_KEY, QUIZ_VERSION);
      return [];
    }
    const parsed = JSON.parse(window.sessionStorage.getItem(ANSWERS_KEY) || "[]");
    return Array.isArray(parsed)
      ? parsed.filter((answer): answer is Answer =>
          answer && [1, 2, 3].includes(answer.questionId) && typeof answer.value === "string")
      : [];
  } catch {
    return [];
  }
}

function QuizPage() {
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [processing, setProcessing] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setCurrent(readStep() - 1);
    setAnswers(readAnswers());
    void startQuizSession();
    void trackEvent("quiz_started");
  }, []);

  useEffect(() => {
    const onPopState = () => setCurrent(readStep() - 1);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  if (!hydrated) return <div className="quiz-loading">Carregando...</div>;

  const question = questions[current];
  if (!question) return <div className="quiz-loading">Carregando...</div>;
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
    window.sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(next));

    const isLastQuestion = current === questions.length - 1;
    if (isLastQuestion) {
      setProcessing(true);

      await saveQuizAnswer(question.id, value, true);
      await trackEvent("quiz_answered", { question_id: question.id });

      let completed = await recordQuizCompletion();
      if (!completed) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        completed = await recordQuizCompletion();
      }

      await saveQuizSummary(next, []);
      trackKwaiEvent("formSubmit");
      await new Promise((resolve) => setTimeout(resolve, 4500));
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
            <span>AVALIAÇÃO RÁPIDA</span>
            <h1>São apenas 3 perguntas rápidas.</h1>
            <p>Responda com sinceridade para identificar quais informações do seu cadastro vale a pena conferir.</p>
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
