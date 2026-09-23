import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type Answer = { questionId: number; value: string; detail?: string[] };
type Question = { id: number; title: string; subtitle: string; options: string[] };

const questions: Question[] = [
  {
    id: 1,
    title: "Você recebe o Bolsa Família atualmente?",
    subtitle: "Responda de acordo com a sua situação hoje.",
    options: ["Sim, recebo normalmente", "Sim, mas existe bloqueio ou pendência", "Recebo, mas não sei se está tudo certo", "Não tenho certeza"],
  },
  {
    id: 2,
    title: "Você sabe quando seu Cadastro Único foi atualizado pela última vez?",
    subtitle: "A atualização deve ocorrer a cada 24 meses e também quando houver mudanças relevantes na família.",
    options: ["Há menos de 2 anos", "Há mais de 2 anos", "Não lembro", "Não sei"],
  },
  {
    id: 3,
    title: "Alguma coisa mudou na sua família desde a última atualização?",
    subtitle: "Pense em renda, trabalho, endereço e composição familiar.",
    options: ["Sim", "Não", "Não tenho certeza"],
  },
  {
    id: 4,
    title: "Na sua família existe alguma criança ou adolescente?",
    subtitle: "Essa resposta ajuda a verificar os pontos de acompanhamento relacionados à educação.",
    options: ["Sim", "Não", "Não tenho certeza"],
  },
  {
    id: 5,
    title: "Na sua família existe criança pequena ou pessoa gestante?",
    subtitle: "Essa resposta ajuda a verificar os pontos de acompanhamento relacionados à saúde.",
    options: ["Sim", "Não", "Não tenho certeza"],
  },
  {
    id: 6,
    title: "Alguém da sua família começou a trabalhar ou teve mudança de renda recentemente?",
    subtitle: "Mudanças de renda devem ser informadas no Cadastro Único quando ocorrerem.",
    options: ["Sim", "Não", "Não tenho certeza"],
  },
  {
    id: 7,
    title: "Você costuma conferir mensagens e informações relacionadas ao seu benefício?",
    subtitle: "Acompanhar as informações pode ajudar você a perceber quando existe algo que precisa ser verificado.",
    options: ["Sim, sempre", "Às vezes", "Quase nunca", "Não sei onde consultar"],
  },
  {
    id: 8,
    title: "Se aparecesse uma pendência relacionada ao seu Bolsa Família, você saberia o que fazer?",
    subtitle: "Queremos identificar se você sabe onde buscar orientação.",
    options: ["Sim", "Mais ou menos", "Não"],
  },
];

const familyChanges = [
  "Alguém começou a trabalhar",
  "Alguém deixou de trabalhar",
  "Entrou uma pessoa na família",
  "Saiu uma pessoa da família",
  "Mudamos de endereço",
  "Mudou a escola de alguém",
  "Outra mudança",
];

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
  const needsDetail = (current === 2 || current === 3 || current === 4) && selected === "Sim";

  const updateAnswer = (value: string) => {
    const nextAnswers = [
      ...answers.filter((answer) => answer.questionId !== question.id),
      { questionId: question.id, value },
    ];
    setAnswers(nextAnswers);
    setDetails([]);

    const autoAdvance = current === 0 || current === 1 || current === 6 || current === 7;
    if (autoAdvance) {
      window.setTimeout(() => {
        if (current === questions.length - 1) finish(nextAnswers);
        else setCurrent((n) => n + 1);
      }, 450);
    }
  };

  const toggleDetail = (value: string) => {
    if (current === 2) {
      setDetails((prev) => prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]);
    } else {
      setDetails([value]);
    }
  };

  const continueQuestion = () => {
    if (!selected || (needsDetail && details.length === 0)) return;

    const nextAnswers = answers.map((answer) =>
      answer.questionId === question.id ? { ...answer, detail: details } : answer
    );

    setAnswers(nextAnswers);
    if (current === questions.length - 1) {
      finish(nextAnswers);
      return;
    }

    setCurrent((n) => n + 1);
    setDetails([]);
  };

  const finish = (finalAnswers: Answer[]) => {
    setProcessing(true);
    sessionStorage.setItem("blindaQuizAnswers", JSON.stringify(finalAnswers));
    window.setTimeout(() => navigate({ to: "/resultado" }), 1700);
  };

  const back = () => {
    if (current === 0) {
      navigate({ to: "/" });
      return;
    }
    setCurrent((n) => n - 1);
    const previous = answers.find((answer) => answer.questionId === current);
    setDetails(previous?.detail ?? []);
  };

  if (processing) return <ProcessingScreen />;

  return (
    <main className="quiz-shell">
      <header className="quiz-header">
        <Link to="/" className="quiz-brand">
          <span className="quiz-brand-mark">✓</span>
          <strong>BLINDA BOLSA FAMÍLIA</strong>
        </Link>
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
            <p className="quiz-eyebrow">PONTO {current + 1} • RESPONDA COM CALMA</p>
            <h1>{question.title}</h1>
            <p className="quiz-subtitle">{question.subtitle}</p>

            <div className="answer-list">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={`answer-option ${selected === option ? "selected" : ""}`}
                  onClick={() => updateAnswer(option)}
                  aria-pressed={selected === option}
                >
                  <span className="answer-radio">{selected === option ? "✓" : ""}</span>
                  <span>{option}</span>
                  <span className="answer-arrow">→</span>
                </button>
              ))}
            </div>

            {needsDetail && (
              <div className="conditional-box">
                <p>{current === 2 ? "Qual mudança aconteceu? Você pode selecionar mais de uma." : current === 3 ? "Você sabe se os acompanhamentos de educação aplicáveis estão sendo realizados?" : "Você sabe se os acompanhamentos de saúde aplicáveis estão em dia?"}</p>
                <div className="detail-list">
                  {(current === 2 ? familyChanges : yesNoUnsure).map((item) => (
                    <button
                      key={item}
                      className={`detail-option ${details.includes(item) ? "selected" : ""}`}
                      onClick={() => toggleDetail(item)}
                    >
                      <span>{details.includes(item) ? "✓" : "○"}</span>{item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {current === 5 && selected === "Sim" && (
              <div className="educational-note">
                <strong>Importante sobre mudança de renda</strong>
                <p>Ter trabalho ou outra fonte de renda não significa, por si só, perda automática do Bolsa Família. A situação depende das regras vigentes e da composição e renda da família.</p>
              </div>
            )}

            {(current === 2 || current === 3 || current === 4 || current === 5) && (
              <button
                className="quiz-continue"
                disabled={!selected || (needsDetail && details.length === 0)}
                onClick={continueQuestion}
              >
                Continuar <span>→</span>
              </button>
            )}
          </div>

          <p className="quiz-disclaimer">
            Esta avaliação é informativa e não verifica o seu cadastro oficial. Não informe CPF, senha, número do cartão ou dados bancários.
          </p>
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
        <p className="quiz-eyebrow">ÚLTIMA ETAPA</p>
        <h1>Organizando suas respostas...</h1>
        <div className="processing-steps">
          <span>✓ Conferindo as respostas</span>
          <span>✓ Identificando pontos para conferir</span>
          <span>• Preparando sua avaliação</span>
        </div>
      </div>
    </main>
  );
}
