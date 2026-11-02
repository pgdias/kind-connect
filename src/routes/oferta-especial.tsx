import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/oferta-especial")({
  head: () => ({
    meta: [
      { title: "Oferta especial | Aumenta Score + Bônus" },
      {
        name: "description",
        content: "Conheça a oferta especial do pacote completo Aumenta Score + Bônus.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SpecialOfferPage,
});

function SpecialOfferPage() {
  return (
    <main className="ds-page">
      <style>{`
        html:has(.ds-page), body:has(.ds-page) {
          margin: 0 !important;
          min-height: 100%;
          background: #071321 !important;
        }
        .ds-page, .ds-page * { box-sizing: border-box; }
        .ds-page {
          min-height: 100vh;
          min-height: 100svh;
          padding: 30px 18px 54px;
          color: #f7f9fc;
          background:
            radial-gradient(ellipse at 50% -10%, rgba(32, 103, 143, .32), transparent 48%),
            radial-gradient(ellipse at 100% 65%, rgba(185, 145, 67, .09), transparent 38%),
            #071321;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .ds-shell { width: 100%; max-width: 760px; margin: 0 auto; }
        .ds-brand { display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 30px; font-size: 12px; font-weight: 850; letter-spacing: .16em; }
        .ds-mark { display: grid; place-items: center; width: 35px; height: 35px; border: 1px solid rgba(111,216,194,.48); border-radius: 11px; color: #79dfc6; background: rgba(63,176,153,.09); font-size: 18px; }
        .ds-card { padding: 38px 34px; border: 1px solid rgba(226,192,119,.34); border-radius: 23px; background: radial-gradient(ellipse at 100% 0%, rgba(217,177,98,.15), transparent 42%), linear-gradient(145deg,#172a3b,#0d1c2b 75%); box-shadow: 0 25px 70px rgba(0,0,0,.28); text-align: center; }
        .ds-tag { display: inline-flex; padding: 8px 13px; border: 1px solid rgba(231,196,119,.3); border-radius: 999px; color: #edcf91; background: rgba(231,196,119,.08); font-size: 10px; font-weight: 900; letter-spacing: .14em; }
        .ds-card h1 { margin: 20px auto 12px; color: #fff; font-size: clamp(28px,5vw,42px); line-height: 1.1; letter-spacing: -.045em; }
        .ds-card h1 span { color: #e7c477; }
        .ds-lead { max-width: 590px; margin: 0 auto; color: #c6d0d9; font-size: 15px; line-height: 1.75; }
        .ds-product { margin: 27px auto 0; padding: 22px; border: 1px solid rgba(231,196,119,.22); border-radius: 16px; background: rgba(7,19,33,.45); text-align: left; }
        .ds-product h2 { margin: 0 0 14px; color: #f0d18e; font-size: 18px; }
        .ds-list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; color: #d5dee6; font-size: 13px; line-height: 1.55; }
        .ds-list li::before { content: "✓"; margin-right: 9px; color: #8ce2cb; font-weight: 900; }
        .ds-price { margin: 25px 0 4px; color: #aebdca; font-size: 12px; }
        .ds-value { color: #f4d895; font-size: clamp(42px,8vw,58px); font-weight: 900; letter-spacing: -.05em; line-height: 1.1; }
        .ds-payment { margin: 5px 0 20px; color: #aebdca; font-size: 11px; }
        .ds-cta { display: flex; align-items: center; justify-content: center; gap: 9px; width: 100%; max-width: 480px; min-height: 58px; margin: 0 auto; padding: 15px 20px; border: 1px solid rgba(255,230,166,.75); border-radius: 13px; color: #172334; background: linear-gradient(135deg,#f3d58e,#d9ad54); box-shadow: 0 10px 28px rgba(211,166,76,.2), inset 0 1px rgba(255,255,255,.45); font-size: 14px; font-weight: 900; text-decoration: none; }
        .ds-cta:hover { filter: brightness(1.06); }
        .ds-note { margin: 10px 0 0; color: #94a4b3; font-size: 10px; line-height: 1.6; }
        .ds-decline { display: inline-block; margin-top: 25px; color: #aebdca; font-size: 12px; text-decoration: underline; text-underline-offset: 4px; }
        .ds-decline:hover { color: #fff; }
        .ds-footer { margin-top: 22px; color: #718395; font-size: 10px; line-height: 1.7; text-align: center; }
        @media (max-width: 600px) { .ds-page { padding: 22px 13px 38px; } .ds-card { padding: 29px 18px; border-radius: 19px; } .ds-product { padding: 18px 15px; } }
      `}</style>
      <div className="ds-shell">
        <header className="ds-brand">
          <span className="ds-mark" aria-hidden="true">✓</span>
          <span>BLINDA BOLSA FAMÍLIA</span>
        </header>
        <section className="ds-card">
          <span className="ds-tag">UMA CONDIÇÃO ESPECIAL</span>
          <h1>Você ainda pode conhecer o <span>pacote completo</span>.</h1>
          <p className="ds-lead">
            Se o valor da oferta anterior não coube no seu momento, disponibilizamos uma alternativa:
            o Aumenta Score + Bônus completo por R$ 9,90.
          </p>
          <div className="ds-product">
            <h2>Aumenta Score + Bônus</h2>
            <ul className="ds-list">
              <li>Curso completo em videoaulas.</li>
              <li>Todos os bônus incluídos no pacote.</li>
              <li>Acesso vitalício ao conteúdo.</li>
            </ul>
          </div>
          <p className="ds-price">Oferta especial · pagamento único</p>
          <div className="ds-value">R$ 9,90</div>
          <p className="ds-payment">Acesso vitalício · pacote completo</p>
          <a className="ds-cta" href="https://pay.cakto.com.br/fmr7mje" target="_blank" rel="noopener noreferrer">
            QUERO O PACOTE COMPLETO <span aria-hidden="true">→</span>
          </a>
          <p className="ds-note">
            O conteúdo é informativo. Não há garantia de aumento do score, ampliação de limite ou aprovação de crédito; a decisão é sempre da instituição financeira.
          </p>
          <a className="ds-decline" href="/">Não quero adicionar essa oferta</a>
        </section>
        <footer className="ds-footer">
          BLINDA BOLSA FAMÍLIA · Consulte sempre os canais oficiais para questões sobre seu benefício.
        </footer>
      </div>
    </main>
  );
}
