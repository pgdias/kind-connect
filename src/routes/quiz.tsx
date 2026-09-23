import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type Answer = { questionId: number; value: string; detail?: string[] };
type Question = { id: number; tag: string; title: string; subtitle: string; options: string[] };

const questions: Question[] = [
  {
    id: 1,
    tag: "VOCÊ SABERIA?",
    title: "Se o Governo encontrasse uma informação diferente sobre sua família em outra base oficial, você saberia disso?",
    subtitle: "O Cadastro Único pode ser comparado com outras bases administrativas para identificar possíveis divergências.",
    options: ["Sim, eu saberia", "Provavelmente", "Não tenho certeza", "Não faço ideia"],
  },
  {
    id: 2,
    tag: "RENDA",
    title: "Alguém da sua família começou a trabalhar ou teve aumento de renda e o cadastro ainda pode estar com a informação antiga?",
    subtitle: "Mudanças de renda e trabalho estão entre as informações que podem precisar de atualização.",
    options: ["Não, está atualizado", "Aconteceu e não sei se atualizei", "Aconteceu e ainda não atualizei", "Não aconteceu", "Não tenho certeza"],
  },
  {
    id: 3,
    tag: "COMPOSIÇÃO FAMILIAR",
    title: "Entrou ou saiu alguém da sua família desde a última atualização — e você sabe se isso foi informado?",
    subtitle: "Mudanças na composição familiar também podem gerar a necessidade de atualização.",
    options: ["Sim, foi informado", "Aconteceu, mas não sei se foi informado", "Aconteceu e não foi informado", "Não aconteceu", "Não tenho certeza"],
  },
  {
    id: 4,
    tag: "ENDEREÇO E DADOS",
    title: "Você mudou de endereço, telefone ou alguma informação importante e ainda não conferiu se o Cadastro Único está igual?",
    subtitle: "Uma diferença entre a situação atual da família e os dados cadastrados é um ponto que merece ser conferido.",
    options: ["Não, está tudo atualizado", "Mudei e atualizei", "Mudei e não sei se atualizei", "Não aconteceu", "Não tenho certeza"],
  },
  {
    id: 5,
    tag: "ÚLTIMA ATUALIZAÇÃO",
    title: "Você consegue dizer agora quando foi a última vez que sua família atualizou o Cadastro Único?",
    subtitle: "Na Revisão Cadastral de 2026, famílias com dados desatualizados estão sendo chamadas para regularização.",
    options: ["Sim, há menos de 2 anos", "Sim, há mais de 2 anos", "Não lembro", "Não sei"],
  },
  {
    id: 6,
    tag: "SE HOUVER UMA DIVERGÊNCIA",
    title: "Se aparecer uma divergência entre o seu Cadastro Único e outra informação oficial, você saberia o que precisa fazer?",
    subtitle: "Em determinados processos, a família é convocada para verificar e regularizar as informações.",
    options: ["Sim, saberia", "Mais ou menos", "Não saberia"],
  },
  {
    id: 7,
    tag: "CONVOCAÇÃO",
    title: "Você saberia identificar se uma mensagem ou aviso realmente pede que sua família atualize o cadastro?",
    subtitle: "Famílias incluídas em processos de qualificação podem ser previamente convocadas e precisam observar os prazos informados.",
    options: ["Sim, saberia", "Talvez", "Não saberia", "Quase nunca verifico"],
  },
  {
    id: 8,
    tag: "A PERGUNTA FINAL",
    title: "Se hoje existisse um ponto no seu cadastro que precisasse de atenção, você saberia qual é?",
    subtitle: "É justamente isso que esta avaliação vai organizar para você com base nas suas respostas.",
    options: ["Sim, tenho certeza", "Acho que sim", "Não tenho certeza", "Não faço ideia"],
  },
];

const familyChanges = [
  "Alguém começou a trabalhar",
  "Alguém deixou de trabalhar",
  "Entrou uma pessoa na família",
  "Saiu uma pessoa da família",
  "Mudamos de endereço",
  "Mudou o telefone",
  "Outra informação importante mudou",
];

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
  const needsDetail = current === 1 && selected === "Aconteceu e não sei se atualizei";

  const updateAnswer = (value: string) => {
    const nextAnswers = [...answers.filter((a) => a.questionId !== question.id), { questionId: question.id, value }];
    setAnswers(nextAnswers);
    setDetails([]);

    if ([0, 2, 3, 4, 5, 6, 7].includes(current)) {
      window.setTimeout(() => {
        if (current === questions.length - 1) finish(nextAnswers);
        else setCurrent((n) => n + 1);
      }, 500);
    }
  };

  const toggleDetail = (value: string) => {
    setDetails((prev) => prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]);
  };

  const continueQuestion = () => {
    if (!selected || (needsDetail && details.length === 0)) return;
    const nextAnswers = answers.map((a) => a.questionId === question.id ? { ...a, detail: details } : a);
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
    window.setTimeout(() => navigate({ to: "/resultado" }), 1800);
  };

  const back = () => {
    if (current === 0) return navigate({ to: "/" });
    setCurrent((n) => n - 1);
    const previous = answers.find((a) => a.questionId === current);
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
                <p>O que mudou? Selecione o que aconteceu.</p>
                <div className="detail-list">
                  {familyChanges.map((item) => (
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

            {current === 1 && selected && selected !== "Não aconteceu" && (
              <div className="educational-note">
                <strong>Importante</strong>
                <p>Uma mudança de renda não significa automaticamente perda do Bolsa Família. O que importa é a situação da família e as regras aplicáveis.</p>
              </div>
            )}

            {(current === 1) && (
              <button className="quiz-continue" disabled={!selected || (needsDetail && details.length === 0)} onClick={continueQuestion}>
                Continuar <span>→</span>
              </button>
            )}
          </div>

          <p className="quiz-disclaimer">
            Avaliação informativa. O teste não consulta seu cadastro oficial e não determina bloqueio ou cancelamento. Não informe CPF, senha, número do cartão ou dados bancários.
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
        <h1>Agora vamos organizar o que suas respostas indicam que vale conferir.</h1>
        <div className="processing-steps">
          <span>✓ Conferindo suas respostas</span>
          <span>✓ Identificando pontos de atenção</span>
          <span>• Preparando sua avaliação</span>
        </div>
      </div>
    </main>
  );
}
