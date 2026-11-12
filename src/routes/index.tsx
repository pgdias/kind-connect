import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackEvent } from "../lib/api";

const CHECKOUT_URL = "https://pay.cakto.com.br/38xq22v_1131074";

// Inserir os links reais quando forem enviados. As seções só aparecem com vídeos válidos.
const COURSE_VIDEO_URL = "";
const TESTIMONIAL_VIDEO_ONE_URL = "";
const TESTIMONIAL_VIDEO_TWO_URL = "";

export const Route = createFileRoute("/")({ component: TslSalesPage });

function BuyButton({ placement }: { placement: string }) {
  return (
    <a
      className="bl-buy"
      href={CHECKOUT_URL}
      onClick={() => {
        void trackEvent("checkout_click", {
          page: "/",
          checkout_provider: "cakto",
          funnel: "tsl",
          placement,
        });
      }}
    >
      <span>QUERO ACESSAR O TREINAMENTO</span>
      <b aria-hidden="true">➜</b>
    </a>
  );
}

function VideoEmbed({ src, title }: { src: string; title: string }) {
  if (!src) return null;
  return (
    <div className="bl-video">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

function TslSalesPage() {
  useEffect(() => {
    void trackEvent("tsl_landing_viewed");
  }, []);

  const hasProof = Boolean(TESTIMONIAL_VIDEO_ONE_URL || TESTIMONIAL_VIDEO_TWO_URL);

  return (
    <main className="bl-page">
      <style>{`
        .bl-page{--navy:#071b3d;--navy2:#0d3268;--yellow:#ffd84d;--red:#d92732;--green:#159b36;--ink:#14233d;--muted:#5b6880;background:#fff;color:var(--ink);font-family:Arial,Helvetica,sans-serif;overflow:hidden;padding-bottom:0}
        .bl-page *{box-sizing:border-box}.bl-container{width:min(100% - 36px,900px);margin-inline:auto}
        .bl-topline{background:#03132d;color:#fff;text-align:center;padding:9px 12px;font-size:11px;font-weight:900;letter-spacing:.09em}
        .bl-hero{background:radial-gradient(circle at 85% 0%,#1c4b80 0,transparent 34%),linear-gradient(145deg,#04132e,#092b5c 72%,#073b45);color:#fff;padding:clamp(30px,6vw,62px) 0 44px;text-align:center}
        .bl-brand{font-size:clamp(22px,4vw,30px);font-weight:1000;letter-spacing:-.8px;margin-bottom:21px}.bl-brand em{font-style:normal;color:var(--yellow)}
        .bl-alert{display:inline-block;background:var(--red);color:#fff;border-radius:5px;padding:8px 12px;font-size:11px;font-weight:1000;letter-spacing:.07em}
        .bl-hero h1{max-width:860px;margin:19px auto 16px;font-size:clamp(31px,5.5vw,53px);line-height:1.04;letter-spacing:-1.3px;font-weight:1000;text-transform:uppercase}
        .bl-hero h1 strong{color:var(--yellow)}.bl-hero-sub{max-width:730px;margin:0 auto 17px;font-size:clamp(16px,2.2vw,19px);line-height:1.55;color:#eaf1ff}
        .bl-top-price{font-size:17px;font-weight:900;margin:16px auto 4px}.bl-top-price strong{color:var(--yellow);font-size:28px}.bl-payment-note{font-size:12px;color:#d8e3f7;margin:0 auto 8px}
        .bl-section{padding:clamp(36px,5.5vw,60px) 0}.bl-white{background:#fff}.bl-soft{background:#f1f5fb}.bl-dark{background:var(--navy);color:#fff}.bl-copy{max-width:790px}
        .bl-kicker{display:block;color:#a66c00;font-size:11px;font-weight:1000;letter-spacing:.12em;margin-bottom:12px}.bl-dark .bl-kicker{color:var(--yellow)}
        .bl-copy h2{font-size:clamp(27px,4.5vw,40px);line-height:1.09;letter-spacing:-.7px;font-weight:1000;margin:0 0 17px;color:var(--navy)}
        .bl-dark .bl-copy h2{color:var(--yellow)}.bl-copy h3{font-size:clamp(20px,3vw,25px);line-height:1.2;font-weight:1000;margin:23px 0 12px;color:inherit}
        .bl-copy p{font-size:17px;line-height:1.68;margin:0 0 14px;color:inherit}.bl-copy strong{font-weight:1000}
        .bl-highlight{font-size:clamp(21px,3.7vw,29px)!important;line-height:1.2!important;font-weight:1000;color:var(--red)!important;margin:19px 0!important}
        .bl-dark .bl-highlight{color:var(--yellow)!important}
        .bl-list{list-style:none;padding:0;margin:18px 0 22px}.bl-list li{position:relative;padding:13px 14px 13px 45px;margin:9px 0;border-radius:10px;background:#f1f5fb;font-size:16px;line-height:1.5;color:#182b4c}
        .bl-list li:before{content:"✓";position:absolute;left:15px;top:12px;color:var(--green);font-size:20px;font-weight:1000}
        .bl-dark .bl-list li{background:#ffffff12;color:#fff}.bl-dark .bl-list li:before{color:var(--yellow)}
        .bl-buy{display:flex;align-items:center;justify-content:center;gap:12px;width:min(100%,590px);min-height:61px;padding:15px 18px;margin:22px auto 10px;border-radius:12px;background:linear-gradient(180deg,#28c447,#087b22);border:2px solid #aaff9b;color:#fff;text-align:center;text-decoration:none;font-size:clamp(14px,2vw,17px);line-height:1.2;font-weight:1000;box-shadow:0 6px 0 #07551a,0 12px 24px #0002;transition:transform .15s ease}
        .bl-buy:hover{transform:translateY(-2px)}.bl-buy b{font-size:22px;flex:none}
        .bl-note{text-align:center!important;font-size:12px!important;line-height:1.5!important;color:#69778d!important;margin:9px auto 0!important}
        .bl-dark .bl-note{color:#d9e5f7!important}
        .bl-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin:21px 0}
        .bl-card{background:#fff;border:1px solid #dce5f0;border-radius:13px;padding:18px;color:#192b49;box-shadow:0 5px 16px #061b4209}
        .bl-card b{display:block;color:var(--navy);font-size:16px;margin-bottom:7px}.bl-card p{font-size:14px;line-height:1.55;margin:0;color:#4d5d75}
        .bl-dark .bl-card{border-color:#ffffff22}.bl-price-card{background:#fff;border:2px solid #ffda4a;border-radius:17px;padding:25px 20px;text-align:center;color:var(--navy);box-shadow:0 12px 30px #001b4420;margin:23px 0}
        .bl-price{font-size:clamp(45px,8vw,62px);font-weight:1000;line-height:1.05;color:var(--green);margin:10px 0}
        .bl-price-card p{color:#33445e}.bl-faq details{background:#fff;border:1px solid #dce4ef;border-radius:12px;padding:15px;margin:9px 0;box-shadow:0 3px 10px #001b4408}
        .bl-faq summary{cursor:pointer;font-size:15px;line-height:1.4;font-weight:900;color:var(--navy);list-style:none;display:flex;justify-content:space-between;gap:14px}
        .bl-faq summary:after{content:"+";font-size:22px;color:var(--green);line-height:1}.bl-faq details[open] summary:after{content:"−"}
        .bl-faq details p{font-size:14px;line-height:1.6;color:#4a5b74;margin:12px 0 0}
        .bl-video{position:relative;width:100%;aspect-ratio:16/9;background:#06152f;border:3px solid #e8c64a;border-radius:15px;overflow:hidden;box-shadow:0 12px 28px #001b4422;margin:20px 0}
        .bl-video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
        .bl-sticky{display:none}.bl-disclaimer{font-size:12px!important;line-height:1.6!important;color:#cbd7e9!important;text-align:center;margin-top:20px!important}
        @media(max-width:700px){
          .bl-container{width:calc(100% - 32px)}.bl-topline{font-size:9px;padding:9px 7px}.bl-hero{padding:25px 0 31px}
          .bl-brand{font-size:23px;margin-bottom:17px}.bl-alert{font-size:9px;line-height:1.3}
          .bl-hero h1{font-size:clamp(29px,8.5vw,40px);line-height:1.06;letter-spacing:-.8px;margin:16px auto 13px}
          .bl-hero-sub{font-size:15px;line-height:1.5}.bl-top-price{font-size:16px}.bl-top-price strong{font-size:25px}
          .bl-section{padding:33px 0}.bl-copy p{font-size:16px;line-height:1.63;margin-bottom:13px}.bl-copy h2{font-size:28px;line-height:1.1;margin-bottom:14px}
          .bl-copy h3{font-size:20px;margin:20px 0 11px}.bl-list li{font-size:15px;line-height:1.5;padding:12px 12px 12px 41px}.bl-list li:before{left:13px;top:11px}
          .bl-buy{min-height:57px;padding:13px 11px;font-size:13px;gap:8px;border-radius:11px;margin:19px auto 10px}
          .bl-grid{grid-template-columns:1fr;gap:10px;margin:16px 0}.bl-card{padding:15px}.bl-faq summary{font-size:14px}.bl-faq details{padding:13px}
          .bl-sticky{display:block;position:fixed;z-index:1000;left:0;right:0;bottom:0;padding:8px 12px calc(9px + env(safe-area-inset-bottom));background:#fffffff2;border-top:1px solid #dce4ef;backdrop-filter:blur(10px)}
          .bl-sticky .bl-buy{margin:0 auto;min-height:48px;max-width:590px;font-size:12px;box-shadow:0 4px 0 #07551a}.bl-page{padding-bottom:74px}
        }
        @media(max-width:360px){.bl-hero h1{font-size:28px}.bl-copy p{font-size:15px}.bl-buy{font-size:11px}}
        @media(prefers-reduced-motion:reduce){.bl-buy{transition:none}}
      `}</style>

      <div className="bl-topline">BLINDA BOLSA FAMÍLIA • TREINAMENTO DIGITAL INDEPENDENTE</div>

      <header className="bl-hero">
        <div className="bl-container">
          <div className="bl-brand">🔒 BLINDA <em>BOLSA FAMÍLIA</em></div>
          <span className="bl-alert">ATENÇÃO, QUEM RECEBE O BOLSA FAMÍLIA</span>
          <h1>VOCÊ SABE QUAIS SÃO OS <strong>10 ERROS E DESCUIDOS</strong> QUE MERECEM ATENÇÃO NO BOLSA FAMÍLIA?</h1>
          <p className="bl-hero-sub">Conheça situações que podem passar despercebidas no dia a dia e entenda o que observar no seu cadastro — com explicações simples, em aulas em vídeo.</p>
          <p className="bl-top-price">Acesso ao treinamento por <strong>R$ 12,99</strong></p>
          <p className="bl-payment-note">Pagamento único • Conteúdo digital</p>
          <BuyButton placement="topo"/>
        </div>
      </header>

      <section className="bl-section bl-white"><div className="bl-container bl-copy">
        <span className="bl-kicker">VOCÊ JÁ PASSOU POR ISSO?</span>
        <h2>Quando o pagamento não aparece, a preocupação começa.</h2>
        <p>Você abre o aplicativo, confere o saldo e não encontra o valor que esperava. Tenta novamente. Procura informações. E começa a pensar se existe alguma pendência ou dado que precisa ser atualizado.</p>
        <p>Nem sempre é fácil entender o que aconteceu ou por onde começar a conferir.</p>
        <p className="bl-highlight">O problema é não saber o que merece atenção — nem onde confirmar a informação correta.</p>
        <p>O Blinda Bolsa Família foi criado para organizar orientações educativas sobre erros e descuidos que podem passar despercebidos na rotina de quem recebe o benefício.</p>
      </div></section>

      <section className="bl-section bl-soft"><div className="bl-container bl-copy">
        <span className="bl-kicker">O QUE VOCÊ VAI APRENDER</span>
        <h2>10 pontos de atenção explicados de forma simples.</h2>
        <p>Em vez de depender de mensagens soltas ou informações desencontradas, você encontra o conteúdo organizado em um treinamento digital.</p>
        <ul className="bl-list">
          <li><strong>Conhecer os 10 erros e descuidos</strong> abordados no treinamento.</li>
          <li><strong>Entender por que cada situação merece atenção</strong> e o que pode estar passando despercebido.</li>
          <li><strong>Saber o que observar nas informações do cadastro</strong> e quais pontos conferir.</li>
          <li><strong>Entender onde buscar confirmação e orientação</strong> quando tiver dúvidas.</li>
        </ul>
        <p>O objetivo é ajudar você a compreender melhor os cuidados relacionados ao benefício — sem linguagem complicada.</p>
      </div></section>

      {COURSE_VIDEO_URL ? (
        <section className="bl-section bl-dark"><div className="bl-container bl-copy">
          <span className="bl-kicker">VEJA O PRODUTO POR DENTRO</span>
          <h2>Antes de comprar, conheça o treinamento.</h2>
          <p>Veja a apresentação e confira como o conteúdo está organizado, quais aulas fazem parte do material e como você acompanha pelo celular.</p>
          <VideoEmbed src={COURSE_VIDEO_URL} title="Apresentação do treinamento Blinda Bolsa Família"/>
        </div></section>
      ) : null}

      <section className="bl-section bl-dark"><div className="bl-container bl-copy">
        <span className="bl-kicker">UM CONTEÚDO DIRETO AO PONTO</span>
        <h2>O treinamento foi pensado para a sua rotina.</h2>
        <div className="bl-grid">
          <div className="bl-card"><b>Aulas em vídeo</b><p>Para acompanhar pelo celular ou computador, no seu ritmo.</p></div>
          <div className="bl-card"><b>Linguagem simples</b><p>Explicações diretas, sem depender de conhecimento técnico.</p></div>
          <div className="bl-card"><b>Conteúdo organizado</b><p>Os assuntos reunidos em uma sequência fácil de acompanhar.</p></div>
          <div className="bl-card"><b>Orientação educativa</b><p>Informações para entender o que observar e onde buscar confirmação.</p></div>
        </div>
      </div></section>

      {hasProof ? (
        <section className="bl-section bl-soft"><div className="bl-container bl-copy">
          <span className="bl-kicker">RELATOS REAIS</span>
          <h2>Veja os depoimentos de quem conheceu o treinamento.</h2>
          <p>Assista aos relatos completos e tire suas próprias conclusões.</p>
          {TESTIMONIAL_VIDEO_ONE_URL ? <VideoEmbed src={TESTIMONIAL_VIDEO_ONE_URL} title="Depoimento de cliente 1"/> : null}
          {TESTIMONIAL_VIDEO_TWO_URL ? <VideoEmbed src={TESTIMONIAL_VIDEO_TWO_URL} title="Depoimento de cliente 2"/> : null}
        </div></section>
      ) : null}

      <section className="bl-section bl-white"><div className="bl-container bl-copy">
        <span className="bl-kicker">PARA QUEM É</span>
        <h2>O Blinda pode fazer sentido para você que:</h2>
        <ul className="bl-list">
          <li>Recebe o Bolsa Família e quer entender melhor os cuidados relacionados ao benefício.</li>
          <li>Prefere aprender com vídeos e explicações em linguagem simples.</li>
          <li>Quer saber quais informações observar e onde confirmar possíveis dúvidas.</li>
          <li>Não quer depender apenas de mensagens encaminhadas ou conselhos sem fonte.</li>
        </ul>
      </div></section>

      <section className="bl-section bl-soft"><div className="bl-container bl-copy">
        <span className="bl-kicker">SEU ACESSO</span>
        <h2>Tenha o conteúdo organizado em um só lugar.</h2>
        <p>Ao adquirir o Blinda Bolsa Família, você recebe acesso ao treinamento digital com as aulas sobre os 10 erros e descuidos, explicações e orientações educativas sobre o que observar.</p>
        <div className="bl-price-card">
          <p><strong>BLINDA BOLSA FAMÍLIA</strong></p>
          <div className="bl-price">R$ 12,99</div>
          <p><strong>Pagamento único • Sem mensalidade</strong></p>
          <p>Conteúdo digital para assistir pelo celular ou computador.</p>
          <BuyButton placement="oferta"/>
          <p className="bl-note">Pagamento processado pela Cakto. Confira as condições antes de concluir.</p>
        </div>
      </div></section>

      <section className="bl-section bl-white" id="duvidas"><div className="bl-container bl-copy">
        <span className="bl-kicker">DÚVIDAS FREQUENTES</span>
        <h2>Antes de decidir, veja estas respostas.</h2>
        <div className="bl-faq">
          <details><summary>Como recebo o treinamento?</summary><p>O treinamento é digital. Após a confirmação do pagamento, siga as instruções de acesso apresentadas pela plataforma de compra.</p></details>
          <details><summary>Posso assistir pelo celular?</summary><p>Sim. O conteúdo pode ser acompanhado pelo celular ou computador com acesso à internet.</p></details>
          <details><summary>O pagamento é mensal?</summary><p>Não. O preço informado nesta página é R$ 12,99 em pagamento único.</p></details>
          <details><summary>O treinamento garante que meu benefício não será bloqueado ou cancelado?</summary><p>Não. Nenhum treinamento pode garantir a manutenção, aprovação ou desbloqueio do benefício. A situação de cada família depende das regras e da análise dos órgãos responsáveis.</p></details>
          <details><summary>O Blinda Bolsa Família é do governo?</summary><p>Não. É um treinamento digital independente, sem vínculo com o Governo Federal, Caixa Econômica Federal ou Cadastro Único.</p></details>
          <details><summary>O treinamento substitui o CRAS ou os canais oficiais?</summary><p>Não. O conteúdo é educativo. Para atualizar dados ou resolver pendências, procure o CRAS ou os canais oficiais do seu município.</p></details>
        </div>
      </div></section>

      <section className="bl-section bl-dark"><div className="bl-container bl-copy">
        <span className="bl-kicker">COMECE PELO CONHECIMENTO</span>
        <h2>Saiba o que observar. Entenda melhor os cuidados com seu cadastro.</h2>
        <p>Conheça o treinamento Blinda Bolsa Família e veja se o conteúdo atende ao que você procura.</p>
        <p className="bl-highlight">Acesso por R$ 12,99 — pagamento único.</p>
        <BuyButton placement="fechamento"/>
        <p className="bl-disclaimer">Blinda Bolsa Família é um treinamento digital educativo e independente. Não é um serviço oficial nem possui vínculo com o Governo Federal, Caixa Econômica Federal ou Cadastro Único. O conteúdo não garante manutenção, desbloqueio ou aprovação de benefícios e não substitui orientações dos canais oficiais.</p>
      </div></section>

      <div className="bl-sticky"><BuyButton placement="fixo-mobile"/></div>
    </main>
  );
}
