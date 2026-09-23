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

    if (get(1) === "Não tenho certeza" || get(1) === "Não faço ideia") {
      points.push("Você não tem certeza se saberia identificar uma possível divergência cadastral.");
    }
    if (get(2) === "Aconteceu e não sei se atualizei" || get(2) === "Aconteceu e ainda não atualizei" || get(2) === "Não tenho certeza") {
      points.push("Existe uma mudança de renda ou trabalho que vale conferir no Cadastro Único.");
    }
    if (get(3) === "Aconteceu, mas não sei se foi informado" || get(3) === "Aconteceu e não foi informado" || get(3) === "Não tenho certeza") {
      points.push("Vale conferir se a composição atual da família está refletida no cadastro.");
    }
    if (get(4) === "Mudei e não sei se atualizei" || get(4) === "Não tenho certeza") {
      points.push("Vale conferir se endereço e outras informações importantes estão atualizados.");
    }
    if (get(5) === "Sim, há mais de 2 anos" || get(5) === "Não lembro" || get(5) === "Não sei") {
      points.push("Você não conseguiu confirmar quando o Cadastro Único foi atualizado pela última vez.");
    }
    if (get(6) === "Mais ou menos" || get(6) === "Não saberia") {
      points.push("Você ainda não tem clareza sobre o que fazer diante de uma possível divergência.");
    }
    if (get(7) === "Talvez" || get(7) === "Não saberia" || get(7) === "Quase nunca verifico") {
      points.push("Vale aprender a reconhecer e conferir avisos relacionados ao benefício.");
    }
    if (get(8) === "Acho que sim" || get(8) === "Não tenho certeza" || get(8) === "Não faço ideia") {
      points.push("Você não tem certeza se conseguiria identificar um ponto que precisasse de atenção hoje.");
    }

    return points.slice(0, 6);
  }, [answers]);

  if (!ready) return <main className="result-loading"><div className="processing-spinner" /></main>;

  const hasAnswers = answers.length > 0;
  const count = attentionPoints.length;

  return (
    <main className="result-page">
      <header className="quiz-header result-header">
        <Link to="/" className="quiz-brand">
          <span className="quiz-brand-mark">✓</span>
          <strong>BLINDA BOLSA FAMÍLIA</strong>
        </Link>
        <span className="quiz-safe">AVALIAÇÃO INFORMATIVA</span>
      </header>

      <section className="result-main">
        <div className="result-container">
          {hasAnswers ? (
            <>
              <section className="result-hero result-hero-sales">
                <div className="result-status"><span>●</span> AVALIAÇÃO CONCLUÍDA</div>
                <h1>{count > 0 ? `Encontramos ${count} ponto${count === 1 ? "" : "s"} que vale a pena conferir.` : "Sua avaliação está pronta."}</h1>
                <p className="result-lead">
                  O seu resultado não significa que existe um problema ou que você perderá o benefício.
                  Significa que existem informações que podem merecer uma conferência.
                </p>
                <div className="result-alert">
                  <strong>O ponto mais importante:</strong>
                  <span>você não precisa esperar uma convocação ou descobrir uma divergência para começar a conferir.</span>
                </div>
              </section>

              <section className="result-panel">
                <div className="result-panel-head">
                  <div>
                    <span>O QUE APARECEU NA SUA AVALIAÇÃO</span>
                    <small>Baseado exclusivamente nas suas respostas</small>
                  </div>
                  <b>{count}</b>
                </div>

                {count > 0 ? (
                  <div className="attention-list">
                    {attentionPoints.map((point, index) => (
                      <div className="attention-item" key={point}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="clear-result">
                    <span>✓</span>
                    <div>
                      <strong>Nenhum ponto de atenção foi identificado pelas suas respostas.</strong>
                      <p>Mesmo assim, o resultado é informativo e não consulta o seu cadastro oficial.</p>
                    </div>
                  </div>
                )}
              </section>

              <section className="sales-transition">
                <p className="offer-label">E AGORA?</p>
                <h2>Você descobriu <em>o que merece atenção.</em> Mas saber onde conferir é outra coisa.</h2>
                <p>
                  É aqui que entra o Blinda Bolsa Família: um material prático para ajudar você a organizar
                  os principais pontos, entender o que observar e saber onde confirmar cada informação nos canais oficiais.
                </p>
              </section>

              <section className="vsl-card vsl-card-premium">
                <div className="vsl-screen vsl-screen-premium">
                  <div className="vsl-topbar"><span>BLINDA BOLSA FAMÍLIA</span><span>APRESENTAÇÃO</span></div>
                  <div className="vsl-center">
                    <div className="vsl-play">▶</div>
                    <span>ASSISTA ANTES DE CONTINUAR</span>
                    <strong>O que você precisa conferir<br />antes de deixar para depois</strong>
                    <small>Apresentação rápida • conteúdo informativo</small>
                  </div>
                  <div className="vsl-bottom"><span>▶</span><div className="vsl-track"><i /></div><span>2:18</span></div>
                </div>

                <div className="vsl-copy vsl-copy-premium">
                  <p className="vsl-kicker">NESTA APRESENTAÇÃO</p>
                  <h3>Você vai entender o que realmente merece atenção.</h3>
                  <ul>
                    <li><span>✓</span><div><strong>O que conferir</strong><small>Os principais pontos que podem passar despercebidos.</small></div></li>
                    <li><span>✓</span><div><strong>O que muda quando há divergência</strong><small>Como entender uma possível convocação ou necessidade de atualização.</small></div></li>
                    <li><span>✓</span><div><strong>Onde confirmar</strong><small>Como procurar a informação correta nos canais oficiais.</small></div></li>
                  </ul>
                </div>
              </section>

              <section className="offer-section offer-section-premium">
                <div className="offer-label">ACESSO IMEDIATO</div>
                <h2>Tenha um checklist para não depender da memória.</h2>
                <p className="offer-intro">
                  O material organiza os pontos que você deve conferir e transforma aquela dúvida
                  de “será que está tudo certo?” em uma sequência clara do que observar e onde confirmar.
                </p>

                <div className="offer-benefits">
                  <div><span>01</span><strong>Checklist de conferência</strong><p>Organize os principais dados que merecem atenção.</p></div>
                  <div><span>02</span><strong>Guia de verificação</strong><p>Entenda o que observar em cada situação.</p></div>
                  <div><span>03</span><strong>Canais oficiais</strong><p>Saiba onde buscar confirmação da sua situação.</p></div>
                </div>

                <div className="offer-box offer-box-premium">
                  <div>
                    <span className="offer-mini">ACESSO AO MATERIAL</span>
                    <div className="offer-price"><small>R$</small> 12,49</div>
                    <p>Pagamento único.</p>
                  </div>
                  <button className="offer-button" onClick={() => alert("Configure aqui o link do checkout antes de publicar.")}>
                    QUERO CONFERIR <span>→</span>
                  </button>
                </div>

                <div className="guarantee-box">
                  <span>✓</span>
                  <div><strong>Compra consciente</strong><p>O material é independente e informativo. Ele não substitui consulta, decisão ou orientação dos canais oficiais.</p></div>
                </div>
              </section>

              <section className="final-cta">
                <p>Não precisa descobrir tudo sozinho.</p>
                <h2>Organize o que conferir. Depois, confirme nos canais oficiais.</h2>
                <button className="offer-button" onClick={() => alert("Configure aqui o link do checkout antes de publicar.")}>
                  QUERO ACESSAR O MATERIAL <span>→</span>
                </button>
              </section>
            </>
          ) : (
            <div className="result-hero">
              <div className="result-check">✓</div>
              <p className="quiz-eyebrow">AVALIAÇÃO</p>
              <h1>Faça o teste para receber sua avaliação.</h1>
              <p>Responda às perguntas rápidas para receber uma avaliação informativa baseada nas suas respostas.</p>
              <Link to="/quiz" className="result-primary">FAZER O TESTE <span>→</span></Link>
            </div>
          )}

          <div className="result-notice">
            <span>i</span>
            <p>
              Esta página é independente e informativa. O teste não consulta o Cadastro Único nem determina
              bloqueio ou cancelamento. Para confirmar sua situação, use os canais oficiais do Governo Federal.
              Não informe CPF, senha, número do cartão ou dados bancários.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
