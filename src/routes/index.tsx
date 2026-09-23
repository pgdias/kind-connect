import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/")({ component: Index });

function ShieldIcon({size=24}:{size?:number}) {
  return <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <path d="M24 4 40 10v11c0 10.6-6.7 19-16 23C14.7 40 8 31.6 8 21V10l16-6Z"/>
    <path d="m16.5 24 5 5 10-11"/>
  </svg>;
}
function CheckIcon(){return <span className="check-icon">✓</span>}
function CTA({children}:{children:ReactNode}){return <Link className="primary-button" to="/quiz">{children}<span aria-hidden="true">→</span></Link>}

function Header(){
 return <header className="site-header"><div className="container header-inner">
   <Link className="brand" to="/"><span className="brand-mark"><ShieldIcon size={23}/></span><span><strong>BLINDA</strong><small>BOLSA FAMÍLIA</small></span></Link>
   <div className="header-status"><span className="status-dot"/> Teste gratuito</div>
 </div></header>;
}

function Hero(){
 const indicators=[["Gratuito","sem CPF, senha ou dados bancários"],["Perguntas rápidas","situações comuns para conferir"],["Cerca de 2 minutos","para descobrir seus pontos de atenção"]];
 return <section className="hero hero-aggressive">
   <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
   <div className="container hero-grid">
    <div className="hero-copy">
      <div className="eyebrow"><span className="eyebrow-dot"/> TESTE GRATUITO • 2 MINUTOS</div>
      <div className="warning-line"><span>⚠</span> NÃO DEIXE UMA POSSÍVEL PENDÊNCIA PARA DEPOIS</div>
      <h1>Você pode estar cometendo um erro no seu Bolsa Família <em>sem saber.</em></h1>
      <p className="hero-description">Uma informação desatualizada, uma mudança na família ou uma obrigação que ficou sem acompanhamento pode ser um ponto que merece atenção. <strong>O problema é descobrir isso tarde demais.</strong></p>
      <div className="fear-box">
        <div className="fear-icon">!</div>
        <div><strong>Você tem certeza de que está tudo certo?</strong><span>Faça algumas perguntas e veja quais pontos da sua situação vale a pena conferir.</span></div>
      </div>
      <div className="trust-row">{indicators.map(([a,b])=><div className="trust-item" key={a}><CheckIcon/><span><strong>{a}</strong><small>{b}</small></span></div>)}</div>
      <CTA>VER SE TENHO ALGUM DESSES PONTOS</CTA>
      <div className="micro-row"><span>◷</span> Leva cerca de 2 minutos. Você pode parar quando quiser.</div>
      <p className="privacy-note">O teste não pede CPF, senha, número do cartão, dados bancários ou qualquer credencial de acesso.</p>
    </div>
    <div className="hero-visual" aria-hidden="true">
      <div className="visual-halo"/><div className="visual-grid"/>
      <div className="risk-ring"><span>ATENÇÃO</span></div>
      <div className="floating floating-top"><span className="float-icon warning-float">!</span><span><strong>Ponto para conferir</strong><small>não deixe passar</small></span></div>
      <div className="back-card"><div className="fake-title"/><div className="fake-line wide"/><div className="fake-line"/><div className="fake-line short"/></div>
      <div className="main-card">
        <div className="card-top"><span className="card-badge">CHECK-UP INFORMATIVO</span><span className="card-dots">•••</span></div>
        <div className="card-body"><div className="shield-large alert-shield"><ShieldIcon size={39}/></div><div><strong>Existe algo que<br/>você precisa conferir?</strong><p>Descubra pelos pontos avaliados no teste.</p></div></div>
        <div className="card-progress"><span/><span/><span/><span/><span/></div>
        <div className="card-footer"><span>RESULTADO BASEADO NAS RESPOSTAS</span><b>✓</b></div>
      </div>
      <div className="floating floating-bottom"><span className="float-check">✓</span><strong>Sem dados sensíveis</strong></div>
    </div>
   </div>
 </section>;
}

function RiskSection(){
 const risks=[
  ["01","Cadastro desatualizado","O Cadastro Único deve ser atualizado a cada 24 meses e também quando há mudanças relevantes na família."],
  ["02","Mudanças na família","Mudanças de endereço, renda, trabalho ou composição familiar são situações que podem exigir atualização."],
  ["03","Saúde e educação","Existem compromissos de acompanhamento para famílias beneficiárias, conforme as regras do programa."],
  ["04","Não saber o que conferir","Uma das maiores dificuldades é simplesmente não saber quais informações precisam ser verificadas."]
 ];
 return <section className="risk-section"><div className="container">
   <div className="section-heading risk-heading"><span>OS PONTOS QUE MERECEM ATENÇÃO</span><h2>O que você não confere, você pode acabar descobrindo tarde.</h2><p>O teste foi criado para transformar essas dúvidas em uma lista simples de pontos para você conferir.</p></div>
   <div className="risk-grid">{risks.map(([n,t,d])=><article className="risk-card" key={n}><span className="risk-number">{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div>
   <div className="risk-warning"><span>⚠</span><div><strong>Importante: atenção não significa cancelamento automático.</strong><p>As regras do Bolsa Família dependem da situação de cada família. O objetivo deste teste é ajudar você a identificar pontos que podem merecer conferência, não declarar que você perdeu ou vai perder o benefício.</p></div></div>
 </div></section>;
}

function HowItWorks(){
 const steps=[["01","Responda","Conte como está sua situação respondendo perguntas rápidas."],["02","Descubra os pontos","O teste cruza suas respostas com situações que merecem atenção."],["03","Saiba o que conferir","Você recebe um resumo para entender onde vale olhar com mais cuidado."]];
 return <section className="how-section"><div className="container">
   <div className="section-heading"><span>COMO FUNCIONA</span><h2>Você não precisa esperar aparecer um problema para começar a conferir.</h2><p>O objetivo é simples: identificar dúvidas agora e mostrar o que merece sua atenção.</p></div>
   <div className="steps-grid">{steps.map(([n,t,d],i)=><article className="step-card" key={n}><div className="step-head"><span>{n}</span>{i<2&&<i/>}</div><h3>{t}</h3><p>{d}</p></article>)}</div>
 </div></section>;
}

function Curiosity(){
 return <section className="curiosity"><div className="container"><div className="curiosity-card">
   <div className="curiosity-copy"><span>UMA ÚLTIMA PERGUNTA</span><h2>Se existisse um ponto no seu cadastro que você ainda não conferiu, você gostaria de descobrir agora?</h2><p>O teste é gratuito, rápido e informativo. Não espere uma surpresa para começar a olhar.</p></div>
   <CTA>QUERO FAZER O TESTE</CTA>
 </div></div></section>;
}

function Footer(){
 return <footer><div className="container footer-inner">
   <div className="footer-brand"><div><strong>BLINDA BOLSA FAMÍLIA</strong><span>Produto independente de caráter informativo.</span></div></div>
   <nav><a href="#privacidade">Privacidade</a><a href="#termos">Termos de uso</a></nav>
   <p>{"\n"}</p>
   <p className="footer-source">Informações gerais do teste são baseadas em orientações públicas do Governo Federal e podem mudar conforme a legislação e as regras vigentes.</p>
 </div></footer>;
}

function Index(){return <div className="page"><Header/><main><Hero/><RiskSection/><HowItWorks/><Curiosity/></main><Footer/></div>}
