import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

function QuizPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(() => {
    if (typeof window === "undefined") return 0;
    const step = Number(new URLSearchParams(window.location.search).get("step") || "1");
    return Math.min(Math.max(step - 1, 0), questions.length - 1);
  });
  const [answers, setAnswers] = useState<Answer[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(sessionStorage.getItem("blindaQuizAnswers") || "[]");
    } catch {
      return [];
    }
  });
  const [processing, setProcessing] = useState(false);\n  const [transitioning, setTransitioning] = useState(false);\n\n  useEffect(() => {\n    setTransitioning(false);\n  }, [current]);

  const question = questions[current];
  const selected = answers.find((answer) => answer.questionId === question.id)?.value;
  const progress = ((current + 1) / questions.length) * 100;

  const answer = (value: string) => {
    const next = [...answers.filter((item) => item.questionId !== question.id), { questionId: question.id, value }];
    sessionStorage.setItem("blindaQuizAnswers", JSON.stringify(next));

    if (current === questions.length - 1) {
      finish(next);
      return;
    }

    window.location.assign("/quiz?step=" + (current + 2));
  };

  const finish = (finalAnswers: Answer[]) => {
    setProcessing(true);
    sessionStorage.setItem("blindaQuizAnswers", JSON.stringify(finalAnswers));
    window.setTimeout(() => navigate({ to: "/resultado" }), 1500);
  };

  const back = () => {
    if (current === 0) return navigate({ to: "/" });
    setTransitioning(true);
    window.history.pushState({}, "", "/quiz?step=" + current);
    requestAnimationFrame(() => {
      setCurrent((number) => number - 1);
    });
  };

  if (processing) return <ProcessingScreen />;

  return (
    <main className={"quiz-v3" + (transitioning ? " quiz-v3-transitioning" : "")}>
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
            <span>ATENÇÃO: RESPONDA SEM CHUTAR</span>
            <h1>Você pode descobrir pontos que nunca parou para conferir.</h1>
            <p>Responda com o que você realmente sabe. Quando você não tiver certeza, marque isso.</p>
          </div>

          <div className="quiz-v3-card">
            <div className="quiz-v3-number">0{current + 1}</div>
            <div className="quiz-v3-tag">{question.tag}</div>
            <h2>{question.title}</h2>
            {question.subtitle && <p className="quiz-v3-subtitle">{question.subtitle}</p>}

            <div className="quiz-v3-options">
              {question.options.map((option) => (
                <button
                  type="button"
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
        <h1>Separando os pontos que você marcou para conferir.</h1>
        <p>Estamos organizando sua avaliação com base nas respostas que você acabou de dar.</p>
        <div><b>✓</b> Respostas registradas</div>
        <div><b>✓</b> Pontos de atenção identificados</div>
        <div><b>•</b> Preparando seu resultado</div>
      </div>
    </main>
  );
}
