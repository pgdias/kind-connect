import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Compra confirmada | Blinda Bolsa Família" },
      {
        name: "description",
        content: "Confirmação da compra do Blinda Bolsa Família e informações sobre o material complementar Aumenta Score + BÔNUS.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <main className="thankyou-page">
      <style>{`
        .thankyou-page {
          min-height: 100vh;
          padding: 48px 20px 64px;
          color: #f5f7fb;
          background:
            radial-gradient(ellipse at 50% -15%, rgba(40, 112, 160, .24), transparent 55%),
            #071321;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .thankyou-wrap { width: 100%; max-width: 760px; margin: 0 auto; }
        .thankyou-brand {
          display: flex; justify-content: center; align-items: center; gap: 10px;
          margin: 0 auto 38px; color: #eaf3fb; font-size: 13px; font-weight: 800;
          letter-spacing: .12em; text-align: center;
        }
        .thankyou-brand-mark {
          display: grid; place-items: center; width: 30px; height: 30px;
          border: 1px solid rgba(105, 211, 190, .55); border-radius: 9px;
          color: #72dfc6; font-size: 17px;
        }
        .thankyou-confirmation {
          padding: 38px 28px; border: 1px solid rgba(116, 213, 194, .22);
          border-radius: 22px; background: linear-gradient(145deg, rgba(17, 43, 59, .96), rgba(10, 27, 43, .96));
          text-align: center; box-shadow: 0 22px 70px rgba(0,0,0,.22);
        }
        .thankyou-check {
          display: grid; place-items: center; width: 58px; height: 58px; margin: 0 auto 20px;
          border-radius: 50%; background: rgba(71, 195, 161, .14); color: #76e2c5;
          border: 1px solid rgba(118, 226, 197, .42); font-size: 28px; font-weight: 700;
        }
        .thankyou-eyebrow { margin: 0 0 12px; color: #83ddc8; font-size: 11px; font-weight: 800; letter-spacing: .16em; }
        .thankyou-confirmation h1 { margin: 0; color: #fff; font-size: clamp(25px, 5vw, 37px); line-height: 1.16; letter-spacing: -.035em; }
        .thankyou-confirmation p { margin: 16px 0 0; color: #c3d0dc; font-size: 15px; line-height: 1.65; }
        .thankyou-next { margin: 15px 0 0 !important; color: #f1f6fa !important; font-weight: 650; }
        .thankyou-offer { margin-top: 28px; padding: 30px; border: 1px solid rgba(224, 190, 111, .35); border-radius: 22px; background: linear-gradient(145deg, #17283a, #101d2c); }
        .thankyou-offer-label { display: inline-block; padding: 7px 11px; border-radius: 999px; background: rgba(220, 184, 103, .13); color: #e9c979; font-size: 10px; font-weight: 800; letter-spacing: .13em; }
        .thankyou-offer h2 { margin: 18px 0 8px; color: #fff; font-size: clamp(24px, 4vw, 32px); line-height: 1.15; letter-spacing: -.025em; }
        .thankyou-offer h2 span { color: #e9c979; }
        .thankyou-offer-intro { margin: 0; color: #c5d1dd; font-size: 14px; line-height: 1.65; }
        .thankyou-benefits { display: grid; gap: 12px; margin: 22px 0; padding: 0; list-style: none; }
        .thankyou-benefits li { display: flex; gap: 10px; color: #e4ebf1; font-size: 14px; line-height: 1.5; }
        .thankyou-benefits li::before { content: "✓"; flex: 0 0 auto; color: #e9c979; font-weight: 800; }
        .thankyou-bonus { margin-top: 18px; padding: 16px 18px; border-radius: 13px; background: rgba(232, 201, 121, .08); border: 1px solid rgba(232, 201, 121, .2); }
        .thankyou-bonus strong { display: block; margin-bottom: 5px; color: #f0d58f; font-size: 12px; letter-spacing: .08em; }
        .thankyou-bonus p { margin: 0; color: #d0d9e2; font-size: 13px; line-height: 1.55; }
        .thankyou-disclaimer { margin: 18px 0 0; color: #9eacba; font-size: 11px; line-height: 1.55; }
        .thankyou-footer { margin: 24px 0 0; color: #8393a3; font-size: 11px; text-align: center; }
        @media (max-width: 520px) {
          .thankyou-page { padding: 30px 14px 44px; }
          .thankyou-confirmation { padding: 30px 20px; }
          .thankyou-offer { padding: 24px 20px; }
        }
      `}</style>

      <div className="thankyou-wrap">
        <div className="thankyou-brand">
          <span className="thankyou-brand-mark">✓</span>
          <span>BLINDA BOLSA FAMÍLIA</span>
        </div>

        <section className="thankyou-confirmation" aria-labelledby="thankyou-title">
          <div className="thankyou-check" aria-hidden="true">✓</div>
          <p className="thankyou-eyebrow">COMPRA CONFIRMADA</p>
          <h1 id="thankyou-title">Você acabou de adquirir o Blinda Bolsa Família! 🎉</h1>
          <p className="thankyou-next">Agora é só acessar seu material e conferir tudo com calma.</p>
        </section>

        <section className="thankyou-offer" aria-labelledby="thankyou-offer-title">
          <span className="thankyou-offer-label">CONTEÚDO COMPLEMENTAR</span>
          <h2 id="thankyou-offer-title">Aumenta Score <span>+ BÔNUS</span></h2>
          <p className="thankyou-offer-intro">
            Aprenda a entender melhor seu score e conhecer hábitos que podem contribuir
            para organizar seu perfil de crédito ao longo do tempo.
          </p>
          <ul className="thankyou-benefits">
            <li>Entenda o que é o score e quais fatores podem influenciá-lo.</li>
            <li>Conheça práticas de organização financeira e cuidados com o crédito.</li>
            <li>Saiba o que avaliar antes de solicitar cartão ou crédito.</li>
          </ul>
          <div className="thankyou-bonus">
            <strong>🎁 BÔNUS EXCLUSIVO</strong>
            <p>
              Um guia informativo sobre alternativas de crédito para quem está com
              restrição no CPF, incluindo cuidados para identificar propostas arriscadas.
            </p>
          </div>
          <p className="thankyou-disclaimer">
            O score pode variar e a concessão de cartão, limite ou crédito depende dos
            critérios de cada instituição. Não há garantia de aprovação ou aumento de limite.
          </p>
        </section>

        <p className="thankyou-footer">Obrigado pela confiança. Leia as informações com atenção.</p>
      </div>
    </main>
  );
}
