import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackEvent } from "../lib/api";

const COURSE_PRESENTATION_VIDEO = "";
const TESTIMONIAL_VIDEO_ONE = "";
const TESTIMONIAL_VIDEO_TWO = "";
const CHECKOUT_URL = "https://pay.cakto.com.br/38xq22v_1131074";

export const Route = createFileRoute("/")({ component: TslSalesPage });

function BuyButton({ placement }: { placement: string }) {
  return (
    <a
      className="bl-buy"
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => { void trackEvent("checkout_click", { page: "/", checkout_provider: "cakto", funnel: "tsl", placement }); }}
    >
      <span>QUERO BLINDAR MEU BOLSA FAMÍLIA</span><b aria-hidden="true">➜</b>
    </a>
  );
}

function VideoSlot({ src, title, eyebrow }: { src: string; title: string; eyebrow: string }) {
  return (
    <div className="bl-video-card">
      <div className="bl-video-heading"><span>{eyebrow}</span><h3>{title}</h3></div>
      <div className="bl-video-frame">
        {src ? (
          <iframe src={src} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        ) : (
          <div className="bl-video-placeholder">
            <span className="bl-play" aria-hidden="true">▶</span>
            <strong>VÍDEO EM BREVE</strong>
            <small>Este espaço será preenchido com o vídeo original.</small>
          </div>
        )}
      </div>
    </div>
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
        .bl-hero{background:radial-gradient(circle at 80% 0%,#17457c 0,transparent 36%),linear-gradient(145deg,#04132f,#08285a 72%,#073c43);color:#fff;padding:clamp(28px,6vw,58px) 0 42px;text-align:center}
        .bl-brand{font-size:clamp(22px,4vw,30px);font-weight:1000;letter-spacing:-.8px;margin-bottom:20px}.bl-brand em{font-style:normal;color:var(--yellow)}
        .bl-alert{display:inline-block;background:var(--red);color:white;border-radius:5px;padding:8px 12px;font-size:11px;font-weight:1000;letter-spacing:.08em}
        .bl-hero h1{max-width:850px;margin:19px auto 16px;font-size:clamp(30px,5.3vw,53px);line-height:1.04;letter-spacing:-1.2px;font-weight:1000;text-transform:uppercase}
        .bl-hero h1 strong{color:var(--yellow)}.bl-hero-sub{max-width:720px;margin:0 auto 18px;font-size:clamp(16px,2.2vw,19px);line-height:1.5;color:#e9f0ff}
        .bl-top-price{font-size:19px;font-weight:1000;margin:16px auto 5px}.bl-top-price strong{color:var(--yellow);font-size:28px}
        .bl-payment-note{font-size:12px;color:#d8e3f7;margin:0 auto 10px}
        .bl-section{padding:clamp(34px,5.5vw,62px) 0}.bl-light{background:#fff}.bl-soft{background:#f1f5fb}.bl-dark{background:var(--navy);color:#fff}.bl-yellow{background:#fff7d6}
        .bl-copy{max-width:760px}.bl-copy p{font-size:17px;line-height:1.72;margin:0 0 15px;color:inherit}
        .bl-copy h2{font-size:clamp(27px,4.5vw,41px);line-height:1.09;letter-spacing:-.7px;font-weight:1000;margin:20px 0 18px;color:var(--navy)}
        .bl-dark .bl-copy h2{color:var(--yellow)}.bl-copy h3{font-size:clamp(20px,3vw,26px);line-height:1.2;font-weight:1000;margin:25px 0 13px;color:inherit}
        .bl-copy strong{font-weight:1000}.bl-impact{font-size:clamp(23px,4vw,34px)!important;line-height:1.16!important;font-weight:1000;color:var(--red)!important;margin:22px 0!important}
        .bl-dark .bl-impact{color:var(--yellow)!important}.bl-copy ul{list-style:none;padding:0;margin:18px 0 24px}
        .bl-copy li{position:relative;padding:13px 14px 13px 43px;margin:9px 0;border-radius:10px;background:#f1f5fb;font-size:16px;line-height:1.55;color:#182b4c}
        .bl-copy li:before{content:"✓";position:absolute;left:15px;top:12px;color:var(--green);font-size:19px;font-weight:1000}
        .bl-dark .bl-copy li{background:#ffffff12;color:#fff}.bl-dark .bl-copy li:before{color:var(--yellow)}
        .bl-buy{display:flex;align-items:center;justify-content:center;gap:12px;width:min(100%,590px);min-height:62px;padding:15px 18px;margin:24px auto 12px;border-radius:12px;background:linear-gradient(180deg,#26c441,#087b20);border:2px solid #aaff9b;color:#fff;text-align:center;text-decoration:none;font-size:clamp(14px,2vw,17px);line-height:1.2;font-weight:1000;box-shadow:0 6px 0 #07551a,0 12px 24px #0002;transition:transform .15s ease}
        .bl-buy:hover{transform:translateY(-2px)}.bl-buy b{font-size:22px;flex:none}.bl-buy-note{text-align:center!important;font-size:12px!important;line-height:1.5!important;color:#68768b!important;margin:9px auto 0!important}
        .bl-dark .bl-buy-note{color:#d9e5f7!important}.bl-price-card{background:#fff;border:2px solid #ffdb4c;border-radius:16px;padding:22px 18px;text-align:center;color:var(--navy);box-shadow:0 12px 30px #001b4420;margin:25px 0}
        .bl-price-card .bl-price{font-size:clamp(40px,8vw,58px);font-weight:1000;line-height:1.05;color:var(--green);margin:8px 0}.bl-price-card p{color:#33445e}
        .bl-video-card{background:#061b42;color:#fff;padding:14px;border-radius:15px;margin:22px 0;box-shadow:0 12px 30px #001b4426}
        .bl-video-heading span{display:block;color:var(--yellow);font-size:11px;font-weight:1000;letter-spacing:.12em;margin:3px 0 7px}.bl-video-heading h3{font-size:21px;margin:0 0 13px;color:#fff}
        .bl-video-frame{aspect-ratio:16/9;position:relative;overflow:hidden;border-radius:9px;background:linear-gradient(145deg,#153c73,#03132f);border:1px solid #ffffff35}
        .bl-video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.bl-video-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;text-align:center;padding:14px;color:#fff}
        .bl-video-placeholder strong{font-size:15px;color:var(--yellow);letter-spacing:.06em}.bl-video-placeholder small{font-size:12px;color:#d9e5f7}
        .bl-play{width:58px;height:58px;display:grid;place-items:center;padding-left:4px;border-radius:50%;background:var(--yellow);color:var(--navy);font-size:25px;box-shadow:0 0 0 8px #ffffff20}
        .bl-faq details{background:#fff;border:1px solid #dce4ef;border-radius:12px;padding:16px;margin:10px 0;box-shadow:0 3px 10px #001b4408}
        .bl-faq summary{cursor:pointer;font-size:16px;line-height:1.4;font-weight:900;color:var(--navy);list-style:none;display:flex;justify-content:space-between;gap:14px}
        .bl-faq summary:after{content:"+";font-size:22px;color:var(--green);line-height:1}.bl-faq details[open] summary:after{content:"−"}
        .bl-faq details p{font-size:15px;line-height:1.65;color:#4a5b74;margin:13px 0 0}
        .bl-sticky{display:none}
        @media(max-width:700px){
          .bl-container{width:calc(100% - 32px)}.bl-topline{font-size:9px;padding:9px 7px}
          .bl-hero{padding:24px 0 30px}.bl-brand{font-size:23px;margin-bottom:17px}.bl-alert{font-size:9px;line-height:1.3}
          .bl-hero h1{font-size:clamp(29px,8.7vw,41px);line-height:1.055;letter-spacing:-.8px;margin:16px auto 13px}
          .bl-hero-sub{font-size:15px;line-height:1.5}.bl-top-price{font-size:16px}.bl-top-price strong{font-size:25px}
          .bl-section{padding:32px 0}.bl-copy p{font-size:16px;line-height:1.68;margin-bottom:14px}
          .bl-copy h2{font-size:28px;line-height:1.1;margin:18px 0 15px}.bl-copy h3{font-size:21px;margin:21px 0 12px}
          .bl-copy li{font-size:15px;line-height:1.5;padding:12px 12px 12px 40px}.bl-copy li:before{left:13px;top:11px}
          .bl-buy{min-height:58px;padding:13px 11px;font-size:13px;gap:8px;border-radius:11px;margin:20px auto 11px}
          .bl-video-card{padding:11px;border-radius:12px;margin:18px 0}.bl-video-heading h3{font-size:19px}
          .bl-faq summary{font-size:15px}.bl-faq details{padding:14px}
          .bl-sticky{display:block;position:fixed;z-index:1000;left:0;right:0;bottom:0;padding:8px 12px calc(9px + env(safe-area-inset-bottom));background:#fffffff2;border-top:1px solid #dce4ef;backdrop-filter:blur(10px)}
          .bl-sticky .bl-buy{margin:0 auto;min-height:49px;max-width:590px;font-size:12px;box-shadow:0 4px 0 #07551a}
          .bl-page{padding-bottom:76px}
        }
        @media(max-width:360px){.bl-hero h1{font-size:28px}.bl-copy p{font-size:15px}.bl-buy{font-size:11px}}
        @media(prefers-reduced-motion:reduce){.bl-buy{transition:none}}
      `}</style>

      <div className="bl-topline">BLINDA BOLSA FAMÍLIA • TREINAMENTO DIGITAL</div>

      <header className="bl-hero">
        <div className="bl-container">
          <div className="bl-brand">🔒 BLINDA <em>BOLSA FAMÍLIA</em></div>
          <span className="bl-alert">ATENÇÃO, BENEFICIÁRIO DO BOLSA FAMÍLIA</span>
          <h1>EXISTEM 10 ERROS DO DIA A DIA QUE PODEM COLOCAR SEU BOLSA FAMÍLIA EM RISCO — E VOCÊ PODE ESTAR COMETENDO ALGUM DELES <strong>SEM SABER!</strong></h1>
          <p className="bl-hero-sub">A maioria das pessoas nem imagina que certos hábitos e descuidos da rotina podem trazer problemas para o benefício. E o pior: muitas só vão descobrir quando perceberem que o dinheiro não caiu.</p>
          <p className="bl-top-price">Acesso ao treinamento por <strong>R$ 12,99</strong></p>
          <p className="bl-payment-note">Pagamento único • Acesso online após a compra</p>
          <BuyButton placement="topo"/>
        </div>
      </header>

      <Section>
        <h2>IMAGINE ESTA SITUAÇÃO...</h2>
        <p>Hoje é dia de receber o Bolsa Família.</p>
        <p>Você acorda, pega o celular e abre o Caixa Tem para conferir se o dinheiro já caiu.</p>
        <p>Mas, quando olha o aplicativo...</p>
        <p className="bl-impact">O dinheiro não está lá.</p>
        <p>Você pensa que talvez seja apenas um atraso.</p>
        <p>Espera mais um pouco.</p>
        <p>O dia passa. Você tenta novamente.</p>
        <p>Nada.</p>
        <p>Então decide ir até a lotérica.</p>
        <p>Chega lá, entra na fila e fica esperando sua vez.</p>
        <p>O tempo parece não passar.</p>
        <p>Finalmente chega sua vez. Você entrega seus dados para consultar o benefício.</p>
        <p>A atendente verifica as informações e entrega o extrato.</p>
        <p>Você olha para o papel. Lê uma vez. Depois lê novamente.</p>
        <h2 className="bl-impact">SEU BOLSA FAMÍLIA FOI CANCELADO.</h2>
        <p>Naquele momento, vem o frio na barriga.</p>
        <p>Um nó na garganta.</p>
        <p>Mil perguntas passam pela sua cabeça.</p>
        <p>Como isso aconteceu? Por que ninguém me avisou?</p>
        <h3>O que eu fiz de errado?</h3>
        <p>E se você estivesse fazendo alguma coisa no dia a dia sem perceber que aquilo poderia colocar seu benefício em risco?</p>
      </Section>

      <Section tone="soft">
        <h2>O MEDO DE PERDER ESSE DINHEIRO É REAL.</h2>
        <p>Quem recebe o Bolsa Família sabe o quanto esse dinheiro faz diferença.</p>
        <p>É ajuda para colocar comida na mesa.</p>
        <p>Para comprar o gás.</p>
        <p>Para comprar um remédio.</p>
        <p>Para cuidar dos filhos.</p>
        <p>Para enfrentar as despesas de cada mês.</p>
        <p>Por isso, só de imaginar que o benefício pode ser bloqueado ou cancelado, muita gente já fica preocupada.</p>
        <p>E existe uma situação ainda pior:</p>
        <p>Você tenta fazer tudo certo, segue sua rotina, acredita que está tudo bem...</p>
        <p>Mas não sabe se existem descuidos acontecendo sem que você perceba.</p>
        <p className="bl-impact">Você só descobre que tem algo errado quando já é tarde.</p>
        <p>Muitas pessoas não sabem quais atitudes do dia a dia merecem atenção. Não sabem o que observar. Não sabem quais descuidos podem trazer consequências.</p>
      </Section>

      <Section>
        <h2>FOI DEPOIS DE PASSAR POR ISSO QUE NASCEU O BLINDA BOLSA FAMÍLIA.</h2>
        <p>O responsável pelo Blinda Bolsa Família também já foi beneficiário.</p>
        <p>Também passou pela situação de ter o benefício cancelado.</p>
        <p>E, naquele momento, também não entendia exatamente o que havia acontecido.</p>
        <p>Foi quando começou a conversar com outras pessoas que haviam enfrentado problemas com o benefício.</p>
        <p>E percebeu algo em comum:</p>
        <p className="bl-impact">Muitas delas estavam repetindo os mesmos erros e descuidos, sem imaginar que aquilo poderia trazer problemas.</p>
        <p>Eram situações que passavam despercebidas. Coisas que faziam parte da rotina. Atitudes que pareciam inofensivas.</p>
        <p>Foi a partir dessa descoberta que surgiu uma pergunta:</p>
        <h3>Quantas outras pessoas estão fazendo essas mesmas coisas sem saber?</h3>
        <p>Foi por isso que nasceu o <strong>Blinda Bolsa Família</strong>.</p>
        <p>Um treinamento criado para reunir essas informações e mostrar quais são os cuidados que merecem atenção.</p>
      </Section>

      <Section tone="dark">
        <h2>EXISTEM 10 ERROS DO DIA A DIA QUE VOCÊ PRECISA CONHECER.</h2>
        <p>E talvez você esteja cometendo algum deles agora mesmo.</p>
        <p>O mais preocupante é que esses erros não parecem necessariamente algo grave quando acontecem.</p>
        <p>São hábitos. Descuidos. Atitudes repetidas no automático.</p>
        <p>Coisas que passam despercebidas na correria do dia a dia.</p>
        <p><strong>Não estamos falando de papelada ou burocracia.</strong></p>
        <p>Estamos falando de situações da rotina que merecem atenção e que muitas pessoas nem imaginam que podem ter importância.</p>
        <h3>Vou te dar algumas pistas:</h3>
        <ul>
          <li>Existe um hábito que parece completamente normal, mas que quase ninguém para para questionar.</li>
          <li>Há uma atitude que muita gente toma acreditando que está fazendo tudo certo.</li>
          <li>Existe um descuido que pode passar despercebido durante muito tempo.</li>
          <li>E há situações que merecem atenção justamente porque são repetidas sem pensar.</li>
        </ul>
        <p>Você pode estar fazendo alguma dessas coisas todos os dias e nem sequer imaginar que deveria prestar atenção.</p>
        <p><strong>A lista completa dos 10 erros está dentro do Blinda Bolsa Família.</strong></p>
        <p>É lá que você vai conhecer cada um deles, entender por que merecem atenção e aprender o que observar na sua rotina.</p>
        <h2>Será que eu estou cometendo algum desses erros e nem sei?</h2>
        <p>Se você não sabe a resposta, talvez esteja na hora de conhecer essas informações.</p>
        <p><strong>Enquanto você não conhece esses erros, eles continuam escondidos de você.</strong></p>
      </Section>

      <Section tone="soft">
        <h2>CONHEÇA O BLINDA BOLSA FAMÍLIA</h2>
        <p>O Blinda Bolsa Família é um treinamento digital com aulas em vídeo que revela os <strong>10 erros e descuidos do dia a dia</strong> que beneficiários podem cometer sem perceber.</p>
        <p>Você vai conhecer cada erro, entender por que ele merece atenção e aprender o que observar para não continuar repetindo os mesmos descuidos.</p>
        <h3>Dentro do treinamento, você recebe:</h3>
        <ul>
          <li><strong>Os 10 erros do dia a dia:</strong> conheça cada um deles, explicados de maneira simples.</li>
          <li><strong>Explicação de cada erro:</strong> entenda por que determinadas atitudes podem trazer problemas.</li>
          <li><strong>O que observar na rotina:</strong> aprenda a prestar atenção em situações que talvez estejam passando despercebidas.</li>
          <li><strong>Orientação prática:</strong> saiba o que fazer quando identificar algo que merece atenção.</li>
          <li><strong>Aulas em vídeo:</strong> conteúdo organizado para você assistir pelo celular ou computador.</li>
        </ul>
        <p>Você não precisa ser especialista. Não precisa entender palavras difíceis.</p>
        <p>O objetivo é que você consiga compreender as informações e saber o que observar no seu dia a dia.</p>
      </Section>

      <Section>
        <h2>ESSE TREINAMENTO É PARA VOCÊ?</h2>
        <ul>
          <li>Recebe o Bolsa Família e quer conhecer os cuidados que precisa ter no dia a dia.</li>
          <li>Depende desse dinheiro para ajudar nas despesas de casa e não quer ser pego de surpresa.</li>
          <li>Já ouviu falar de pessoas que tiveram problemas com o benefício e quer entender melhor o assunto.</li>
          <li>Tem medo de estar cometendo algum descuido sem perceber.</li>
          <li>Quer ter informações organizadas e explicadas de maneira simples.</li>
        </ul>
        <p>Se você se identificou com alguma dessas situações, continue.</p>
      </Section>

      <Section tone="soft">
        <h2>VEJA O BLINDA BOLSA FAMÍLIA POR DENTRO</h2>
        <p>Antes de conhecer o treinamento, você provavelmente quer saber como ele funciona.</p>
        <p>Por isso, preparei um vídeo para mostrar o Blinda Bolsa Família por dentro.</p>
        <p>Você poderá conhecer a apresentação do produto e entender como as aulas estão organizadas.</p>
        <p><strong>Esse vídeo é uma demonstração do treinamento. A lista completa dos 10 erros continua dentro do conteúdo.</strong></p>
        <VideoSlot src={COURSE_PRESENTATION_VIDEO} eyebrow="VÍDEO DE DEMONSTRAÇÃO" title="Conheça o Blinda Bolsa Família por dentro"/>
        <h2>O QUE DIZ O GUILHERME?</h2>
        <p>Assista ao relato em vídeo de Guilherme.</p>
        <VideoSlot src={TESTIMONIAL_VIDEO_ONE} eyebrow="DEPOIMENTO 1" title="Relato em vídeo — Guilherme"/>
        <h2>VEJA TAMBÉM ESTE OUTRO RELATO:</h2>
        <p>Confira o segundo depoimento em vídeo.</p>
        <VideoSlot src={TESTIMONIAL_VIDEO_TWO} eyebrow="DEPOIMENTO 2" title="Segundo relato em vídeo"/>
        <p>Agora você já conhece a proposta do treinamento e pode decidir se esse conteúdo faz sentido para você.</p>
      </Section>

      <Section tone="dark">
        <h2>O QUE VOCÊ RECEBE AO ADQUIRIR O BLINDA?</h2>
        <ul>
          <li>Acesso ao treinamento digital em vídeo.</li>
          <li>Conteúdo com os 10 erros e descuidos do dia a dia.</li>
          <li>Explicações sobre cada erro.</li>
          <li>Orientações sobre o que observar na rotina.</li>
          <li>Conteúdo organizado e explicado de maneira simples.</li>
          <li>Acesso online para assistir pelo celular ou computador.</li>
        </ul>
        <div className="bl-price-card">
          <p><strong>ACESSO AO BLINDA BOLSA FAMÍLIA</strong></p>
          <div className="bl-price">R$ 12,99</div>
          <p><strong>Pagamento único. Sem mensalidade.</strong></p>
          <p>Menos do que muita gente gasta em um lanche ou em uma pequena compra do dia a dia.</p>
          <p>Por esse valor você terá acesso a um treinamento que apresenta os 10 erros, explica cada um deles e mostra o que observar na sua rotina.</p>
          <BuyButton placement="oferta"/>
          <p className="bl-buy-note">Pagamento único • Acesso online após a compra</p>
        </div>
      </Section>

      <Section tone="soft" id="duvidas">
        <h2>AINDA TEM ALGUMA DÚVIDA?</h2>
        <div className="bl-faq">
          <details><summary>Isso é sobre cadastro ou papelada?</summary><p>Não. O treinamento é sobre erros e descuidos do dia a dia que podem passar despercebidos. O foco está nos hábitos e nas atitudes que merecem atenção.</p></details>
          <details><summary>É difícil de entender?</summary><p>Não. O conteúdo é apresentado em aulas em vídeo, com linguagem simples e direta.</p></details>
          <details><summary>Como recebo o treinamento?</summary><p>O acesso é online e disponibilizado após a compra. Você poderá assistir pelo celular ou computador.</p></details>
          <details><summary>Preciso ir a algum lugar?</summary><p>Não. O treinamento é digital. Você pode assistir de onde estiver, usando um dispositivo com acesso à internet.</p></details>
          <details><summary>O treinamento garante que não vou perder meu benefício?</summary><p>Não. O treinamento não garante manutenção, desbloqueio ou aprovação do Bolsa Família. Ele apresenta informações educativas sobre erros e descuidos que merecem atenção.</p></details>
          <details><summary>O pagamento é único?</summary><p>Sim. Você paga R$ 12,99 uma única vez. Não é uma assinatura mensal.</p></details>
          <details><summary>O produto é do governo?</summary><p>Não. O Blinda Bolsa Família é um treinamento digital independente.</p></details>
        </div>
      </Section>

      <Section tone="dark">
        <h2>VOLTE A IMAGINAR AQUELA SITUAÇÃO...</h2>
        <p>É dia de pagamento.</p>
        <p>Você abre o Caixa Tem.</p>
        <p>O dinheiro não está lá.</p>
        <p>Você vai até a lotérica. Entra na fila. Espera sua vez.</p>
        <p>E recebe um extrato com uma notícia que não queria receber.</p>
        <h2>VOCÊ QUER CONTINUAR SEM SABER QUAIS SÃO OS 10 ERROS?</h2>
        <p>Ou quer ter acesso ao treinamento e descobrir o que precisa observar na sua rotina?</p>
        <p>Por apenas <strong>R$ 12,99</strong>, você pode conhecer o Blinda Bolsa Família.</p>
        <p><strong>A lista completa está dentro do treinamento.</strong></p>
        <p>Não continue deixando essas informações escondidas de você.</p>
        <BuyButton placement="fechamento"/>
      </Section>

      <div className="bl-sticky"><BuyButton placement="fixo-mobile"/></div>
    </main>
  );
}
