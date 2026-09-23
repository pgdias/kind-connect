import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { startQuizSession, trackEvent } from "../lib/supabase";

export const Route = createFileRoute("/")({ component: Index });

function ShieldIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 4 40 10v11c0 10.6-6.7 19-16 23C14.7 40 8 31.6 8 21V10l16-6Z" />
      <path d="m16.5 24 5 5 10-11" />
    </svg>
  );
}

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function CTA() {
  return (
    <Link className="primary-button landing-cta landing-main-cta" to="/quiz" onClick={() => void trackEvent("cta_click", { location: "landing" })}>
      DESCOBRIR O QUE POSSO ESTAR DEIXANDO PASSAR
      <Arrow />
    </Link>
  );
}

function Header() {
  return (
    <header className="site-header landing-header">
      <div className="container header-inner">
        <Link className="brand" to="/">
          <span className="brand-mark"><ShieldIcon /></span>
          <span>
            <strong>BLINDA</strong>
            <small>BOLSA FAMÍLIA</small>
          </span>
        </Link>
        <div className="header-status">
          <span className="status-dot" />
          AVALIAÇÃO GRATUITA
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero landing-v3 landing-compact-hero">
      <div className="landing-noise" />
      <div className="landing-glow landing-glow-one" />
      <div className="landing-glow landing-glow-two" />

      <div className="container landing-compact-grid">
        <div className="landing-compact-copy">
          <div className="landing-kicker"><span /> ATENÇÃO: TEM COISA QUE PASSA BATIDO</div>

          <h1>
            Você pode estar fazendo coisas normalmente sem saber que <em>deveria conferir.</em>
          </h1>

          <p className="landing-lead">
            Mudanças, informações antigas e situações do dia a dia podem passar despercebidas.
            <strong> A questão é: será que alguma delas aparece no seu caso?</strong>
          </p>

          <CTA />

          <div className="landing-reassurance">
            ✓ Gratuito &nbsp; • &nbsp; Sem CPF &nbsp; • &nbsp; Sem senha &nbsp; • &nbsp; Cerca de 2 minutos
          </div>
        </div>

        <div className="landing-compact-visual" aria-hidden="true">
          <div className="landing-phone landing-phone-compact">
            <div className="phone-top"><span>BLINDA</span><b>•••</b></div>
            <div className="phone-status">AVALIAÇÃO</div>
            <div className="phone-question">Alguma coisa mudou recentemente?</div>
            <div className="phone-option active"><i>✓</i> Sim, mas não sei se conferi</div>
            <div className="phone-option"><i /> Não aconteceu</div>
            <div className="phone-progress"><span /></div>
            <small>PERGUNTA 03 DE 08</small>
          </div>
          <div className="landing-compact-badge">✓ RESULTADO PERSONALIZADO</div>
        </div>
      </div>
    </section>
  );
}

function QuickPoints() {
  const points = [
    ["01", "Você mudou alguma coisa?", "Renda, trabalho, endereço ou quem mora com você."],
    ["02", "Tem alguma informação antiga?", "Uma informação pode continuar registrada mesmo depois de a sua realidade mudar."],
    ["03", "Existe algo que você nunca conferiu?", "Descubra se alguma situação das suas respostas merece atenção."],
  ];

  return (
    <section className="landing-quick-points">
      <div className="container">
        <div className="landing-quick-heading">
          <span>ANTES DE DEIXAR PARA DEPOIS</span>
          <h2>Tem situações que parecem normais até você perceber que precisava conferir.</h2>
        </div>

        <div className="landing-quick-grid">
          {points.map(([number, title, text]) => (
            <article key={number}>
              <b>{number}</b>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>

        <CTA />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="landing-footer landing-footer-compact">
      <div className="container">
        <strong>BLINDA BOLSA FAMÍLIA</strong>
        <span>Produto independente de caráter informativo.</span>
      </div>
    </footer>
  );
}

function Index() {
  useEffect(() => {
    void startQuizSession();
  }, []);

  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <QuickPoints />
      </main>
      <Footer />
    </div>
  );
}
