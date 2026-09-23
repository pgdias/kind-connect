import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Index });

function Shield() {
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4 40 10v11c0 10.6-6.7 19-16 23C14.7 40 8 31.6 8 21V10l16-6Z"/><path d="m16.5 24 5 5 10-11"/></svg>;
}

function Header() {
  return <header className="site-header"><div className="container header-inner"><a className="brand" href="/"><span className="brand-mark"><Shield /></span><span><strong>BLINDA</strong><small>BOLSA FAMÍLIA</small></span></a><span className="header-pill">Teste informativo</span></div></header>;
}

function CTA({children}:{children:React.ReactNode}) {
  return <Link className="primary-button" to="/quiz">{children}<span>→</span></Link>;
}

function Home() {
  const items=[["Gratuito","sem custo para responder"],["Perguntas rápidas","simples e objetivas"],["Cerca de 2 minutos","para concluir"]];
  return <div className="landing">
    <Header />
    <main>
      <section className="hero"><div className="container hero-grid"><div className="hero-copy">
        <div className="eyebrow"><i/> TESTE GRATUITO</div>
        <h1>Você sabe se existe alguma situação no seu cadastro que merece atenção?</h1>
        <p className="hero-description">Responda algumas perguntas rápidas e descubra quais pontos relacionados ao seu Bolsa Família podem merecer uma conferência.</p>
        <div className="trust-row">{items.map(([a,b])=><div key={a}><span className="check">✓</span><span><strong>{a}</strong><small>{b}</small></span></div>)}</div>
        <CTA>COMEÇAR MEU TESTE</CTA>
        <p className="microcopy">Leva cerca de 2 minutos para responder.</p>
        <p className="privacy-note">Não é necessário informar CPF, senha ou dados bancários para realizar o teste.</p>
      </div><div className="hero-visual"><div className="glow"/><div className="visual-card back"/><div className="visual-card front"><div className="visual-icon"><Shield/></div><div><small>CONFERÊNCIA</small><strong>Seus dados merecem atenção</strong><em>Organização traz mais tranquilidade.</em></div><b>✓</b></div><div className="floating-badge">✓ Checklist simples</div></div></div></section>

      <section className="how-section"><div className="container"><div className="section-heading"><span>COMO FUNCIONA</span><h2>Simples, rápido e direto ao ponto.</h2><p>Você responde, confere o resultado e entende quais pontos vale a pena verificar.</p></div>
        <div className="steps-grid">{[["01","Responda","Conte como está sua situação respondendo perguntas rápidas."],["02","Veja sua avaliação","Ao final, você verá um resumo baseado nas suas respostas."],["03","Saiba o que conferir","Identifique quais pontos podem merecer uma conferência."]].map(([n,t,d])=><article className="step-card" key={n}><i>{n}</i><h3>{t}</h3><p>{d}</p></article>)}</div>
        <div className="notice"><b>i</b><p><strong>Importante</strong><br/>A avaliação é informativa e baseada nas respostas fornecidas. Ela não representa uma decisão ou análise oficial do Governo Federal.</p></div>
      </div></section>

      <section className="curiosity"><div className="container curiosity-card"><div><span>ANTES DE IR</span><h2>Será que existe algum ponto que você nunca conferiu?</h2><p>Faça o teste gratuito e organize melhor o que você precisa observar.</p></div><CTA>FAZER O TESTE GRATUITO</CTA></div></section>
    </main>
    <footer><div className="container footer-inner"><div><strong>BLINDA BOLSA FAMÍLIA</strong><p>Produto independente de caráter informativo.</p></div><nav><a href="#privacidade">Privacidade</a><a href="#termos">Termos de uso</a></nav><p className="disclaimer">Este produto não é um canal oficial do Governo Federal, Ministério do Desenvolvimento e Assistência Social, Caixa Econômica Federal ou Cadastro Único.</p></div></footer>
  </div>;
}

function Index(){return <Home/>}
