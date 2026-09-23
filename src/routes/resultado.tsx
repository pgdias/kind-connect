import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

type Answer = { questionId: number; value: string; detail?: string[] };

const CHECKOUT_URL = "https://pay.cakto.com.br/38xq22v_1131074";

export const Route = createFileRoute("/resultado")({ component: ResultPage });

function ResultPage() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [ready, setReady] = useState(false);
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("blindaQuizAnswers");
      if (raw) setAnswers(JSON.parse(raw));
    } finally {
      setReady(true);
    }

    const timer = window.setTimeout(() => setShowOffer(true), 60_000);
    return () => window.clearTimeout(timer);
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
    <main className="result-page vsl-sales-page">
      <header className="quiz-header result-header">
        <Link to="/" className="quiz-brand">
          <span className="quiz-brand-mark">✓</span>
          <strong>BLINDA BOLSA FAMÍLIA</strong>
        </Link>
        <span className="quiz-safe">AVALIAÇÃO INFORMATIVA</span>
      </header>

      <section className="result-main">
        <div className="result-container vsl-sales-container">
          {hasAnswers ? (
            <>
              <section className="live-result-banner">
                <span className="live-result-dot" />
                <strong>AVALIAÇÃO CONCLUÍDA</strong>
                <span className="live-result-divider" />
                <b>{count} {count === 1 ? "PONTO" : "PONTOS"} QUE VALE{count === 1 ? "" : "M"} A PENA CONFERIR</b>
              </section>

              <section className="vsl-headline">
                <h1>
                  Encontramos <em>{count} ponto{count === 1 ? "" : "s"}</em> que vale a pena conferir.
                </h1>
                <p>
                  <strong>ASSISTA ESSE VÍDEO ANTES QUE SEJA TARDE.</strong><br />
                  Descubra situações que podem colocar seu Bolsa Família em risco — e que muita gente só percebe quando precisa resolver uma pendência.
                </p>
              </section>

              <section className="vsl-video-wrap">
                <div className="vsl-video-placeholder">
                  <div className="vsl-video-top">
                    <span>BLINDA BOLSA FAMÍLIA</span>
                    <span>APRESENTAÇÃO</span>
                  </div>
                  <div className="vsl-video-center">
                    <div className="vsl-big-play">▶</div>
                    <strong>ASSISTA ANTES DE CONTINUAR</strong>
                    <span>O que você precisa saber para não deixar uma possível pendência para depois.</span>
                  </div>
                  <div className="vsl-video-bottom">
                    <span>▶</span>
                    <div><i /></div>
                    <span>VSL</span>
                  </div>
                </div>
              </section>

              {showOffer && (
                <section className="delayed-offer">
                  <div className="delayed-offer-kicker">VOCÊ JÁ SABE QUE VALE A PENA CONFERIR</div>
                  <h2>Agora descubra o que fazer para se proteger de erros e pendências.</h2>
                  <p>
                    Tenha acesso ao material completo para entender o que conferir, o que observar
                    e onde buscar a confirmação oficial da sua situação.
                  </p>
                  <div className="delayed-price">R$ 12,49 <small>pagamento único</small></div>
                  <a className="delayed-buy-button" href={CHECKOUT_URL}>
                    QUERO BLINDAR MEU BOLSA FAMÍLIA E DESCOBRIR OS SEGREDOS PARA NÃO PERDER O BENEFÍCIO <span>→</span>
                  </a>
                </section>
              )}

              {!showOffer && (
                <div className="delayed-offer-wait">
                  <span>ASSISTA AO VÍDEO</span>
                  <p>O acesso ao material será liberado após 60 segundos.</p>
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
        </div>
      </section>
    </main>
  );
}
