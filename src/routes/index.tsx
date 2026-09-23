import { createFileRoute, Link } from "@tanstack/react-router";

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
    <Link className="primary-button landing-cta landing-main-cta" to="/quiz">
      FAZER A AVALIAÇÃO GRATUITA
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
          GRATUITO
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
          <div className="landing-kicker"><span /> AVALIAÇÃO GRATUITA</div>

          <h1>
            Você pode estar deixando passar coisas que <em>deveria conferir.</em>
          </h1>

          <p className="landing-lead">
            Responda algumas perguntas sobre sua situação e descubra se existe algum ponto que merece atenção.
          </p>

          <CTA />

          <div className="landing-reassurance">
            ✓ Sem CPF &nbsp; • &nbsp; Sem senha &nbsp; • &nbsp; Cerca de 2 minutos
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
    ["01", "Mudanças na sua vida", "Renda, trabalho, endereço ou composição da família."],
    ["02", "Informação que ficou antiga", "Alguma coisa pode ter mudado e você simplesmente não conferiu."],
    ["03", "Situações que passam batido", "O teste ajuda a identificar pontos das suas respostas que merecem atenção."],
  ];

  return (
    <section className="landing-quick-points">
      <div className="container">
        <div className="landing-quick-heading">
          <span>O QUE VOCÊ VAI CONFERIR</span>
          <h2>Descubra o que pode estar passando despercebido.</h2>
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
