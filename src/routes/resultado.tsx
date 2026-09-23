import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

type Answer = { questionId: number; value: string; detail?: string[] };

export const Route = createFileRoute("/resultado")({ component: ResultPage });

function ResultPage() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("blindaQuizAnswers");
      if (raw) setAnswers(JSON.parse(raw));
    } finally {
      setReady(true);
    }
  }, []);

  const attentionPoints = useMemo(() => {
    const points: string[] = [];
    const get = (id: number) => answers.find((a) => a.questionId === id)?.value;
    if (get(2) === "Há mais de 2 anos" || get(2) === "Não lembro" || get(2) === "Não sei") points.push("Confira quando seu Cadastro Único foi atualizado.");
    if (get(3) === "Sim" || get(3) === "Não tenho certeza") points.push("Vale conferir se mudanças na composição ou endereço da família estão atualizadas.");
    if (get(4) === "Sim" && (answers.find(a => a.questionId === 4)?.detail?.[0] === "Não" || answers.find(a => a.questionId === 4)?.detail?.[0] === "Não tenho certeza")) points.push("Confira os acompanhamentos aplicáveis para crianças e adolescentes.");
    if (get(5) === "Sim" && (answers.find(a => a.questionId === 5)?.detail?.[0] === "Não" || answers.find(a => a.questionId === 5)?.detail?.[0] === "Não tenho certeza")) points.push("Confira os acompanhamentos de saúde aplicáveis.");
    if (get(7) === "Quase nunca" || get(7) === "Não sei onde consultar") points.push("Procure acompanhar mensagens e informações oficiais relacionadas ao benefício.");
    if (get(8) === "Mais ou menos" || get(8) === "Não") points.push("Pode ser útil saber onde buscar orientação oficial caso apareça uma pendência.");
    return points;
  }, [answers]);

  if (!ready) return <main className="result-loading"><div className="processing-spinner" /></main>;

  const hasAnswers = answers.length > 0;

  return (
    <main className="result-page">
      <header className="quiz-header result-header">
        <Link to="/" className="quiz-brand"><span className="quiz-brand-mark">✓</span><strong>BLINDA BOLSA FAMÍLIA</strong></Link>
        <span className="quiz-safe">AVALIAÇÃO INFORMATIVA</span>
      </header>

      <section className="result-main">
        <div className="result-container">
          <div className="result-hero">
            <div className="result-check">✓</div>
            <p className="quiz-eyebrow">AVALIAÇÃO CONCLUÍDA</p>
            <h1>{hasAnswers ? "Existem pontos que vale a pena conferir." : "Faça o teste para ver sua avaliação."}</h1>
            <p>{hasAnswers ? "Com base nas respostas que você forneceu, identificamos alguns pontos que podem merecer uma conferência. Isso não significa que exista um problema com seu benefício." : "Responda às perguntas rápidas para receber uma avaliação informativa baseada nas suas respostas."}</p>
          </div>

          {hasAnswers && (
            <div className="result-panel">
              <div className="result-panel-head"><span>SEUS PONTOS DE ATENÇÃO</span><b>{attentionPoints.length}</b></div>
              {attentionPoints.length > 0 ? (
                <div className="attention-list">
                  {attentionPoints.map((point, index) => <div className="attention-item" key={point}><span>{String(index + 1).padStart(2, "0")}</span><p>{point}</p></div>)}
                </div>
              ) : (
                <div className="clear-result"><span>✓</span><div><strong>Nenhum ponto de atenção identificado pelas respostas.</strong><p>O resultado é informativo e não substitui a consulta aos canais oficiais.</p></div></div>
              )}
            </div>
          )}

          <div className="result-actions">
            {hasAnswers ? <Link to="/" className="result-secondary">← Voltar ao início</Link> : <Link to="/quiz" className="result-primary">FAZER O TESTE <span>→</span></Link>}
          </div>

          <div className="result-notice"><span>i</span><p>Esta avaliação é informativa e baseada exclusivamente nas respostas fornecidas. Ela não representa uma decisão, consulta cadastral ou análise oficial do Governo Federal. Para confirmar sua situação, utilize os canais oficiais do programa.</p></div>
        </div>
      </section>
    </main>
  );
}
