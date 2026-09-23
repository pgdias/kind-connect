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
   <div className="header-status"><span className="status-dot"/> Teste informativo</div>
 </div></header>;
}

function Hero(){
 const indicators=[["Gratuito","sem custo para responder"],["Perguntas rápidas","simples e objetivas"],["Cerca de 2 minutos","para concluir"]];
 return <section className="hero"><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
   <div className="container hero-grid">
    <div className="hero-copy">
      <div className="eyebrow"><span className="eyebrow-dot"/> TESTE GRATUITO</div>
      <h1>Você sabe se existe alguma situação no seu cadastro que <em>merece atenção?</em></h1>
      <p className="hero-description">Responda algumas perguntas rápidas e descubra quais pontos relacionados ao seu Bolsa Família podem merecer uma conferência.</p>
      <div className="trust-row">{indicators.map(([a,b])=><div className="trust-item" key={a}><CheckIcon/><span><strong>{a}</strong><small>{b}</small></span></div>)}</div>
      <CTA>COMEÇAR MEU TESTE</CTA>
      <div className="micro-row"><span>◷</span> Leva cerca de 2 minutos para responder.</div>
      <p className="privacy-note">Não é necessário informar CPF, senha ou dados bancários para realizar o teste.</p>
    </div>
    <div className="hero-visual" aria-hidden="true">
      <div className="visual-halo"/>
      <div className="visual-grid"/>
      <div className="floating floating-top"><span className="float-icon">✓</span><span><strong>Teste simples</strong><small>perguntas objetivas</small></span></div>
      <div className="back-card"><div className="fake-title"/><div className="fake-line wide"/><div className="fake-line"/><div className="fake-line short"/></div>
      <div className="main-card">
        <div className="card-top"><span className="card-badge">CONFERÊNCIA</span><span className="card-dots">•••</span></div>
        <div className="card-body"><div className="shield-large"><ShieldIcon size={39}/></div><div><strong>Organize o que<br/>você precisa conferir</strong><p>Um resumo baseado nas suas respostas.</p></div></div>
        <div className="card-progress"><span/><span/><span/><span/><span/></div>
        <div className="card-footer"><span>AVALIAÇÃO INFORMATIVA</span><b>✓</b></div>
      </div>
      <div className="floating floating-bottom"><span className="float-check">✓</span><strong>Sem CPF ou senha</strong></div>
    </div>
   </div>
 </section>;
}

function HowItWorks(){
 const steps=[["01","Responda","Conte como está sua situação respondendo perguntas rápidas."],["02","Veja sua avaliação","Ao final, você verá um resumo baseado nas suas respostas."],["03","Saiba o que conferir","Identifique quais pontos podem merecer uma conferência."]];
 return <section className="how-section"><div className="container">
   <div className="section-heading"><span>COMO FUNCIONA</span><h2>Simples, rápido e direto ao ponto.</h2><p>Você responde, confere o resultado e entende quais pontos vale a pena verificar.</p></div>
   <div className="steps-grid">{steps.map(([n,t,d],i)=><article className="step-card" key={n}><div className="step-head"><span>{n}</span>{i<2&&<i/>}</div><h3>{t}</h3><p>{d}</p></article>)}</div>
   <div className="notice"><div className="notice-icon">i</div><div><strong>Importante</strong><p>A avaliação é informativa e baseada nas respostas fornecidas. Ela não representa uma decisão ou análise oficial do Governo Federal.</p></div></div>
 </div></section>;
}

function Curiosity(){
 return <section className="curiosity"><div className="container"><div className="curiosity-card">
   <div className="curiosity-copy"><span>ANTES DE IR</span><h2>Será que existe algum ponto que você nunca conferiu?</h2><p>Faça o teste gratuito e organize melhor o que você precisa observar.</p></div>
   <CTA>FAZER O TESTE GRATUITO</CTA>
 </div></div></section>;
}

function Footer(){
 return <footer><div className="container footer-inner"><div className="footer-brand"><div><strong>BLINDA BOLSA FAMÍLIA</strong><span>Produto independente de caráter informativo.</span></div></div><nav><a href="#privacidade">Privacidade</a><a href="#termos">Termos de uso</a></nav><p>Este produto não é um canal oficial do Governo Federal, Ministério do Desenvolvimento e Assistência Social, Caixa Econômica Federal ou Cadastro Único.</p></div></footer>;
}

function Index(){return <div className="page"><Header/><main><Hero/><HowItWorks/><Curiosity/></main><Footer/></div>}