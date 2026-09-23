import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type Answer = { questionId: number; value: string; detail?: string[] };
type Question = { id: number; title: string; subtitle: string; options: string[]; tag: string };

const questions: Question[] = [
  {
    id: 1,
    tag: "PRIMEIRO PONTO DE ATENÇÃO",
    title: "Se existisse hoje alguma informação no seu cadastro que precisasse ser corrigida, você saberia qual?",
    subtitle: "Antes de continuar, pense na sua situação atual — não no que você lembra de meses atrás.",
    options: ["Sim, tenho certeza", "Acho que sim", "Não tenho certeza", "Não faço ideia"],
  },
  {
    id: 2,
    tag: "CADASTRO",
    title: "Você lembra exatamente quando seu Cadastro Único foi atualizado pela última vez?",
    subtitle: "O cadastro precisa ser atualizado a cada 24 meses e também quando há mudanças relevantes na família.",
    options: ["Sim, foi há menos de 2 anos", "Foi há mais de 2 anos", "Não lembro", "Não sei"],
  },
  {
    id: 3,
    tag: "MUDANÇAS QUE PASSAM DESPERCEBIDAS",
    title: "Desde a última atualização, aconteceu alguma coisa que pode ter mudado as informações da sua família?",
    subtitle: "Pense em trabalho, renda, endereço, pessoas que entraram ou saíram da família e outras mudanças importantes.",
    options: ["Sim", "Não", "Não tenho certeza"],
  },
  {
    id: 4,
    tag: "COMPOSIÇÃO DA FAMÍLIA",
    title: "Você já conferiu se as informações de todas as pessoas da sua família continuam corretas no cadastro?",
    subtitle: "Uma mudança na composição da família também pode ser uma informação que precisa ser atualizada.",
    options: ["Sim, conferi recentemente", "Sim, mas faz bastante tempo", "Não", "Não tenho certeza"],
  },
  {
    id: 5,
    tag: "RENDA E TRABALHO",
    title: "Alguém da sua família começou a trabalhar, mudou de emprego ou passou a ter outra fonte de renda — e você sabe se isso foi atualizado?",
    subtitle: "Mudanças de renda ou trabalho devem ser informadas no Cadastro Único. Isso não significa perda automática do benefício.",
    options: ["Sim, está atualizado", "Aconteceu, mas não sei se atualizei", "Aconteceu e não atualizei", "Não aconteceu", "Não tenho certeza"],
  },
  {
    id: 6,
    tag: "SE FOSSE CONVOCADO",
    title: "Se você fosse convocado para conferir seu Cadastro Único, saberia exatamente o que precisaria verificar?",
    subtitle: "Famílias podem ser convocadas para atualização. O objetivo aqui é descobrir se você sabe quais pontos precisam de atenção.",
    options: ["Sim, saberia", "Mais ou menos", "Não saberia"],
  },
  {
    id: 7,
    tag: "MENSAGENS E AVISOS",
    title: "Você saberia reconhecer uma mensagem oficial dizendo que precisa verificar alguma informação do seu benefício?",
    subtitle: "Acompanhar mensagens do Bolsa Família, Caixa Tem e Cadastro Único ajuda a perceber quando existe algo que precisa ser conferido.",
    options: ["Sim, sei onde conferir", "Talvez", "Não sei", "Quase nunca verifico"],
  },
  {
    id: 8,
    tag: "A PERGUNTA FINAL",
    title: "Se aparecesse hoje uma pendência relacionada ao seu Bolsa Família, você saberia exatamente o que fazer?",
    subtitle: "Esta última resposta mostra o quanto você já sabe sobre o caminho para conferir e regularizar uma possível pendência.",
    options: ["Sim, saberia", "Mais ou menos", "Não saberia"],
  },
];

const familyChanges = [
  "Alguém começou a trabalhar",
  "Alguém deixou de trabalhar",
  "Entrou uma pessoa na família",
  "Saiu uma pessoa da família",
  "Mudamos de endereço",
  "Mudou a escola de alguém",
  "Mudou alguma situação de saúde",
  "Outra mudança",
];

const yesNoUnsure = ["Sim, está sendo acompanhado", "Não", "Não tenho certeza"];

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
  const needsDetail = (current === 2 || current === 3) && selected === "Sim";

  const updateAnswer = (value: string) => {
    const nextAnswers = [
      ...answers.filter((answer) => answer.questionId !== question.id),
      { questionId: question.id, value },
    ];
    setAnswers(nextAnswers);
    setDetails([]);

    const autoAdvance = [0, 1, 5, 6, 7].includes(current);
    if (autoAdvance) {
      window.setTimeout(() => {
        if (current === questions.length - 1) finish(nextAnswers);
        else setCurrent((n) => n + 1);
      }, 500);
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
            <p className="quiz-eyebrow">{question.tag}</p>
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
                <p>{current === 2
                  ? "Qual dessas mudanças aconteceu? Você pode selecionar mais de uma."
                  : "Você sabe se os acompanhamentos de educação aplicáveis estão sendo realizados?"}</p>
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

            {current === 4 && selected && selected !== "Não aconteceu" && (
              <div className="educational-note">
                <strong>Importante</strong>
                <p>Ter trabalho ou outra fonte de renda não significa automaticamente perder o Bolsa Família. A situação depende das regras vigentes, da renda por pessoa e da composição familiar.</p>
              </div>
            )}

            {(current === 2 || current === 3 || current === 4) && (
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
            Avaliação informativa. Não verifica seu cadastro oficial e não substitui os canais do Governo Federal. Não informe CPF, senha, número do cartão ou dados bancários.
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
        <h1>Você respondeu. Agora vamos organizar os pontos para conferir.</h1>
        <div className="processing-steps">
          <span>✓ Conferindo suas respostas</span>
          <span>✓ Identificando pontos de atenção</span>
          <span>• Preparando sua avaliação</span>
        </div>
      </div>
    </main>
  );
}
