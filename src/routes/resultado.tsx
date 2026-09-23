import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

type Answer = { questionId: number; value: string };

const CHECKOUT_URL = "https://pay.cakto.com.br/38xq22v_1131074";

export const Route = createFileRoute("/resultado")({ component: ResultPage });

function ResultPage() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [ready, setReady] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("blindaQuizAnswers");
      if (raw) {
        const parsed = JSON.parse(raw);
        setAnswers(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      setAnswers([]);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready || secondsLeft <= 0) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [ready, secondsLeft]);

  const attentionPoints = useMemo(() => {
    const points: string[] = [];
    const get = (id: number) => answers.find((a) => a.questionId === id)?.value;

    if (["Não tenho certeza", "Mudou alguma coisa", "Nunca conferi"].includes(get(1) || "")) {
      points.push("Vale conferir se o Cadastro Único ainda retrata a realidade atual da sua família.");
    }
    if (["Não conferi", "Não tenho certeza"].includes(get(2) || "")) {
      points.push("Vale conferir se mudanças de trabalho ou renda foram refletidas corretamente no cadastro.");
    }
    if (["Não sei se foi informado", "Nunca conferi"].includes(get(3) || "")) {
      points.push("Vale conferir se a composição atual da família está corretamente registrada.");
    }
    if (["Não tenho certeza", "Mudei e não conferi"].includes(get(4) || "")) {
      points.push("Vale conferir se endereço e telefone estão atualizados.");
    }
    if (["Não lembro", "Acho que faz mais de 2 anos", "Não sei"].includes(get(5) || "")) {
      points.push("Vale conferir quando o Cadastro Único foi atualizado pela última vez.");
    }
    if (["Não saberia", "Nunca conferi", "Não tenho certeza"].includes(get(6) || "")) {
      points.push("Vale entender como conferir possíveis divergências entre o cadastro e outras bases oficiais.");
    }
    if (["Não saberia", "Não tenho certeza"].includes(get(7) || "")) {
      points.push("Vale saber como agir caso você seja chamado para atualizar ou verificar o cadastro.");
    }
    if (["Não faço ideia", "Tenho algumas dúvidas"].includes(get(8) || "")) {
      points.push("Existe pelo menos um ponto da sua situação que você ainda não consegue confirmar.");
    }

    return points.slice(0, 6);
  }, [answers]);

  if (!ready) {
    return <main className="result-loading"><div className="processing-spinner" /></main>;
  }

  const hasAnswers = answers.length > 0;
  const count = attentionPoints.length;
  const offerReady = secondsLeft === 0;

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
                  <strong className="vsl-urgent-line">ASSISTA ESSE VÍDEO ANTES QUE SEJA TARDE.</strong><br />
                  Descubra erros e situações do dia a dia que podem gerar divergências — e que muita gente faz sem imaginar que precisa conferir.
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

              {offerReady ? (
                <section className="delayed-offer">
                  <a className="delayed-buy-button" href={CHECKOUT_URL}>
                    QUERO BLINDAR MEU BOLSA FAMÍLIA E DESCOBRIR OS SEGREDOS PARA NÃO PERDER O BENEFÍCIO <span>→</span>
                  </a>
                </section>
              ) : (
                <div className="offer-countdown">
                  <span>O acesso à oferta será liberado em</span>
                  <strong>{secondsLeft}s</strong>
                </div>
              )}
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
