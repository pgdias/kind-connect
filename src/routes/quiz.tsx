import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type Answer = { questionId: number; value: string };
type Question = { id: number; tag: string; title: string; subtitle?: string; options: string[] };

const questions: Question[] = [
  {
    id: 1,
    tag: "SITUAÇÃO 01",
    title: "Nos últimos meses, alguma coisa mudou na vida da sua família?",
    subtitle: "Pode ser algo que parece pequeno no dia a dia.",
    options: ["Sim, mudou alguma coisa", "Não mudou nada", "Não tenho certeza"],
  },
  {
    id: 2,
    tag: "SITUAÇÃO 02",
    title: "Alguém da família começou ou deixou de trabalhar recentemente?",
    subtitle: "E você sabe se a informação do cadastro acompanha essa mudança?",
    options: ["Sim, e está tudo atualizado", "Sim, mas não sei se atualizei", "Não aconteceu", "Não tenho certeza"],
  },
  {
    id: 3,
    tag: "SITUAÇÃO 03",
    title: "Entrou ou saiu alguém da família desde a última atualização?",
    subtitle: "Uma mudança na composição familiar é uma das coisas que vale conferir.",
    options: ["Sim, e foi informado", "Sim, mas não sei se foi informado", "Não aconteceu", "Não tenho certeza"],
  },
  {
    id: 4,
    tag: "SITUAÇÃO 04",
    title: "Você mudou de endereço ou telefone e sabe se o cadastro continua com os dados corretos?",
    subtitle: "É fácil resolver a mudança e esquecer de conferir o cadastro depois.",
    options: ["Está tudo certo", "Mudei e atualizei", "Mudei, mas não sei se atualizei", "Não aconteceu", "Não tenho certeza"],
  },
  {
    id: 5,
    tag: "SITUAÇÃO 05",
    title: "Você lembra quando foi a última vez que atualizou o Cadastro Único?",
    subtitle: "A atualização deve ocorrer a cada 24 meses e também quando há mudanças relevantes.",
    options: ["Sim, há menos de 2 anos", "Sim, há mais de 2 anos", "Não lembro", "Não sei"],
  },
  {
    id: 6,
    tag: "SITUAÇÃO 06",
    title: "Se existisse uma diferença entre o que está no cadastro e outra base oficial, você saberia que isso poderia precisar de atenção?",
    subtitle: "Existem processos oficiais que cruzam informações para identificar possíveis divergências.",
    options: ["Sim", "Mais ou menos", "Não saberia", "Nunca pensei nisso"],
  },
  {
    id: 7,
    tag: "SITUAÇÃO 07",
    title: "Se sua família recebesse um aviso para regularizar alguma informação, você saberia o que fazer?",
    subtitle: "Famílias podem ser convocadas para atualizar ou verificar informações.",
    options: ["Saberia", "Talvez", "Não saberia", "Nunca recebi um aviso assim"],
  },
  {
    id: 8,
    tag: "ÚLTIMA PERGUNTA",
    title: "Se hoje existisse um ponto da sua situação que merecesse ser conferido, você saberia qual é?",
    subtitle: "Esta avaliação vai organizar suas respostas para mostrar onde vale olhar com mais cuidado.",
    options: ["Tenho certeza que sim", "Provavelmente", "Não tenho certeza", "Não faço ideia"],
  },
];

export const Route = createFileRoute("/quiz")({ component: QuizPage });

function QuizPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [processing, setProcessing] = useState(false);

  const question = questions[current];
  const selected = answers.find((answer) => answer.questionId === question.id)?.value;
  const progress = ((current + 1) / questions.length) * 100;

  const answer = (value: string) => {
    const next = [...answers.filter((item) => item.questionId !== question.id), { questionId: question.id, value }];
    setAnswers(next);

    window.setTimeout(() => {
      if (current === questions.length - 1) finish(next);
      else setCurrent((number) => number + 1);
    }, 360);
  };

  const finish = (finalAnswers: Answer[]) => {
    setProcessing(true);
    sessionStorage.setItem("blindaQuizAnswers", JSON.stringify(finalAnswers));
    window.setTimeout(() => navigate({ to: "/resultado" }), 1500);
  };

  const back = () => {
    if (current === 0) return navigate({ to: "/" });
    setCurrent((number) => number - 1);
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
            <button onClick={back}>← Voltar</button>
            <span>{current + 1} / {questions.length}</span>
          </div>

          <div className="quiz-v3-progress"><span style={{ width: `${progress}%` }} /></div>

          <div className="quiz-v3-intro">
            <span>RESPONDA COM O QUE VOCÊ SABE AGORA</span>
            <h1>Vamos descobrir o que vale a pena conferir.</h1>
            <p>Não existe resposta “certa”. O objetivo é identificar situações que podem ter passado despercebidas.</p>
          </div>

          <div className="quiz-v3-card">
            <div className="quiz-v3-number">0{current + 1}</div>
            <div className="quiz-v3-tag">{question.tag}</div>
            <h2>{question.title}</h2>
            {question.subtitle && <p className="quiz-v3-subtitle">{question.subtitle}</p>}

            <div className="quiz-v3-options">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={selected === option ? "selected" : ""}
                  onClick={() => answer(option)}
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
        <h1>Organizando os pontos que merecem sua atenção.</h1>
        <p>Estamos preparando sua avaliação com base no que você respondeu.</p>
        <div><b>✓</b> Respostas registradas</div>
        <div><b>✓</b> Pontos de atenção identificados</div>
        <div><b>•</b> Preparando seu resultado</div>
      </div>
    </main>
  );
}
