import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/")({ component: Index });

function ShieldIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <path d="M24 4 40 10v11c0 10.6-6.7 19-16 23C14.7 40 8 31.6 8 21V10l16-6Z" />
    <path d="m16.5 24 5 5 10-11" />
  </svg>;
}

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function CTA({ children }: { children: ReactNode }) {
  return <Link className="primary-button landing-cta" to="/quiz">{children}<Arrow /></Link>;
}

function Header() {
  return (
    <header className="site-header landing-header">
      <div className="container header-inner">
        <Link className="brand" to="/">
          <span className="brand-mark"><ShieldIcon size={22} /></span>
          <span><strong>BLINDA</strong><small>BOLSA FAMÍLIA</small></span>
        </Link>
        <div className="header-status"><span className="status-dot" /> AVALIAÇÃO GRATUITA</div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero landing-v3">
      <div className="landing-noise" />
      <div className="landing-glow landing-glow-one" />
      <div className="landing-glow landing-glow-two" />
      <div className="container landing-v3-grid">
        <div className="landing-v3-copy">
          <div className="landing-kicker"><span /> AVALIAÇÃO GRATUITA • LEVA CERCA DE 2 MINUTOS</div>
          <div className="landing-alert">ATENÇÃO: TEM COISA QUE PASSA DESPERCEBIDA</div>

          <h1>Você pode estar fazendo coisas no dia a dia sem saber que <em>deveria conferir.</em></h1>

          <p className="landing-lead">
            Tem situações que parecem completamente normais: uma mudança em casa, uma informação que ficou antiga, uma alteração na renda, alguém que entrou ou saiu da família...
            <strong> O problema é quando você nem imagina que aquilo merece atenção.</strong>
          </p>

          <div className="landing-curiosity">
            <div className="landing-curiosity-icon">?</div>
            <div>
              <strong>Será que existe alguma no seu caso?</strong>
              <span>Responda perguntas rápidas e descubra quais situações das suas respostas merecem ser conferidas.</span>
            </div>
          </div>

          <CTA>DESCOBRIR O QUE POSSO ESTAR DEIXANDO PASSAR</CTA>

          <div className="landing-reassurance">
            <span>✓</span> Gratuito • Sem CPF • Sem senha • Cerca de 2 minutos
          </div>
        </div>

        <div className="landing-v3-visual" aria-hidden="true">
          <div className="landing-orbit landing-orbit-one" />
          <div className="landing-orbit landing-orbit-two" />

          <div className="landing-phone">
            <div className="phone-top"><span>BLINDA</span><b>•••</b></div>
            <div className="phone-status">AVALIAÇÃO EM ANDAMENTO</div>
            <div className="phone-question">Alguma coisa mudou na sua família recentemente?</div>
            <div className="phone-option active"><i>✓</i> Sim, mas não sei se conferi</div>
            <div className="phone-option"><i /> Não aconteceu</div>
            <div className="phone-option"><i /> Nunca parei para pensar nisso</div>
            <div className="phone-progress"><span /></div>
            <small>PERGUNTA 03 DE 08</small>
          </div>

          <div className="landing-float landing-float-top">
            <b>?</b><span><strong>Algo que passou batido?</strong><small>descubra no teste</small></span>
          </div>

          <div className="landing-float landing-float-bottom">
            <b>✓</b><span><strong>Resultado personalizado</strong><small>baseado nas suas respostas</small></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Situations() {
  const situations = [
    ["01", "Você mudou alguma coisa e nem percebeu?", "Trabalho, renda, endereço, telefone ou quem mora com você."],
    ["02", "Tem alguma informação desatualizada?", "Às vezes a vida muda e aquela informação antiga simplesmente fica para trás."],
    ["03", "Você saberia o que precisa conferir?", "Muita gente só pensa nisso quando aparece uma situação que exige atenção."],
    ["04", "Já recebeu algum aviso e ficou na dúvida?", "Descubra se suas respostas apontam algum ponto que merece ser conferido."],
  ];

  return (
    <section className="landing-situations">
      <div className="container">
        <div className="landing-section-heading">
          <span>O QUE PODE ESTAR PASSANDO BATIDO</span>
          <h2>O que parece normal também pode merecer uma conferida.</h2>
          <p>Não é sobre ficar procurando problema. É sobre descobrir se existe alguma situação no seu dia a dia que você nunca parou para verificar.</p>
        </div>

        <div className="landing-situation-grid">
          {situations.map(([number, title, text]) => (
            <article key={number} className="landing-situation-card">
              <div className="landing-situation-number">{number}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="landing-proof-line">
          <span>Você responde algumas perguntas sobre sua realidade.</span>
          <strong>No final, fica mais claro quais pontos das suas respostas vale a pena conferir.</strong>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["01", "Responda", "Perguntas rápidas sobre situações que podem acontecer na sua rotina."],
    ["02", "Descubra seus pontos", "Suas respostas são analisadas para mostrar o que chamou atenção."],
    ["03", "Veja seu resultado", "Você entende quais situações apareceram no seu teste e decide o próximo passo."],
  ];

  return (
    <section className="landing-how">
      <div className="container">
        <div className="landing-section-heading">
          <span>É RÁPIDO</span>
          <h2>Você não precisa passar horas procurando respostas.</h2>
        </div>

        <div className="landing-steps">
          {steps.map(([number, title, text]) => (
            <article key={number}>
              <div><b>{number}</b><i /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="landing-final">
      <div className="container">
        <div className="landing-final-card">
          <span>UMA PERGUNTA RÁPIDA</span>
          <h2>E se você estiver deixando passar justamente uma situação que nunca pensou em conferir?</h2>
          <p>Faça a avaliação gratuita e descubra quais pontos das suas respostas merecem sua atenção.</p>
          <CTA>QUERO FAZER MINHA AVALIAÇÃO</CTA>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="landing-footer">
      <div className="container landing-footer-inner">
        <div>
          <strong>BLINDA BOLSA FAMÍLIA</strong>
          <span>Produto independente de caráter informativo.</span>
        </div>
        <p>O teste não acessa seu Cadastro Único e não determina bloqueio ou cancelamento. Informações relacionadas ao programa podem mudar conforme as regras vigentes.</p>
      </div>
    </footer>
  );
}

function Index() {
  return <div className="page"><Header /><main><Hero /><Situations /><HowItWorks /><FinalCTA /></main><Footer /></div>;
}
