import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/oferta-especial")({
  head: () => ({
    meta: [
      { title: "Condição especial | Aumenta Score + Bônus" },
      {
        name: "description",
        content: "Acesse o curso em videoaulas Aumenta Score + Bônus por uma condição especial.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SpecialOfferPage,
});

function SpecialOfferPage() {
  return (
    <main className="ds-page">
      <style>
        @keyframes ds-gentle-pulse{0%,100%{transform:scale(1);box-shadow:0 10px 28px rgba(211,166,40,.2),inset 0 1px rgba(255,255,255,.45)}50%{transform:scale(1.018);box-shadow:0 13px 32px rgba(211,166,40,.32),inset 0 1px rgba(255,255,255,.45)}}
        @media(prefers-reduced-motion:reduce){.ds-cta{animation:none}}
{`
        html:has(.ds-page), body:has(.ds-page) { margin:0!important; min-height:100%; background:#071321!important; }
        .ds-page,.ds-page *{box-sizing:border-box}
        .ds-page{min-height:100vh;min-height:100svh;padding:24px 15px 42px;color:#f7f9fc;background:radial-gradient(ellipse at 50% -8%,rgba(25,112,121,.32),transparent 48%),radial-gradient(ellipse at 100% 70%,rgba(230,190,83,.09),transparent 38%),#071321;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
        .ds-shell{width:100%;max-width:760px;margin:0 auto}
        .ds-brand{display:flex;justify-content:center;align-items:center;gap:9px;margin:3px 0 23px;font-size:11px;font-weight:900;letter-spacing:.15em;color:#e8eef2}
        .ds-mark{display:grid;place-items:center;width:31px;height:31px;border:1px solid rgba(255,209,46,.5);border-radius:10px;color:#ffd12e;background:rgba(255,209,46,.08);font-size:16px}
        .ds-card{overflow:hidden;padding:clamp(23px,5vw,38px);border:1px solid rgba(255,209,46,.3);border-radius:22px;background:radial-gradient(ellipse at 100% 0%,rgba(255,209,46,.12),transparent 40%),linear-gradient(145deg,#0b3542,#082735 72%);box-shadow:0 24px 70px rgba(0,0,0,.34)}
        .ds-eyebrow{display:inline-flex;padding:8px 12px;border:1px solid rgba(255,209,46,.28);border-radius:999px;color:#ffe05a;background:rgba(255,209,46,.07);font-size:10px;font-weight:900;letter-spacing:.13em}
        .ds-card h1{max-width:650px;margin:18px auto 12px;color:#fff;font-size:clamp(27px,5.6vw,44px);line-height:1.12;letter-spacing:-.035em;text-align:center;text-wrap:balance;overflow-wrap:normal}
        .ds-card h1 span{color:#ffd12e}
        .ds-lead{max-width:590px;margin:0 auto;color:#d0dce2;font-size:15px;line-height:1.75;text-align:center}
        .ds-callout{margin:23px 0 0;padding:17px 18px;border:1px solid rgba(111,224,197,.22);border-radius:14px;background:rgba(4,20,30,.38);color:#e8f4f1;font-size:14px;line-height:1.65;text-align:center}
        .ds-callout strong{color:#8ce2cb}
        .ds-image{display:flex;justify-content:center;margin:25px auto 20px}
        .ds-image img{display:block;width:min(100%,330px);height:auto;border:1px solid rgba(255,209,46,.3);border-radius:13px;box-shadow:0 15px 35px rgba(0,0,0,.38)}
        .ds-includes{margin:22px 0 0;padding:21px;border:1px solid rgba(255,255,255,.1);border-radius:15px;background:rgba(4,20,30,.32)}
        .ds-includes h2{margin:0 0 14px;color:#ffe05a;font-size:15px;letter-spacing:.02em}
        .ds-list{display:grid;gap:12px;margin:0;padding:0;list-style:none;color:#dce6eb;font-size:13px;line-height:1.6}
        .ds-list li{display:flex;gap:10px;align-items:flex-start}
        .ds-check{flex:0 0 auto;color:#8ce2cb;font-weight:900}
        .ds-price-label{margin:25px 0 3px;color:#c1d0d8;font-size:12px;text-align:center}
        .ds-price{color:#ffe05a;font-size:clamp(48px,9vw,62px);font-weight:950;letter-spacing:-.06em;line-height:1.05;text-align:center}
        .ds-payment{margin:7px 0 19px;color:#b8c8d1;font-size:11px;text-align:center}
        .ds-cta{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;max-width:500px;min-height:59px;margin:0 auto;padding:15px 18px;border:1px solid rgba(255,245,190,.7);border-radius:13px;color:#152432;background:linear-gradient(135deg,#ffe05a,#e9b900);box-shadow:0 10px 28px rgba(211,166,40,.2),inset 0 1px rgba(255,255,255,.45);font-size:14px;font-weight:950;text-align:center;text-decoration:none;transform-origin:center;animation:ds-gentle-pulse 2.4s ease-in-out infinite}
        .ds-cta:hover{filter:brightness(1.06)}
        .ds-note{max-width:550px;margin:12px auto 0;color:#9aabb6;font-size:10px;line-height:1.65;text-align:center}
        .ds-decline{display:block;width:fit-content;margin:23px auto 0;color:#b8c5d0;font-size:12px;text-align:center;text-decoration:underline;text-underline-offset:4px}
        .ds-decline:hover{color:#fff}
        .ds-footer{margin-top:19px;color:#718695;font-size:10px;line-height:1.7;text-align:center}
        @media(max-width:560px){.ds-page{padding:19px 12px 32px}.ds-card{border-radius:18px;padding:24px 17px}.ds-card h1{max-width:420px;font-size:clamp(25px,7.2vw,32px);line-height:1.14;letter-spacing:-.025em;text-wrap:balance}.ds-lead{font-size:14px;line-height:1.65}.ds-includes{padding:17px 14px}.ds-cta{font-size:13px;line-height:1.35;padding:14px 12px}}
      `}</style>
      <div className="ds-shell">
        <header className="ds-brand">
          <span className="ds-mark" aria-hidden="true">✓</span>
          <span>BLINDA BOLSA FAMÍLIA</span>
        </header>
        <section className="ds-card">
          <div style={{textAlign:"center"}}>
            <span className="ds-eyebrow">ANTES DE ENCERRAR</span>
          </div>
          <h1>QUER APRENDER A BUSCAR UM <span>LIMITE MELHOR</span> SEM PAGAR R$ 29?</h1>
          <p className="ds-lead">
            Entendemos. Talvez você queira conhecer o conteúdo, mas prefira investir menos agora.
            Por isso, liberamos nesta página uma condição especial para acessar o Aumenta Score + Bônus.
          </p>
          <div className="ds-callout">
            <strong>Você continua recebendo o mesmo pacote apresentado anteriormente</strong>, agora por um valor menor nesta oferta.
          </div>
          <div className="ds-image">
            <img src="/aumenta-score-capa.jpg" alt="Capa do curso Aumenta Score — Limite de Cartão de Crédito" />
          </div>
          <div className="ds-includes">
            <h2>O QUE ESTÁ INCLUÍDO</h2>
            <ul className="ds-list">
              <li><span className="ds-check">✓</span><span><strong>Curso em videoaulas:</strong> entenda o score e fatores que podem ser considerados na análise de crédito.</span></li>
              <li><span className="ds-check">✓</span><span><strong>Bônus sobre uma instituição:</strong> conheça a instituição apresentada no material, que divulga opções para quem está negativado.</span></li>
              <li><span className="ds-check">✓</span><span><strong>Acesso ao material:</strong> assista às aulas no seu ritmo e consulte o conteúdo quando precisar.</span></li>
            </ul>
          </div>
          <p className="ds-price-label">CONDIÇÃO ESPECIAL · PAGAMENTO ÚNICO</p>
          <div className="ds-price">R$ 9,90</div>
          <p className="ds-payment">O pacote completo por menos de dez reais</p>
          <a className="ds-cta" href="https://pay.cakto.com.br/fmr7mje" target="_blank" rel="noopener noreferrer">
            QUERO ACESSAR POR R$ 9,90 <span aria-hidden="true">→</span>
          </a>
          <p className="ds-note">
            Conteúdo educativo e informativo. Não garante aumento de score, aprovação de cartão, concessão de crédito ou aumento de limite. Cada instituição possui seus próprios critérios de análise.
          </p>
          <a className="ds-decline" href="/">Não quero aproveitar esta condição</a>
        </section>
        <footer className="ds-footer">
          BLINDA BOLSA FAMÍLIA · Para informações sobre benefícios sociais, consulte sempre os canais oficiais.
        </footer>
      </div>
    </main>
  );
}
