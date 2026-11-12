import { createFileRoute } from "@tanstack/react-router";

const COURSE_ACCESS_URL = "";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Compra confirmada | Blinda Bolsa Família" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <main className="bb-thanks">
      <style>{`
        .bb-thanks{min-height:100vh;background:#0A1F44;color:#fff;font-family:Arial,Helvetica,sans-serif;padding:48px 18px;display:flex;align-items:center;justify-content:center}
        .bb-thanks *{box-sizing:border-box}
        .bb-thanks-shell{width:100%;max-width:680px;margin:0 auto}
        .bb-thanks h1{font-size:clamp(31px,6vw,48px);line-height:1.08;text-transform:uppercase;font-weight:950;color:#FFD400;text-align:center;margin:0 0 18px}
        .bb-thanks-lead{text-align:center;font-size:19px;line-height:1.55;margin:0 auto 30px;max-width:560px}
        .bb-thanks-card{background:#12295A;border:1px solid #1E3A7B;border-radius:12px;padding:25px 22px}
        .bb-thanks-card h2{font-size:21px;margin:0 0 18px}
        .bb-thanks-step{display:flex;gap:14px;align-items:flex-start;margin:16px 0;font-size:16px;line-height:1.55}
        .bb-thanks-number{display:grid;place-items:center;flex:none;width:30px;height:30px;border-radius:50%;background:#FFD400;color:#0A1F44;font-weight:950}
        .bb-thanks-button{display:flex;align-items:center;justify-content:center;width:100%;min-height:58px;margin:24px 0 12px;padding:15px 18px;border:0;border-radius:12px;background:#25D366;color:#fff;font-size:15px;font-weight:950;text-align:center;text-decoration:none}
        .bb-thanks-button[aria-disabled=true]{opacity:.55;cursor:not-allowed}
        .bb-thanks-note{text-align:center;color:#d6e0f1;font-size:13px;line-height:1.6;margin:10px 0 0}
        @media(max-width:480px){.bb-thanks{padding:30px 15px}.bb-thanks-card{padding:21px 17px}.bb-thanks-lead{font-size:17px}}
      `}</style>
      <div className="bb-thanks-shell">
        <h1>COMPRA CONFIRMADA. AGORA É COM VOCÊ.</h1>
        <p className="bb-thanks-lead">Seu acesso ao Blinda Bolsa Família está liberado.</p>
        <section className="bb-thanks-card">
          <h2>Faça estes 3 passos:</h2>
          <div className="bb-thanks-step"><span className="bb-thanks-number">1</span><span>Verifique seu e-mail (inclusive a caixa de spam).</span></div>
          <div className="bb-thanks-step"><span className="bb-thanks-number">2</span><span>Clique no link de acesso enviado pela plataforma.</span></div>
          <div className="bb-thanks-step"><span className="bb-thanks-number">3</span><span>Assista à primeira aula assim que puder.</span></div>
          {COURSE_ACCESS_URL ? (
            <a className="bb-thanks-button" href={COURSE_ACCESS_URL}>ACESSAR O TREINAMENTO AGORA</a>
          ) : (
            <button className="bb-thanks-button" type="button" disabled aria-disabled="true">ACESSAR O TREINAMENTO AGORA</button>
          )}
          <p className="bb-thanks-note">Se não receber o e-mail em até 10 minutos, entre em contato pelo e-mail de suporte informado no checkout.</p>
          {!COURSE_ACCESS_URL ? <p className="bb-thanks-note">O link direto do provedor de hospedagem será ativado assim que for informado.</p> : null}
        </section>
      </div>
    </main>
  );
}
