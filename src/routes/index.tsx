import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackEvent } from "../lib/api";

// Vídeos reais podem ser adicionados aqui quando os arquivos/URLs forem fornecidos.
// Não exibimos depoimentos fictícios nem reutilizamos a VSL antiga como demonstração do curso.
const COURSE_PRESENTATION_VIDEO = "";
const TESTIMONIAL_VIDEO_ONE = "";
const TESTIMONIAL_VIDEO_TWO = "";
const CHECKOUT_URL = "https://pay.cakto.com.br/38xq22v_1131074";

export const Route = createFileRoute("/")({ component: TslSalesPage });

function VideoBlock({ src, title, eyebrow }: { src: string; title: string; eyebrow: string }) {
  if (!src) return null;
  return (
    <section className="tsl-video-block">
      <p className="tsl-eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <div className="tsl-video-frame">
        <iframe src={src} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      </div>
    </section>
  );
}

function BuyButton({ label = "QUERO ACESSAR O BLINDA BOLSA FAMÍLIA" }: { label?: string }) {
  return (
    <a className="tsl-buy-button" href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" onClick={() => { void trackEvent("checkout_click", { page: "/", checkout_provider: "cakto", funnel: "tsl" }); }}>
      {label}<span aria-hidden="true"> →</span>
    </a>
  );
}

function TslSalesPage() {
  useEffect(() => {
    void trackEvent("tsl_landing_viewed");
  }, []);

  return (
    <main className="tsl-page">
      <style>{`
        .tsl-page{--ink:#14251d;--green:#145b3b;--deep:#092d1e;--gold:#d5b66b;--muted:#64736b;background:#f7f8f5;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;overflow:hidden}
        .tsl-page *{box-sizing:border-box}.tsl-shell{width:min(100% - 36px,880px);margin:0 auto}.tsl-top{background:#092d1e;color:#fff;text-align:center;padding:11px 14px;font-size:11px;font-weight:800;letter-spacing:.07em}.tsl-hero{padding:38px 0 30px;text-align:center;background:radial-gradient(ellipse at 50% 0%,#e7efe7 0%,#f7f8f5 70%)}
        .tsl-label{display:inline-flex;align-items:center;gap:8px;border:1px solid #d9e4db;background:#fff;border-radius:99px;padding:8px 13px;color:#236044;font-size:10px;font-weight:900;letter-spacing:.1em}.tsl-label:before{content:"";width:7px;height:7px;background:#2d9861;border-radius:50%}
        .tsl-hero h1{max-width:820px;margin:20px auto 15px;font-size:clamp(32px,6vw,55px);line-height:1.03;letter-spacing:-.045em;color:#102d20;font-weight:950}.tsl-hero h1 em{font-style:normal;color:#b3262e}.tsl-lead{max-width:710px;margin:0 auto;color:#52635a;font-size:clamp(15px,2.4vw,18px);line-height:1.65}.tsl-hero-image{display:block;width:min(100%,700px);height:auto;margin:26px auto 0;border-radius:17px;box-shadow:0 16px 42px #173a281c}
        .tsl-section{padding:48px 0}.tsl-section.white{background:#fff}.tsl-section.dark{background:#092d1e;color:#fff}.tsl-section h2{font-size:clamp(26px,4.5vw,39px);line-height:1.12;letter-spacing:-.035em;text-align:center;margin:0 auto 16px;max-width:760px}.tsl-section p{font-size:15px;line-height:1.8;color:#58675f}.tsl-section.dark p{color:#d0ddd5}.tsl-center{text-align:center}.tsl-eyebrow{text-align:center!important;color:#ad3035!important;font-size:10px!important;font-weight:950;letter-spacing:.15em;text-transform:uppercase;margin:0 0 10px!important}.tsl-callout{background:#fff;border:1px solid #e1e8e2;border-left:4px solid #b62c32;border-radius:12px;padding:19px 21px;margin:24px 0;color:#31463a;font-size:15px;line-height:1.7;box-shadow:0 8px 24px #173a2809}
        .tsl-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin:27px 0}.tsl-card{background:#fff;border:1px solid #e1e8e2;border-radius:13px;padding:19px}.tsl-card b{display:block;color:#143c28;font-size:15px;margin-bottom:7px}.tsl-card p{font-size:13px;margin:0;line-height:1.65}.tsl-num{display:grid;place-items:center;width:31px;height:31px;border-radius:9px;background:#edf4ee;color:#1b6a43;font-weight:950;font-size:12px;margin-bottom:13px}
        .tsl-video-block{margin:28px auto 0;max-width:700px;text-align:center}.tsl-video-block h3{font-size:22px;line-height:1.2;margin:0 0 16px}.tsl-video-frame{position:relative;aspect-ratio:16/9;background:#071b12;border-radius:14px;overflow:hidden;box-shadow:0 16px 38px #0002}.tsl-video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
        .tsl-buy-button{display:flex;align-items:center;justify-content:center;gap:10px;width:min(100%,570px);min-height:60px;margin:24px auto 0;padding:16px 22px;border-radius:10px;background:linear-gradient(135deg,#18824e,#0b5733);color:#fff;text-align:center;font-size:14px;font-weight:950;letter-spacing:.025em;box-shadow:0 12px 28px #0c613b35;transition:transform .18s ease,filter .18s ease}.tsl-buy-button:hover{transform:translateY(-2px);filter:brightness(1.06)}.tsl-buy-button span{font-size:21px;font-weight:500}.tsl-note{text-align:center;font-size:11px!important;color:#738078!important;margin:10px auto 0!important}
        .tsl-checks{list-style:none;padding:0;margin:22px auto;max-width:700px}.tsl-checks li{position:relative;padding:12px 12px 12px 38px;border-bottom:1px solid #e7ece8;color:#34483c;font-size:14px;line-height:1.6}.tsl-checks li:before{content:"✓";position:absolute;left:9px;top:12px;color:#1b8050;font-weight:950}
        .tsl-product{background:#fff;border:1px solid #dfe8e1;border-radius:17px;padding:28px;max-width:700px;margin:26px auto;box-shadow:0 15px 45px #173a2810}.tsl-product h3{text-align:center;font-size:24px;margin:0 0 9px;color:#123d28}.tsl-price{text-align:center;font-size:38px;font-weight:950;letter-spacing:-.04em;color:#123d28;margin:13px 0 4px}.tsl-price-sub{text-align:center;color:#68766e;font-size:12px}.tsl-faq{max-width:740px;margin:25px auto}.tsl-faq details{background:#fff;border:1px solid #e1e8e2;border-radius:10px;padding:16px 18px;margin:10px 0}.tsl-faq summary{font-weight:850;color:#173b29;cursor:pointer;line-height:1.5}.tsl-faq details p{font-size:13px;margin:12px 0 0}.tsl-footer{background:#061b11;color:#bdc9c1;padding:27px 0;text-align:center}.tsl-footer p{font-size:10px;line-height:1.7;max-width:850px;margin:0 auto;color:#bdc9c1}.tsl-sticky{display:none}
        @media(max-width:600px){.tsl-shell{width:min(100% - 28px,880px)}.tsl-top{font-size:9px;padding:10px}.tsl-hero{padding:25px 0 24px}.tsl-hero h1{font-size:clamp(29px,9vw,39px);margin:16px auto 12px}.tsl-lead{font-size:14px;line-height:1.6}.tsl-hero-image{margin-top:19px;border-radius:11px}.tsl-section{padding:36px 0}.tsl-section h2{font-size:27px}.tsl-section p{font-size:14px}.tsl-grid{grid-template-columns:1fr;gap:10px;margin:20px 0}.tsl-card{padding:16px}.tsl-buy-button{font-size:12px;min-height:58px;padding:14px}.tsl-product{padding:21px 16px}.tsl-price{font-size:34px}.tsl-sticky{display:block;position:fixed;z-index:50;left:0;right:0;bottom:0;padding:9px 12px calc(9px + env(safe-area-inset-bottom));background:#ffffffed;border-top:1px solid #dfe8e1;backdrop-filter:blur(12px)}.tsl-sticky .tsl-buy-button{margin:0 auto;min-height:48px;font-size:11px}.tsl-footer{padding-bottom:95px}}
        @media(prefers-reduced-motion:reduce){.tsl-buy-button{transition:none}}
      `}</style>
      <div className="tsl-top">CONTEÚDO EDUCATIVO • INFORMAÇÃO PARA CUIDAR MELHOR DO SEU CADASTRO</div>
      <header className="tsl-hero">
        <div className="tsl-shell">
          <span className="tsl-label">ATENÇÃO PARA QUEM RECEBE O BOLSA FAMÍLIA</span>
          <h1>10 ERROS QUE PODEM <em>COLOCAR SEU BOLSA FAMÍLIA EM RISCO</em> — E QUE VOCÊ PRECISA CONHECER</h1>
          <p className="tsl-lead"><strong>Você sabe se está tomando todos os cuidados com seu Cadastro Único?</strong> Pequenos descuidos e informações desatualizadas podem gerar problemas. Conheça orientações importantes para acompanhar sua situação com mais atenção.</p>
          <img className="tsl-hero-image" src="https://i.postimg.cc/d3sPsMhJ/Bolsa-Familia-Bloqueado-Historia-Real.png" alt="Material ilustrativo sobre cuidados com o Bolsa Família" fetchPriority="high" />
          <p className="tsl-note">Leia a apresentação abaixo e conheça o treinamento.</p>
        </div>
      </header>

      <section className="tsl-section white">
        <div className="tsl-shell">
          <p className="tsl-eyebrow">VOCÊ JÁ PAROU PARA CONFERIR?</p>
          <h2>Às vezes, a preocupação só aparece quando surge uma mensagem, uma pendência ou uma dúvida sobre o benefício.</h2>
          <p>É comum ter dúvidas sobre atualização cadastral, composição familiar, renda, endereço e outras informações do Cadastro Único. E quando a rotina é corrida, alguns cuidados importantes podem acabar ficando para depois.</p>
          <div className="tsl-callout"><strong>Informação não substitui o acompanhamento oficial, mas ajuda você a saber o que observar, quais dúvidas esclarecer e quando procurar o atendimento responsável.</strong></div>
          <div className="tsl-grid">
            <article className="tsl-card"><div className="tsl-num">01</div><b>Dados que mudaram</b><p>Você sabe quando uma mudança na família precisa ser informada no cadastro?</p></article>
            <article className="tsl-card"><div className="tsl-num">02</div><b>Informações desatualizadas</b><p>Você confere se endereço, renda e composição familiar continuam corretos?</p></article>
            <article className="tsl-card"><div className="tsl-num">03</div><b>Mensagens e avisos</b><p>Você sabe onde buscar orientação quando recebe um aviso sobre o benefício?</p></article>
            <article className="tsl-card"><div className="tsl-num">04</div><b>Dúvidas sem resposta</b><p>Você sabe quais canais oficiais consultar antes de tomar uma decisão?</p></article>
          </div>
        </div>
      </section>

      <section className="tsl-section">
        <div className="tsl-shell">
          <p className="tsl-eyebrow">CONHEÇA O TREINAMENTO</p>
          <h2>Foi para organizar essas informações que criamos o Blinda Bolsa Família.</h2>
          <p className="tsl-center">Um treinamento educativo, com linguagem simples e conteúdo direto, que apresenta 10 erros comuns e cuidados importantes relacionados ao Bolsa Família e ao Cadastro Único.</p>
          <VideoBlock src={COURSE_PRESENTATION_VIDEO} eyebrow="POR DENTRO DO TREINAMENTO" title="Veja como o Blinda Bolsa Família funciona" />
          <div className="tsl-callout"><strong>Você não precisa decorar regras nem tentar descobrir tudo sozinha. O treinamento reúne os assuntos em uma sequência organizada para facilitar o entendimento.</strong></div>
          <h2>O que você vai encontrar no Blinda?</h2>
          <ul className="tsl-checks">
            <li>Explicações sobre 10 erros e descuidos que merecem atenção.</li>
            <li>Orientações educativas sobre informações do Cadastro Único.</li>
            <li>Conteúdo em vídeo, com linguagem acessível e objetiva.</li>
            <li>Cuidados para acompanhar melhor sua situação e buscar os canais oficiais quando necessário.</li>
          </ul>
        </div>
      </section>

      <section className="tsl-section white">
        <div className="tsl-shell">
          <p className="tsl-eyebrow">UMA DECISÃO INFORMADA</p>
          <h2>Entender o que observar é melhor do que continuar com dúvidas.</h2>
          <p>O Blinda foi pensado para quem quer aprender, revisar informações e ter mais clareza sobre cuidados com o cadastro. O conteúdo é educativo: cada família deve confirmar sua situação e as orientações aplicáveis nos canais oficiais do Governo Federal ou no CRAS responsável.</p>
          <VideoBlock src={TESTIMONIAL_VIDEO_ONE} eyebrow="RELATO DE ALUNO" title="Veja a experiência de quem conheceu o treinamento" />
          <VideoBlock src={TESTIMONIAL_VIDEO_TWO} eyebrow="OUTRA EXPERIÊNCIA" title="Conheça mais um relato sobre o conteúdo" />
        </div>
      </section>

      <section className="tsl-section dark">
        <div className="tsl-shell">
          <p className="tsl-eyebrow" style={{ color: "#f0c9a0" }}>SUA PRÓXIMA ETAPA</p>
          <h2>Tenha as informações organizadas para cuidar melhor do seu cadastro.</h2>
          <p className="tsl-center">Ao adquirir o Blinda Bolsa Família, você recebe acesso ao treinamento educativo com os 10 erros, explicações e orientações apresentadas nesta página.</p>
          <div className="tsl-product">
            <p className="tsl-eyebrow">ACESSO AO TREINAMENTO</p>
            <h3>BLINDA BOLSA FAMÍLIA</h3>
            <p className="tsl-center">Conteúdo digital • Pagamento único</p>
            <div className="tsl-price">R$ 12,49</div>
            <p className="tsl-price-sub">Acesso conforme as condições apresentadas no checkout.</p>
            <BuyButton />
            <p className="tsl-note">Pagamento processado em ambiente seguro da Cakto.</p>
          </div>
        </div>
      </section>

      <section className="tsl-section white">
        <div className="tsl-shell">
          <p className="tsl-eyebrow">DÚVIDAS FREQUENTES</p>
          <h2>Antes de acessar, veja estas respostas.</h2>
          <div className="tsl-faq">
            <details><summary>O Blinda Bolsa Família é um programa do Governo?</summary><p>Não. É um treinamento educativo independente. Não representa o Governo Federal, a Caixa Econômica Federal ou o Cadastro Único.</p></details>
            <details><summary>O treinamento garante que meu benefício não será bloqueado ou cancelado?</summary><p>Não. Nenhum treinamento pode garantir manutenção, desbloqueio ou aprovação de benefício. A situação de cada família depende das regras oficiais e da análise dos órgãos responsáveis.</p></details>
            <details><summary>O conteúdo substitui o atendimento do CRAS?</summary><p>Não. O material é educativo e não substitui orientações oficiais. Para atualizar dados ou resolver pendências, procure o CRAS ou canal oficial indicado para seu município.</p></details>
            <details><summary>Como faço para comprar?</summary><p>Clique em qualquer botão de acesso desta página. Você será direcionada ao checkout da Cakto para conferir as condições e concluir o pagamento.</p></details>
            <details><summary>Como recebo o treinamento?</summary><p>As instruções de acesso são apresentadas após a confirmação do pagamento, conforme as informações do checkout.</p></details>
          </div>
          <h2>Não deixe suas dúvidas para depois. Conheça o conteúdo do Blinda.</h2>
          <BuyButton label="QUERO ACESSAR O TREINAMENTO" />
          <p className="tsl-note">Confira todos os detalhes antes de finalizar sua compra.</p>
        </div>
      </section>

      <footer className="tsl-footer">
        <div className="tsl-shell">
          <p>Blinda Bolsa Família — treinamento educativo independente. Não somos órgão governamental e não temos vínculo com o Governo Federal, Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome, Caixa Econômica Federal ou Cadastro Único. O conteúdo não garante manutenção, desbloqueio ou aprovação de benefícios e não substitui os canais oficiais.</p>
        </div>
      </footer>
      <div className="tsl-sticky"><BuyButton label="ACESSAR O BLINDA BOLSA FAMÍLIA →" /></div>
    </main>
  );
}
