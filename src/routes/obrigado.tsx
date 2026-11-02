import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Compra confirmada | Blinda Bolsa Família" },
      {
        name: "description",
        content: "Confirmação da compra do Blinda Bolsa Família e próximos passos para acessar seu material.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <main className="ty-page">
      <style>{`
        html:has(.ty-page), body:has(.ty-page) {
          margin: 0 !important;
          min-height: 100%;
          background: #071321 !important;
        }
        .ty-page, .ty-page * { box-sizing: border-box; }
        .ty-page {
          --ty-bg: #071321;
          --ty-panel: #0d1d2d;
          --ty-line: rgba(174, 199, 218, .13);
          --ty-muted: #a9b8c8;
          --ty-white: #f7f9fc;
          --ty-gold: #ffd12e;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          margin: 0;
          padding: 30px 18px 64px;
          color: var(--ty-white);
          background:
            radial-gradient(ellipse at 50% -10%, rgba(32, 103, 143, .32), transparent 48%),
            radial-gradient(ellipse at 100% 55%, rgba(185, 145, 67, .08), transparent 38%),
            var(--ty-bg);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .ty-shell { width: 100%; max-width: 900px; margin: 0 auto; }
        .ty-topbar {
          display: flex; align-items: center; justify-content: center; gap: 11px;
          margin: 0 auto 34px; color: #e9f0f7;
        }
        .ty-logo {
          display: grid; place-items: center; width: 36px; height: 36px;
          border: 1px solid rgba(111, 216, 194, .48); border-radius: 11px;
          color: #79dfc6; background: rgba(63, 176, 153, .09);
          font-size: 18px; font-weight: 900;
          box-shadow: 0 0 24px rgba(69, 199, 171, .12);
        }
        .ty-brand { font-size: 12px; font-weight: 850; letter-spacing: .16em; }
        .ty-hero {
          position: relative; overflow: hidden; padding: 44px 34px 38px;
          border: 1px solid rgba(119, 218, 195, .2); border-radius: 24px;
          background: linear-gradient(135deg, rgba(17, 48, 64, .98), rgba(10, 27, 44, .98) 65%, rgba(13, 34, 50, .98));
          box-shadow: 0 28px 80px rgba(0, 0, 0, .28);
          text-align: center;
        }
        .ty-hero::before {
          content: ""; position: absolute; width: 280px; height: 280px; border-radius: 50%;
          top: -190px; right: -70px; background: rgba(87, 207, 180, .1); filter: blur(4px);
        }
        .ty-status {
          display: inline-flex; align-items: center; gap: 8px; position: relative;
          padding: 8px 13px; border: 1px solid rgba(115, 221, 195, .28);
          border-radius: 999px; background: rgba(77, 191, 162, .09);
          color: #8be5ce; font-size: 10px; font-weight: 850; letter-spacing: .14em;
        }
        .ty-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #77dfc3; box-shadow: 0 0 12px rgba(119, 223, 195, .7); }
        .ty-check {
          display: grid; place-items: center; width: 68px; height: 68px; margin: 23px auto 18px;
          border: 1px solid rgba(123, 226, 201, .42); border-radius: 22px;
          background: linear-gradient(145deg, rgba(75, 190, 160, .22), rgba(75, 190, 160, .07));
          color: #8ce7d0; font-size: 34px; font-weight: 700;
          box-shadow: 0 12px 36px rgba(42, 173, 143, .12);
        }
        .ty-hero h1 {
          position: relative; max-width: 680px; margin: 0 auto;
          color: #fff; font-size: clamp(29px, 5vw, 43px); line-height: 1.1;
          letter-spacing: -.045em; font-weight: 850;
        }
        .ty-hero h1 span { color: #8ce2cb; }
        .ty-hero-copy {
          max-width: 580px; margin: 16px auto 0; color: #c2d0dc;
          font-size: 15px; line-height: 1.75;
        }
        .ty-reassurance {
          display: flex; align-items: center; justify-content: center; gap: 9px;
          margin: 23px auto 0; color: #e1e9ef; font-size: 12px; font-weight: 650;
        }
        .ty-reassurance span { color: #8ce2cb; font-size: 16px; }
        .ty-section-heading { margin: 38px 0 16px; }
        .ty-kicker { margin: 0 0 8px; color: #80d9c2; font-size: 10px; font-weight: 850; letter-spacing: .17em; }
        .ty-section-heading h2 { margin: 0; color: #f5f7fa; font-size: 23px; letter-spacing: -.025em; }
        .ty-section-heading p { margin: 8px 0 0; color: var(--ty-muted); font-size: 13px; line-height: 1.65; }
        .ty-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .ty-step {
          min-height: 148px; padding: 20px 18px; border: 1px solid var(--ty-line);
          border-radius: 16px; background: linear-gradient(150deg, rgba(17, 38, 57, .92), rgba(10, 25, 40, .92));
        }
        .ty-step-number {
          display: grid; place-items: center; width: 28px; height: 28px; margin-bottom: 13px;
          border: 1px solid rgba(116, 215, 192, .28); border-radius: 9px;
          background: rgba(87, 191, 166, .1); color: #38d6a6; font-size: 11px; font-weight: 850;
        }
        .ty-step h3 { margin: 0 0 7px; color: #f4f7fa; font-size: 14px; }
        .ty-step p { margin: 0; color: #aebdca; font-size: 12px; line-height: 1.65; }
        .ty-offer {
          position: relative; overflow: hidden; margin-top: 42px; padding: 30px;
          border: 1px solid rgba(226, 192, 119, .34); border-radius: 22px;
          background:
            radial-gradient(ellipse at 100% 0%, rgba(217, 177, 98, .15), transparent 42%),
            linear-gradient(145deg, #172a3b, #0d1c2b 75%);
          box-shadow: 0 22px 60px rgba(0, 0, 0, .2);
        }
        .ty-offer-layout { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 27px; align-items: center; }
        .ty-product-art {
          position: relative; display: flex; flex-direction: column; justify-content: flex-end;
          min-height: 185px; padding: 18px 15px; overflow: hidden;
          border: 1px solid rgba(239, 208, 142, .48); border-radius: 13px;
          background: linear-gradient(155deg, #263c4e 0%, #122536 48%, #091724 100%);
          box-shadow: 8px 10px 0 rgba(0, 0, 0, .16), 0 0 38px rgba(222, 181, 98, .12);
        }
        .ty-product-art::before {
          content: ""; position: absolute; width: 140px; height: 140px; top: -57px; right: -53px;
          border: 1px solid rgba(231, 196, 119, .4); border-radius: 50%;
          box-shadow: 0 0 0 13px rgba(231, 196, 119, .04), 0 0 0 27px rgba(231, 196, 119, .03);
        }
        .ty-art-label { position: relative; color: #e9ca86; font-size: 8px; font-weight: 900; letter-spacing: .18em; }
        .ty-art-title { position: relative; margin-top: 9px; color: #fff; font-size: 20px; font-weight: 900; line-height: 1.02; letter-spacing: -.04em; }
        .ty-art-title span { color: #e8c477; }
        .ty-art-footer { position: relative; margin-top: 15px; color: #aab8c4; font-size: 8px; letter-spacing: .12em; }
        .ty-offer-copy { min-width: 0; }
        .ty-offer-label {
          display: inline-flex; padding: 7px 10px; border: 1px solid rgba(231, 196, 119, .3);
          border-radius: 999px; background: rgba(231, 196, 119, .09);
          color: #edcf91; font-size: 9px; font-weight: 900; letter-spacing: .14em;
        }
        .ty-offer h2 { margin: 13px 0 9px; color: #fff; font-size: clamp(25px, 4vw, 34px); line-height: 1.08; letter-spacing: -.04em; }
        .ty-offer h2 span { color: var(--ty-gold); }
        .ty-offer-intro { margin: 0; color: #e2e8ef; font-size: 16px; line-height: 1.75; font-weight: 600; }
        .ty-offer-sales-copy { margin-top: 12px; color: #c6d0d9; font-size: 12px; line-height: 1.65; }
        .ty-offer-sales-copy h3 { margin: 0 0 12px; color: #f0d18e; font-size: 15px; line-height: 1.35; letter-spacing: -.01em; }
        .ty-offer-sales-copy p { margin: 0 0 10px; }
        .ty-offer-sales-copy strong { color: #f3e4c1; }
        .ty-bonus {
          display: flex; gap: 14px; align-items: flex-start; margin-top: 23px; padding: 17px 18px;
          border: 1px solid rgba(231, 196, 119, .23); border-radius: 14px;
          background: rgba(231, 196, 119, .07);
        }
        .ty-bonus-icon {
          display: grid; place-items: center; flex: 0 0 34px; width: 34px; height: 34px;
          border-radius: 10px; background: rgba(231, 196, 119, .13); color: #f0d18e; font-size: 16px;
        }
        .ty-bonus strong { display: block; margin: 1px 0 5px; color: #f0d18e; font-size: 10px; letter-spacing: .12em; }
        .ty-bonus p { margin: 0; color: #c6d0d9; font-size: 12px; line-height: 1.6; }
        .ty-price-box { margin: 24px auto 0; padding: 19px 16px; max-width: 440px; border: 1px solid rgba(255,209,46,.28); border-radius: 14px; background: rgba(7,19,33,.42); text-align: center; }
        .ty-price-label { margin: 0 0 5px; color: #c2ccd6; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
        .ty-price { color: #f4d895; font-size: clamp(38px,7vw,48px); font-weight: 900; line-height: 1.1; letter-spacing: -.05em; }
        .ty-price-detail { margin: 5px 0 0; color: #aebdca; font-size: 11px; }
        .ty-includes { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; margin-top: 20px; }
        .ty-include { padding: 14px; border: 1px solid rgba(174,199,218,.13); border-radius: 12px; background: rgba(7,19,33,.34); color: #d7e0e8; font-size: 12px; line-height: 1.55; }
        .ty-include strong { display: block; margin-bottom: 4px; color: #f0d18e; font-size: 12px; }
        .ty-choice-note { margin: 13px auto 0; max-width: 440px; color: #aebdca; font-size: 11px; line-height: 1.6; text-align: center; }
        .ty-decline-button { display: flex; align-items: center; justify-content: center; width: 100%; max-width: 440px; min-height: 48px; margin: 12px auto 0; padding: 12px 18px; border: 1px solid rgba(174,199,218,.25); border-radius: 12px; background: rgba(7,19,33,.35); color: #c3ced8; font-size: 12px; font-weight: 700; text-decoration: none; text-align: center; transition: border-color .18s ease, color .18s ease, background .18s ease; }
        .ty-decline-button:hover { border-color: rgba(174,199,218,.55); color: #fff; background: rgba(174,199,218,.07); }
        .ty-decline-button:focus-visible { outline: 3px solid #8ce2cb; outline-offset: 4px; }
        .ty-buy-wrap { margin-top: 18px; text-align: center; }
        .ty-buy-button {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; max-width: 440px; min-height: 58px; padding: 15px 22px;
          border: 1px solid rgba(255, 230, 166, .75); border-radius: 13px;
          background: linear-gradient(135deg, #f3d58e, #d9ad54);
          box-shadow: 0 10px 28px rgba(211, 166, 76, .2), inset 0 1px rgba(255,255,255,.45);
          color: #172334; font-size: 15px; font-weight: 900; letter-spacing: .015em;
          text-decoration: none; text-align: center; transition: transform .18s ease, filter .18s ease;
          transform-origin: center; animation: ty-card-quiz-pulse 2.4s ease-in-out infinite;
        }
        @keyframes ty-card-quiz-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 28px rgba(211, 166, 76, .2), inset 0 1px rgba(255,255,255,.45); }
          50% { transform: scale(1.018); box-shadow: 0 13px 32px rgba(211, 166, 76, .3), inset 0 1px rgba(255,255,255,.45); }
        }
        @media (prefers-reduced-motion: reduce) { .ty-buy-button { animation: none; } }
        .ty-buy-button:hover { transform: translateY(-2px); filter: brightness(1.06); }
        .ty-buy-button:focus-visible { outline: 3px solid #8ce2cb; outline-offset: 4px; }
        .ty-help {
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
          margin-top: 28px; padding: 19px 21px; border: 1px solid var(--ty-line);
          border-radius: 15px; background: rgba(12, 28, 44, .78);
        }
        .ty-help strong { display: block; margin-bottom: 4px; color: #eef3f7; font-size: 13px; }
        .ty-help p { margin: 0; color: #aab9c6; font-size: 11px; line-height: 1.6; }
        .ty-help-mark { flex: 0 0 auto; color: #80d9c2; font-size: 22px; }
        .ty-footer { margin: 25px 0 0; color: #718395; font-size: 10px; line-height: 1.7; text-align: center; }
        .ty-footer-disclaimer { display: block; max-width: 760px; margin: 9px auto 0; color: #687b8d; font-size: 8px; line-height: 1.5; }
        @media (max-width: 650px) {
          .ty-page { padding: 23px 13px 42px; }
          .ty-topbar { margin-bottom: 24px; }
          .ty-hero { padding: 32px 20px 28px; border-radius: 19px; }
          .ty-hero-copy { font-size: 13px; }
          .ty-steps { grid-template-columns: 1fr; gap: 9px; }
          .ty-step { min-height: 0; padding: 15px 16px; }
          .ty-step-number { float: left; margin: 0 12px 18px 0; }
          .ty-step h3 { padding-top: 2px; }
          .ty-offer { margin-top: 32px; padding: 22px 18px; }
          .ty-offer-layout { grid-template-columns: 1fr; gap: 20px; }
          .ty-includes { grid-template-columns: 1fr; }
          .ty-product-art { min-height: 150px; max-width: 100%; }
          .ty-help { align-items: flex-start; }
        }
      `}</style>

      <div className="ty-shell">
        <header className="ty-topbar">
          <span className="ty-logo" aria-hidden="true">✓</span>
          <span className="ty-brand">BLINDA BOLSA FAMÍLIA</span>
        </header>

        <section className="ty-hero" aria-labelledby="ty-title">
          <div className="ty-status"><span className="ty-status-dot" /> COMPRA CONFIRMADA</div>
          <div className="ty-check" aria-hidden="true">✓</div>
          <h1 id="ty-title">Sua compra foi confirmada.<br /><span>Agora começa sua jornada.</span></h1>
          <p className="ty-hero-copy">
            Obrigado por confiar no Blinda Bolsa Família. Preparamos este espaço para
            orientar você sobre os próximos passos e ajudar a aproveitar melhor seu material.
          </p>
          <div className="ty-reassurance"><span>✓</span> Esta é a página oficial de confirmação da sua compra.</div>
        </section>

        <section aria-labelledby="ty-start-title">
          <div className="ty-section-heading">
            <p className="ty-kicker">PRÓXIMOS PASSOS</p>
            <h2 id="ty-start-title">Veja o que fazer agora</h2>
            <p>Reserve alguns minutos para localizar seu acesso e começar com tranquilidade.</p>
          </div>
          <div className="ty-steps">
            <article className="ty-step">
              <span className="ty-step-number">01</span>
              <h3>Localize a confirmação</h3>
              <p>Confira o e-mail informado na compra e procure a mensagem de confirmação e as instruções da plataforma.</p>
            </article>
            <article className="ty-step">
              <span className="ty-step-number">02</span>
              <h3>Encontre seu material</h3>
              <p>Se não encontrar a mensagem, verifique também as pastas de spam, lixo eletrônico e promoções.</p>
            </article>
            <article className="ty-step">
              <span className="ty-step-number">03</span>
              <h3>Comece com atenção</h3>
              <p>Leia ou assista ao conteúdo com calma e siga as orientações na ordem apresentada no material.</p>
            </article>
          </div>
        </section>

        <section className="ty-offer" aria-labelledby="ty-offer-title">
          <div className="ty-offer-copy">
            <span className="ty-offer-label">CONTEÚDO EXTRA PARA VOCÊ</span>
            <h2 id="ty-offer-title">QUER APRENDER A BUSCAR UM <span>LIMITE MAIOR</span> NO CARTÃO?</h2>
            <div className="ty-offer-sales-copy">
              <p>Além do seu material, preparamos um conteúdo sobre como buscar um limite melhor no cartão e uma dica bônus de instituição que divulga opções para quem está com o nome negativado.</p>
              <p>Responda a 5 perguntas rápidas. No final, você verá o conteúdo e poderá decidir se faz sentido para você.</p>
              <p><strong>É gratuito. Não pediremos CPF, senha nem dados bancários.</strong></p>
            </div>
            <div className="ty-buy-wrap">
              <a className="ty-buy-button" href="/quiz-credito">QUERO VER COMO BUSCAR UM LIMITE MAIOR →</a>
            </div>
          </div>
        </section>

        <aside className="ty-help">
          <div>
            <strong>Não encontrou as instruções de acesso?</strong>
            <p>Confira o e-mail utilizado na compra e as pastas de spam ou promoções. Se necessário, consulte o histórico do pedido na plataforma de pagamento.</p>
          </div>
          <span className="ty-help-mark" aria-hidden="true">?</span>
        </aside>

        <footer className="ty-footer">
          BLINDA BOLSA FAMÍLIA · Obrigado pela confiança.<br />
          Utilize as informações do material como orientação e consulte sempre os canais oficiais para questões sobre seu benefício.
          <small className="ty-footer-disclaimer">
            *Importante: o conteúdo é educativo e informativo. Não garante aumento de score, aprovação de cartão, concessão de crédito ou aumento de limite. Cada instituição possui seus próprios critérios de análise.
          </small>
        </footer>
      </div>
    </main>
  );
}
