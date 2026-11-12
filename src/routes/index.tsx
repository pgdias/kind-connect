import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackEvent } from "../lib/api";

const CHECKOUT_URL = "https://pay.cakto.com.br/38xq22v_1131074";

export const Route = createFileRoute("/")({ component: TslSalesPage });

function BuyButton({ placement }: { placement: string }) {
  return (
    <a
      className="bl-buy"
      href={CHECKOUT_URL}
      onClick={() => { void trackEvent("checkout_click", { page: "/", checkout_provider: "cakto", funnel: "tsl", placement }); }}
    >
      <span>QUERO ACESSAR O TREINAMENTO</span><b aria-hidden="true">➜</b>
    </a>
  );
}

function Section({ children, tone = "light", id }: { children: React.ReactNode; tone?: "light" | "soft" | "dark" | "yellow"; id?: string }) {
  return <section id={id} className={`bl-section bl-${tone}`}><div className="bl-container bl-copy">{children}</div></section>;
}

function TslSalesPage() {
  useEffect(() => { void trackEvent("tsl_landing_viewed"); }, []);
  return (
    <main className="bl-page">
      <style>{`
        .bl-page{--navy:#061b42;--navy2:#0b2d63;--yellow:#ffd21a;--red:#e5232b;--green:#159b2b;--ink:#10213f;--muted:#53627a;background:#fff;color:var(--ink);font-family:Arial,Helvetica,sans-serif;overflow:hidden;padding-bottom:0}
        .bl-page *{box-sizing:border-box}.bl-container{width:min(100% - 36px,880px);margin-inline:auto}
        .bl-topline{background:#03132f;color:#fff;text-align:center;padding:9px 12px;font-size:11px;font-weight:900;letter-spacing:.1em}
        .bl-hero{background:radial-gradient(circle at 80% 0%,#17457c 0,transparent 36%),linear-gradient(145deg,#04132f,#08285a 72%,#073c43);color:#fff;padding:clamp(30px,6vw,62px) 0 44px;text-align:center}
        .bl-brand{font-size:clamp(22px,4vw,30px);font-weight:1000;letter-spacing:-.8px;margin-bottom:20px}.bl-brand em{font-style:normal;color:var(--yellow)}
        .bl-alert{display:inline-block;background:var(--red);color:white;border-radius:5px;padding:8px 12px;font-size:11px;font-weight:1000;letter-spacing:.08em}
        .bl-hero h1{max-width:850px;margin:19px auto 16px;font-size:clamp(30px,5.3vw,52px);line-height:1.05;letter-spacing:-1.2px;font-weight:1000;text-transform:uppercase}
        .bl-hero h1 strong{color:var(--yellow)}.bl-hero-sub{max-width:700px;margin:0 auto 18px;font-size:clamp(16px,2.2vw,19px);line-height:1.55;color:#e9f0ff}
        .bl-top-price{font-size:18px;font-weight:900;margin:17px auto 5px}.bl-top-price strong{color:var(--yellow);font-size:28px}.bl-payment-note{font-size:12px;color:#d8e3f7;margin:0 auto 10px}
        .bl-section{padding:clamp(34px,5.5vw,58px) 0}.bl-light{background:#fff}.bl-soft{background:#f1f5fb}.bl-dark{background:var(--navy);color:#fff}.bl-yellow{background:#fff7d6}
        .bl-copy{max-width:760px}.bl-copy p{font-size:17px;line-height:1.7;margin:0 0 14px;color:inherit}
        .bl-copy h2{font-size:clamp(26px,4.5vw,39px);line-height:1.1;letter-spacing:-.7px;font-weight:1000;margin:0 0 17px;color:var(--navy)}
        .bl-dark .bl-copy h2{color:var(--yellow)}.bl-copy h3{font-size:clamp(19px,3vw,24px);line-height:1.2;font-weight:1000;margin:23px 0 12px;color:inherit}
        .bl-copy strong{font-weight:1000}.bl-impact{font-size:clamp(22px,4vw,31px)!important;line-height:1.16!important;font-weight:1000;color:var(--red)!important;margin:17px 0!important}
        .bl-dark .bl-impact{color:var(--yellow)!important}.bl-copy ul{list-style:none;padding:0;margin:17px 0 22px}
        .bl-copy li{position:relative;padding:13px 14px 13px 43px;margin:9px 0;border-radius:10px;background:#f1f5fb;font-size:16px;line-height:1.5;color:#182b4c}
        .bl-copy li:before{content:"✓";position:absolute;left:15px;top:12px;color:var(--green);font-size:19px;font-weight:1000}
        .bl-dark .bl-copy li{background:#ffffff12;color:#fff}.bl-dark .bl-copy li:before{color:var(--yellow)}
        .bl-buy{display:flex;align-items:center;justify-content:center;gap:12px;width:min(100%,590px);min-height:60px;padding:15px 18px;margin:22px auto 10px;border-radius:12px;background:linear-gradient(180deg,#26c441,#087b20);border:2px solid #aaff9b;color:#fff;text-align:center;text-decoration:none;font-size:clamp(14px,2vw,17px);line-height:1.2;font-weight:1000;box-shadow:0 6px 0 #07551a,0 12px 24px #0002;transition:transform .15s ease}
        .bl-buy:hover{transform:translateY(-2px)}.bl-buy b{font-size:22px;flex:none}.bl-buy-note{text-align:center!important;font-size:12px!important;line-height:1.5!important;color:#68768b!important;margin:9px auto 0!important}
        .bl-dark .bl-buy-note{color:#d9e5f7!important}.bl-price-card{background:#fff;border:2px solid #ffdb4c;border-radius:16px;padding:24px 20px;text-align:center;color:var(--navy);box-shadow:0 12px 30px #001b4420;margin:22px 0}
        .bl-price-card .bl-price{font-size:clamp(42px,8vw,58px);font-weight:1000;line-height:1.05;color:var(--green);margin:9px 0}.bl-price-card p{color:#33445e}
        .bl-feature-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:20px 0}
        .bl-feature{background:#fff;border:1px solid #dce5f0;border-radius:12px;padding:17px;color:#182b4c}
        .bl-feature b{display:block;color:var(--navy);font-size:16px;margin-bottom:6px}.bl-feature span{font-size:14px;line-height:1.5}
        .bl-faq details{background:#fff;border:1px solid #dce4ef;border-radius:12px;padding:15px;margin:9px 0;box-shadow:0 3px 10px #001b4408}
        .bl-faq summary{cursor:pointer;font-size:15px;line-height:1.4;font-weight:900;color:var(--navy);list-style:none;display:flex;justify-content:space-between;gap:14px}
        .bl-faq summary:after{content:"+";font-size:22px;color:var(--green);line-height:1}.bl-faq details[open] summary:after{content:"−"}
        .bl-faq details p{font-size:14px;line-height:1.6;color:#4a5b74;margin:12px 0 0}
        .bl-sticky{display:none}.bl-disclaimer{font-size:12px!important;line-height:1.6!important;color:#66758b!important;text-align:center;margin-top:22px!important}
        @media(max-width:700px){
          .bl-container{width:calc(100% - 32px)}.bl-topline{font-size:9px;padding:9px 7px}
          .bl-hero{padding:25px 0 31px}.bl-brand{font-size:23px;margin-bottom:17px}.bl-alert{font-size:9px;line-height:1.3}
          .bl-hero h1{font-size:clamp(29px,8.5vw,40px);line-height:1.06;letter-spacing:-.8px;margin:16px auto 13px}
          .bl-hero-sub{font-size:15px;line-height:1.5}.bl-top-price{font-size:16px}.bl-top-price strong{font-size:25px}
          .bl-section{padding:32px 0}.bl-copy p{font-size:16px;line-height:1.65;margin-bottom:13px}
          .bl-copy h2{font-size:27px;line-height:1.12;margin-bottom:14px}.bl-copy h3{font-size:20px;margin:20px 0 11px}
          .bl-copy li{font-size:15px;line-height:1.5;padding:12px 12px 12px 40px}.bl-copy li:before{left:13px;top:11px}
          .bl-buy{min-height:57px;padding:13px 11px;font-size:13px;gap:8px;border-radius:11px;margin:19px auto 10px}
          .bl-feature-grid{grid-template-columns:1fr;gap:9px;margin:16px 0}.bl-feature{padding:14px}
          .bl-faq summary{font-size:14px}.bl-faq details{padding:13px}
          .bl-sticky{display:block;position:fixed;z-index:1000;left:0;right:0;bottom:0;padding:8px 12px calc(9px + env(safe-area-inset-bottom));background:#fffffff2;border-top:1px solid #dce4ef;backdrop-filter:blur(10px)}
          .bl-sticky .bl-buy{margin:0 auto;min-height:48px;max-width:590px;font-size:12px;box-shadow:0 4px 0 #07551a}
          .bl-page{padding-bottom:74px}
        }
        @media(max-width:360px){.bl-hero h1{font-size:28px}.bl-copy p{font-size:15px}.bl-buy{font-size:11px}}
        @media(prefers-reduced-motion:reduce){.bl-buy{transition:none}}
      `}</style>

      <div className="bl-topline">BLINDA BOLSA FAMÍLIA • TREINAMENTO DIGITAL INDEPENDENTE</div>

      <header className="bl-hero">
        <div className="bl-container">
          <div className="bl-brand">🔒 BLINDA <em>BOLSA FAMÍLIA</em></div>
          <span className="bl-alert">INFORMAÇÃO PARA QUEM RECEBE O BENEFÍCIO</span>
          <h1>VOCÊ CONHECE OS 10 DESCUIDOS DO DIA A DIA QUE MERECEM ATENÇÃO NO <strong>BOLSA FAMÍLIA?</strong></h1>
          <p className="bl-hero-sub">Um treinamento simples e direto para você conhecer situações que podem passar despercebidas, entender por que merecem atenção e saber o que observar na sua rotina.</p>
          <p className="bl-top-price">Acesso por <strong>R$ 12,99</strong></p>
          <p className="bl-payment-note">Pagamento único • Treinamento digital</p>
          <BuyButton placement="topo"/>
        </div>
      </header>

      <Section>
        <h2>UMA SITUAÇÃO QUE NINGUÉM QUER ENFRENTAR</h2>
        <p>Imagine abrir o Caixa Tem no dia do pagamento e perceber que o dinheiro não caiu. Você espera, consulta novamente e tenta descobrir o que aconteceu.</p>
        <p>Depois de procurar informação, descobre que existe um problema com o benefício. A preocupação vem junto com várias perguntas: <strong>será que havia algo que eu precisava observar e não percebi?</strong></p>
        <p className="bl-impact">Conhecer as regras e os cuidados importantes faz diferença.</p>
        <p>Foi dessa preocupação — e da experiência do responsável pelo projeto com o próprio benefício — que surgiu a ideia do Blinda Bolsa Família.</p>
      </Section>

      <Section tone="dark">
        <h2>O QUE VOCÊ VAI ENCONTRAR NO TREINAMENTO?</h2>
        <p>O Blinda Bolsa Família reúne, em aulas em vídeo e linguagem simples, <strong>10 erros e descuidos que merecem atenção</strong> para quem recebe o benefício.</p>
        <div className="bl-feature-grid">
          <div className="bl-feature"><b>01. Os 10 pontos de atenção</b><span>Conheça os erros e descuidos apresentados no treinamento.</span></div>
          <div className="bl-feature"><b>02. Explicação simples</b><span>Entenda por que cada situação merece ser observada.</span></div>
          <div className="bl-feature"><b>03. Atenção à rotina</b><span>Saiba o que observar para identificar possíveis descuidos.</span></div>
          <div className="bl-feature"><b>04. Orientação prática</b><span>Veja quais cuidados considerar quando algo exigir atenção.</span></div>
        </div>
        <p>O conteúdo foi organizado para ser acompanhado pelo celular ou computador, sem exigir conhecimento técnico.</p>
      </Section>

      <Section tone="soft">
        <h2>PARA QUEM É O BLINDA?</h2>
        <ul>
          <li>Para quem recebe o Bolsa Família e quer entender melhor os cuidados relacionados ao benefício.</li>
          <li>Para quem prefere aprender por vídeos curtos e explicações em linguagem simples.</li>
          <li>Para quem quer identificar situações que merecem atenção, em vez de depender de informações soltas.</li>
        </ul>
        <p><strong>É um conteúdo educativo.</strong> Não substitui os canais oficiais nem a consulta às regras atualizadas do programa.</p>
      </Section>

      <Section>
        <h2>ACESSO AO TREINAMENTO</h2>
        <p>Você terá acesso ao conteúdo digital do Blinda Bolsa Família, com as aulas sobre os 10 erros e descuidos, suas explicações e orientações sobre o que observar.</p>
        <div className="bl-price-card">
          <p><strong>BLINDA BOLSA FAMÍLIA</strong></p>
          <div className="bl-price">R$ 12,99</div>
          <p><strong>Pagamento único. Sem mensalidade.</strong></p>
          <p>Treinamento digital para assistir pelo celular ou computador.</p>
          <BuyButton placement="oferta"/>
          <p className="bl-buy-note">A compra é realizada em ambiente de pagamento seguro da Cakto.</p>
        </div>
      </Section>

      <Section tone="soft" id="duvidas">
        <h2>DÚVIDAS FREQUENTES</h2>
        <div className="bl-faq">
          <details><summary>Como recebo o treinamento?</summary><p>O treinamento é digital. As instruções de acesso são apresentadas após a confirmação da compra.</p></details>
          <details><summary>Posso assistir pelo celular?</summary><p>Sim. O conteúdo é online e pode ser acompanhado pelo celular ou computador com acesso à internet.</p></details>
          <details><summary>O pagamento é mensal?</summary><p>Não. O valor informado é R$ 12,99, pago uma única vez.</p></details>
          <details><summary>O treinamento garante que meu benefício não será bloqueado ou cancelado?</summary><p>Não. O treinamento é educativo e não garante manutenção, desbloqueio ou aprovação do Bolsa Família.</p></details>
          <details><summary>O Blinda Bolsa Família é do governo?</summary><p>Não. É um treinamento digital independente, sem vínculo com o Governo Federal ou com a gestão oficial do programa.</p></details>
        </div>
      </Section>

      <Section tone="dark">
        <h2>INFORMAÇÃO PARA AGIR COM MAIS ATENÇÃO.</h2>
        <p>Você não precisa esperar surgir uma dúvida para começar a entender quais cuidados merecem atenção.</p>
        <p>Conheça o conteúdo do Blinda Bolsa Família e veja se ele faz sentido para você.</p>
        <p className="bl-impact">Acesso por R$ 12,99.</p>
        <BuyButton placement="fechamento"/>
        <p className="bl-disclaimer">Produto educativo independente. Não é oferecido, aprovado ou endossado pelo Governo Federal. Não garante manutenção ou regularização do benefício.</p>
      </Section>

      <div className="bl-sticky"><BuyButton placement="fixo-mobile"/></div>
    </main>
  );
}
