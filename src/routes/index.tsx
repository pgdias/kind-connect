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
          <div className="landing-kicker"><span /> TESTE GRATUITO • 2 MINUTOS</div>
          <div className="landing-alert">⚠ EXISTEM SITUAÇÕES QUE VOCÊ PODE ESTAR DEIXANDO PASSAR</div>

          <h1>Você sabe se está tudo certo com o seu <em>Bolsa Família?</em></h1>

          <p className="landing-lead">
            Tem coisa que muda na vida da família, você resolve no dia a dia e nem lembra de conferir se o cadastro continua igual.
            <strong> É justamente esse tipo de situação que queremos colocar no seu radar.</strong>
          </p>

          <div className="landing-curiosity">
            <div className="landing-curiosity-icon">?</div>
            <div>
              <strong>Faça o teste antes de simplesmente presumir que está tudo certo.</strong>
              <span>São perguntas rápidas sobre situações comuns. No final, você vê quais pontos das suas respostas merecem ser conferidos.</span>
            </div>
          </div>

          <CTA>QUERO FAZER O TESTE GRATUITO</CTA>

          <div className="landing-reassurance">
            <span>✓</span> Sem CPF • Sem senha • Sem dados bancários • Cerca de 2 minutos
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
            <b>?</b><span><strong>Algo para conferir</strong><small>pode passar despercebido</small></span>
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
    ["01", "Mudou alguma coisa?", "Trabalho, renda, endereço ou quem mora com você."],
    ["02", "Ficou alguma informação para trás?", "Telefone, escola, situação familiar ou outro dado importante."],
    ["03", "Você sabe o que deveria conferir?", "Às vezes o problema é simplesmente não saber onde olhar."],
    ["04", "Recebeu algum aviso?", "Você saberia reconhecer quando uma situação precisa de atenção?"],
  ];

  return (
    <section className="landing-situations">
      <div className="container">
        <div className="landing-section-heading">
          <span>É AQUI QUE MUITA GENTE SE PERDE</span>
          <h2>Não estamos falando de uma coisa só.</h2>
          <p>Existem várias situações do cotidiano que podem ser relevantes para o cadastro e para o acompanhamento do benefício.</p>
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
          <span>O teste não consulta o cadastro oficial.</span>
          <strong>Ele organiza perguntas para mostrar o que vale a pena conferir.</strong>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["01", "Responda", "Perguntas rápidas sobre situações da sua vida e da sua família."],
    ["02", "Veja seus pontos", "Suas respostas são organizadas em pontos que merecem atenção."],
    ["03", "Continue", "Se fizer sentido para você, avance para entender melhor esses pontos."],
  ];

  return (
    <section className="landing-how">
      <div className="container">
        <div className="landing-section-heading">
          <span>SEM COMPLICAÇÃO</span>
          <h2>Você responde. A avaliação organiza.</h2>
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
          <span>ANTES DE DEIXAR PARA DEPOIS</span>
          <h2>Talvez exista alguma coisa na sua situação que você ainda não parou para conferir.</h2>
          <p>Descubra quais pontos das suas respostas merecem atenção.</p>
          <CTA>COMEÇAR A AVALIAÇÃO GRATUITA</CTA>
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
