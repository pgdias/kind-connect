import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackEvent } from "../lib/api";

const COURSE_PRESENTATION_VIDEO = "";
const TESTIMONIAL_VIDEO_ONE = "";
const TESTIMONIAL_VIDEO_TWO = "";
const CHECKOUT_URL = "https://pay.cakto.com.br/38xq22v_1131074";

export const Route = createFileRoute("/")({ component: TslSalesPage });

function BuyButton({ label = "QUERO BLINDAR MEU BOLSA FAMÍLIA" }: { label?: string }) {
  return <a className="bl-buy" href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" onClick={() => { void trackEvent("checkout_click", { page: "/", checkout_provider: "cakto", funnel: "tsl" }); }}>{label}<span aria-hidden="true">➜</span></a>;
}

function VideoSlot({ src, title, eyebrow, kind = "main" }: { src: string; title: string; eyebrow: string; kind?: "main" | "testimonial" }) {
  return <section className={`bl-video-slot ${kind === "testimonial" ? "bl-video-testimonial" : ""}`}>
    <div className="bl-video-copy"><span className="bl-kicker">{eyebrow}</span><h3>{title}</h3><p>{src ? "Assista ao vídeo abaixo." : "Vídeo será adicionado aqui."}</p></div>
    <div className="bl-video-screen">{src ? <iframe src={src} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <div className="bl-video-placeholder"><span className="bl-play">▶</span><b>{kind === "main" ? "CONHEÇA O BLINDA POR DENTRO" : "RELATO EM VÍDEO"}</b><small>Espaço reservado para o vídeo</small></div>}</div>
  </section>;
}

function CopySection({ children, tone = "white", id }: { children: React.ReactNode; tone?: "white" | "soft" | "navy"; id?: string }) {
  return <section id={id} className={`bl-section ${tone}`}><div className="bl-shell bl-copy-block">{children}</div></section>;
}

function TslSalesPage() {
  useEffect(() => { void trackEvent("tsl_landing_viewed"); }, []);
  return <main className="bl-page">
    <style>{`
      .bl-page{--navy:#061f4f;--navy2:#092d68;--yellow:#ffd21a;--red:#e21b23;--green:#159b28;--ink:#071c43;background:#f4f6fa;color:var(--ink);font-family:Arial,Helvetica,sans-serif;overflow:hidden;padding-bottom:0}
      .bl-page *{box-sizing:border-box}.bl-shell{width:min(100% - 36px,900px);margin:0 auto}
      .bl-top{background:#041638;color:#fff;text-align:center;padding:10px 14px;font-size:11px;font-weight:900;letter-spacing:.1em}
      .bl-hero{background:linear-gradient(145deg,#041b45 0%,#082d65 62%,#0a4d45 100%);color:#fff;padding:clamp(25px,5vw,48px) 0 36px}
      .bl-brand{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:20px;font-weight:1000;font-size:clamp(20px,5vw,30px);letter-spacing:-.8px}.bl-brand span{color:var(--yellow)}
      .bl-alert{display:block;width:fit-content;max-width:100%;margin:0 auto;background:var(--yellow);color:#071b3d;border-radius:7px;padding:8px 12px;font-size:11px;font-weight:1000;letter-spacing:.04em;text-align:center}
      .bl-hero h1{font-size:clamp(30px,5.6vw,52px);line-height:1.04;letter-spacing:-1.4px;text-transform:uppercase;font-weight:1000;text-align:center;margin:18px auto 14px;max-width:850px}
      .bl-hero h1 em{color:var(--yellow);font-style:normal}.bl-hero-lead{font-size:clamp(15px,2vw,18px);line-height:1.5;font-weight:700;max-width:700px;text-align:center;margin:0 auto 18px;color:#eef4ff}
      .bl-price-top{text-align:center;font-size:16px;font-weight:900;color:#fff;margin:0 auto 15px}
      .bl-section{padding:clamp(30px,5vw,52px) 0}.bl-section.white{background:#fff}.bl-section.soft{background:linear-gradient(180deg,#eaf0f8,#f7f8fb)}.bl-section.navy{background:var(--navy);color:#fff}
      .bl-copy-block{max-width:760px;margin:0 auto;color:inherit}.bl-copy-block p{font-size:17px;line-height:1.72;margin:0 0 16px;color:inherit}
      .bl-copy-block h2{font-size:clamp(26px,4.5vw,40px);line-height:1.1;margin:20px 0 20px;text-align:left;text-transform:none;letter-spacing:-.7px;color:var(--navy);font-weight:1000}
      .bl-copy-block h3{font-size:clamp(20px,3vw,26px);line-height:1.2;margin:24px 0 14px;font-weight:1000;color:inherit}
      .bl-copy-block strong{font-weight:1000}.bl-copy-block ul{padding:0;margin:18px 0 25px;list-style:none}
      .bl-copy-block li{font-size:16px;line-height:1.55;padding:12px 0;border-bottom:1px solid #dce3ee}
      .bl-section.navy .bl-copy-block h2{color:#ffe06a}.bl-section.navy .bl-copy-block p{color:#eef4ff}.bl-section.navy .bl-copy-block li{border-color:#ffffff24}
      .bl-kicker{display:block;color:#d21c25;font-size:11px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase;margin-bottom:9px}
      .bl-buy{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(180deg,#25bd36,#087d20);border:2px solid #a8ff8d;color:#fff;text-align:center;text-decoration:none;border-radius:12px;min-height:62px;padding:14px 16px;font-size:clamp(14px,2vw,17px);line-height:1.2;font-weight:1000;text-transform:uppercase;box-shadow:0 7px 0 #075c1b,0 12px 22px #0002;transition:transform .15s ease;max-width:570px;margin:22px auto 16px}
      .bl-buy:hover{transform:translateY(-2px)}.bl-buy span{font-size:22px;flex:none}.bl-text-link{display:block;text-align:center;color:#0b4f9c;font-weight:900;text-decoration:underline;font-size:14px;margin:13px auto 6px}
      .bl-cta-note{text-align:center;font-size:12px!important;line-height:1.5!important;color:#64748b!important;margin:8px auto 0!important}
      .bl-section.navy .bl-cta-note{color:#dce7fb!important}
      .bl-video-slot{background:#071f4d;color:#fff;border:2px solid #fff;border-radius:16px;padding:16px;box-shadow:0 14px 30px #061f4f24;margin:0 auto 20px;max-width:780px}
      .bl-video-copy h3{font-size:23px;line-height:1.12;margin:0 0 7px;color:#fff}.bl-video-copy p{font-size:13px;color:#d5e2f6;margin:0 0 12px}
      .bl-video-slot .bl-kicker{color:var(--yellow)}.bl-video-screen{aspect-ratio:16/9;background:linear-gradient(145deg,#123d79,#061735);border:1px solid #ffffff30;border-radius:10px;overflow:hidden;position:relative}
      .bl-video-screen iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.bl-video-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;padding:15px;color:#fff}
      .bl-video-placeholder b{font-size:clamp(13px,2vw,20px);color:var(--yellow);font-weight:1000}.bl-video-placeholder small{font-size:11px;color:#d5e2f6}
      .bl-play{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:var(--yellow);color:var(--navy);font-size:25px;padding-left:3px;box-shadow:0 0 0 8px #ffffff25}
      .bl-video-testimonial{padding:13px;margin:0}.bl-video-testimonial .bl-video-copy h3{font-size:18px}
      .bl-faq{max-width:760px;margin:20px auto}.bl-faq details{background:#fff;border:1px solid #dce3ee;border-radius:12px;padding:16px;margin:10px 0}
      .bl-faq summary{font-size:15px;font-weight:900;color:var(--navy);cursor:pointer;line-height:1.4}.bl-faq details p{font-size:14px;color:#53627a;line-height:1.65;margin:10px 0 0}
      .bl-footer{background:#041638;color:#dbe5f4;padding:26px 0 30px;text-align:center}.bl-footer p{font-size:11px;line-height:1.65;margin:0 auto;max-width:900px}
      .bl-sticky{display:none}
      @media(max-width:700px){
        .bl-shell{width:calc(100% - 30px)}.bl-top{font-size:9px;padding:9px 8px}
        .bl-hero{padding:22px 0 27px}.bl-brand{font-size:23px;margin-bottom:18px}.bl-alert{font-size:9px;line-height:1.35}
        .bl-hero h1{font-size:clamp(29px,8.8vw,42px);line-height:1.06;letter-spacing:-.9px;margin:16px auto 13px}
        .bl-hero-lead{font-size:15px;line-height:1.48;margin-bottom:13px}.bl-price-top{font-size:14px;margin-bottom:10px}
        .bl-section{padding:30px 0}.bl-copy-block p{font-size:16px;line-height:1.68;margin-bottom:15px}
        .bl-copy-block h2{font-size:28px;line-height:1.1;margin:18px 0 15px}.bl-copy-block h3{font-size:21px;margin:20px 0 12px}
        .bl-copy-block li{font-size:15px;line-height:1.5;padding:12px 0}
        .bl-buy{min-height:58px;font-size:14px;padding:13px 12px;margin:20px auto 15px;border-radius:11px}.bl-text-link{font-size:13px}
        .bl-video-slot{padding:12px;border-radius:13px;margin-bottom:17px}.bl-video-copy h3{font-size:20px}.bl-video-screen{border-radius:8px}
        .bl-sticky{display:block;position:fixed;z-index:100;left:0;right:0;bottom:0;padding:8px 12px calc(9px + env(safe-area-inset-bottom));background:#ffffffed;border-top:1px solid #dce3ee;backdrop-filter:blur(12px)}
        .bl-sticky .bl-buy{max-width:560px;margin:0 auto;min-height:48px;font-size:12px;box-shadow:0 4px 0 #075c1b}
        .bl-footer{padding-bottom:100px}
      }
      @media(max-width:360px){.bl-hero h1{font-size:28px}.bl-copy-block p{font-size:15px}.bl-buy{font-size:12px}}
      @media(prefers-reduced-motion:reduce){.bl-buy{transition:none}}
    `}</style>
    <div className="bl-top">BLINDA BOLSA FAMÍLIA • TREINAMENTO DIGITAL</div>

    <header className="bl-hero">
      <div className="bl-shell">
        <div className="bl-brand">🔒 BLINDA <span>BOLSA FAMÍLIA</span></div>
        <span className="bl-alert">ATENÇÃO, BENEFICIÁRIO DO BOLSA FAMÍLIA</span>
        <h1>EXISTEM 10 ERROS DO DIA A DIA QUE PODEM COLOCAR SEU BOLSA FAMÍLIA EM RISCO — E VOCÊ PODE ESTAR COMETENDO ALGUM DELES AGORA MESMO, SEM SABER</h1>
        <p className="bl-hero-lead">A lista completa está trancada dentro do Blinda Bolsa Família. Enquanto você não conhece esses erros, eles continuam acontecendo.</p>
        <p className="bl-price-top">Acesso imediato por R$ 12,99 — pagamento único.</p>
        <BuyButton/>
        <a className="bl-text-link" href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">👉 COMPRAR AGORA POR R$ 12,99</a>
        <p className="bl-cta-note">Compra segura. Acesso online. Produto independente, de caráter educativo. Não é produto do governo.</p>
      </div>
    </header>

    <CopySection>
      <h2>Hoje é dia de pagamento.</h2>
      <p>Você acorda cedo. Pega o celular. Abre o Caixa Tem.</p>
      <p>E o dinheiro não está lá.</p>
      <p>“Deve ser lentidão. Vai cair.”</p>
      <p>Você espera. Passa a manhã. Passa o almoço. Nada.</p>
      <p>À tarde, você vai até a lotérica. Pega a fila. Chega a sua vez. Entrega os dados. E recebe o extrato.</p>
      <h2>“Seu Bolsa Família foi cancelado.”</h2>
      <p>O chão desaparece.</p>
      <p>Você volta para casa sem entender. Sem saber o que fazer. Sem saber o que dizer para os seus filhos.</p>
      <p>E a única pergunta que martela na sua cabeça é:</p>
      <h3>“O que eu fiz de errado?”</h3>
    </CopySection>

    <CopySection tone="soft">
      <p>Se você recebe o Bolsa Família, sabe do que eu estou falando.</p>
      <p>Sabe o que é depender desse dinheiro para colocar comida na mesa.</p>
      <p>Sabe o que é contar com esse valor para pagar o gás, comprar o remédio, vestir os filhos.</p>
      <p>E sabe também o medo que vem junto.</p>
      <p>O medo de abrir o aplicativo e o dinheiro não estar lá.</p>
      <p>O medo de chegar na lotérica e descobrir que tem algo errado.</p>
      <p>O medo de ser surpreendido com uma notícia que muda tudo — sem nem saber o motivo.</p>
      <p>Porque a verdade é essa:</p>
      <h2>Ninguém te explica direito.</h2>
      <p>Ninguém te ensina quais atitudes do dia a dia podem pesar. Quais hábitos passam despercebidos. O que você faz sem pensar e que, lá na frente, pode ser interpretado de outro jeito.</p>
      <p>Você só descobre que tem algo errado quando já é tarde.</p>
    </CopySection>

    <CopySection>
      <p>Foi exatamente isso que aconteceu com o responsável pelo Blinda Bolsa Família.</p>
      <p>Ele também era beneficiário. Também dependia do dinheiro. E também teve o benefício cancelado.</p>
      <p>Na hora, ele não entendeu.</p>
      <p>“Será que eu fiz alguma coisa sem saber?”</p>
      <p>“Será que foi algum descuido do dia a dia?”</p>
      <p>“Será que tem algo que eu repito todos os dias e nem percebo?”</p>
      <p>Ele começou a conversar com outras pessoas que também tinham enfrentado problemas com o benefício.</p>
      <p>E descobriu algo assustador:</p>
      <h2>Quase todas estavam cometendo os mesmos erros. Sem perceber.</h2>
      <p>Descuidos simples. Hábitos repetidos sem pensar. Atitudes que parecem certas, mas não são.</p>
      <p>E foi a partir dessa descoberta que nasceu o Blinda Bolsa Família.</p>
    </CopySection>

    <CopySection tone="navy">
      <h2>Aqui está o que você precisa entender:</h2>
      <p>Existem <strong>10 erros e descuidos do dia a dia</strong> que beneficiários do Bolsa Família cometem sem perceber.</p>
      <p>Erros que parecem inofensivos.</p>
      <p>Erros que ninguém nota que está cometendo.</p>
      <p>Erros que podem colocar o seu benefício em risco — e você só descobre quando já é tarde.</p>
      <p><strong>Não é sobre cadastro. Não é sobre papelada. Não é sobre burocracia.</strong></p>
      <p>É sobre o que você faz todos os dias, muitas vezes no automático, sem imaginar que aquilo tem peso.</p>
      <p>Não vou listar todos aqui. Seria irresponsável da minha parte jogar uma lista de 10 itens no meio de uma página, sem contexto, sem explicação, sem mostrar o que fazer com a informação.</p>
      <p>Mas eu posso te dar <strong>pistas do que está lá dentro</strong>:</p>
      <ul>
        <li>Há um hábito que parece inofensivo — e que quase ninguém percebe que repete.</li>
        <li>Existe uma atitude que muita gente toma achando que está agindo certo.</li>
        <li>Tem um descuido que passa batido na correria e que pode ser interpretado de outro jeito.</li>
        <li>E há pelo menos um erro que a maioria das pessoas comete <strong>sem imaginar que aquilo conta</strong>.</li>
      </ul>
      <p><strong>A lista completa, com a explicação de cada erro e o que observar na rotina, está dentro do Blinda Bolsa Família.</strong></p>
      <p>E a pergunta que você precisa se fazer agora é:</p>
      <h2>“Será que eu estou cometendo algum desses erros e nem sei?”</h2>
      <p>Se você não sabe a resposta, esse é o primeiro sinal de alerta.</p>
      <p>Porque quem não conhece os erros não sabe o que precisa corrigir.</p>
      <p>E quem não sabe o que corrigir continua exposto.</p>
      <p><strong>Enquanto você não conhece esses erros, eles continuam acontecendo.</strong></p>
      <p>Todos os dias.</p>
      <p>Sem você perceber.</p>
    </CopySection>

    <CopySection tone="soft">
      <h2>Foi para resolver isso que criaram o:</h2>
      <h2>BLINDA BOLSA FAMÍLIA</h2>
      <p>Um treinamento digital, com aulas em vídeo, que revela os <strong>10 erros do dia a dia</strong> e mostra o que fazer com cada um.</p>
      <p>Dentro do treinamento, você encontra:</p>
      <ul>
        <li>✅ <strong>A revelação dos 10 erros</strong> — um por um, explicados de forma simples e direta.</li>
        <li>✅ <strong>Por que cada erro pode causar problemas</strong> — para você entender a gravidade de cada situação.</li>
        <li>✅ <strong>Como identificar se você está cometendo algum deles</strong> — para sair do automático e passar a observar.</li>
        <li>✅ <strong>O que evitar repetir na rotina</strong> — para não continuar alimentando o mesmo descuido.</li>
        <li>✅ <strong>Onde buscar orientação quando encontrar algo errado</strong> — para saber o caminho certo.</li>
        <li>✅ <strong>Um passo a passo organizado</strong> — para entender o que fazer com a informação.</li>
      </ul>
      <p>Tudo explicado de forma simples, popular e fácil de acompanhar.</p>
      <h3>Feito para você, beneficiário, que precisa entender o que está acontecendo — antes que seja tarde.</h3>
    </CopySection>

    <CopySection>
      <h2>Para quem é</h2>
      <p>👉 <strong>Recebe o Bolsa Família</strong> e quer saber quais cuidados tomar para não ser pego de surpresa.</p>
      <p>👉 <strong>Depende desse dinheiro</strong> para colocar comida na mesa e não pode descobrir um problema só quando o dinheiro não cair.</p>
      <p>👉 <strong>Tem medo de perder o benefício</strong> e quer saber o que observar na rotina e onde buscar orientação.</p>
      <p>👉 <strong>Já ouviu falar de alguém que teve o benefício bloqueado ou cancelado</strong> e não quer que isso aconteça com você.</p>
      <p>👉 <strong>Faz muita coisa no automático</strong> e quer entender quais hábitos podem passar despercebidos.</p>
      <p>Se você se identificou com pelo menos um desses pontos, este treinamento foi feito para você.</p>
    </CopySection>

    <CopySection tone="soft">
      <p>Agora eu quero te convidar para fazer algo.</p>
      <p>Assista ao vídeo abaixo.</p>
      <p>Nele, o responsável pelo Blinda mostra o treinamento por dentro.</p>
      <p>Você vai ver as aulas. Vai ver os módulos. Vai entender como o conteúdo funciona.</p>
      <p>E vai perceber por que esses 10 erros do dia a dia passam tão despercebidos.</p>
      <p><strong>O vídeo não entrega a lista. A lista está trancada dentro do treinamento.</strong></p>
      <p>Mas ele mostra por que tanta gente só descobre o problema quando já é tarde.</p>
      <VideoSlot src={COURSE_PRESENTATION_VIDEO} eyebrow="VÍDEO DE DEMONSTRAÇÃO DO PRODUTO" title="Conheça o Blinda Bolsa Família por dentro"/>
      <p>[INSERIR VÍDEO DE DEMONSTRAÇÃO DO PRODUTO]</p>
      <p>Depois, veja o que pessoas que conheceram o Blinda têm a dizer:</p>
      <h3>Depoimento 1 — Guilherme:</h3>
      <VideoSlot src={TESTIMONIAL_VIDEO_ONE} eyebrow="DEPOIMENTO 1 — GUILHERME" title="Depoimento do Guilherme" kind="testimonial"/>
      <p>[INSERIR VÍDEO DO DEPOIMENTO DO GUILHERME]</p>
      <h3>Depoimento 2:</h3>
      <VideoSlot src={TESTIMONIAL_VIDEO_TWO} eyebrow="DEPOIMENTO 2" title="Segundo depoimento" kind="testimonial"/>
      <p>[INSERIR VÍDEO DO SEGUNDO DEPOIMENTO]</p>
      <p>E se pergunte:</p>
      <h3>“Será que eu também estou cometendo esses erros?”</h3>
    </CopySection>

    <CopySection tone="navy">
      <h2>Agora, vamos falar do que você recebe:</h2>
      <ul>
        <li>✅ Acesso ao treinamento digital completo em vídeo</li>
        <li>✅ O módulo com a revelação dos <strong>10 erros do dia a dia</strong></li>
        <li>✅ Explicações simples e diretas sobre cada erro</li>
        <li>✅ Orientação sobre o que observar na rotina</li>
        <li>✅ Passo a passo organizado</li>
        <li>✅ Acesso imediato após a compra</li>
      </ul>
      <p>E quanto custa tudo isso?</p>
      <h2>R$ 12,99 — pagamento único.</h2>
      <p>Menos do que uma pizza.</p>
      <p>Menos do que um lanche.</p>
      <p>Menos do que a maioria das pessoas gasta sem pensar em um único dia.</p>
      <p>R$ 12,99 para finalmente descobrir quais são os 10 erros do dia a dia que podem passar despercebidos.</p>
      <p>R$ 12,99 para saber o que observar — antes que seja tarde.</p>
      <BuyButton/>
      <a className="bl-text-link" href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">👉 COMPRAR AGORA POR R$ 12,99</a>
      <p className="bl-cta-note">Compra segura. Acesso online. Pagamento único.</p>
    </CopySection>

    <CopySection>
      <h2>Objeções</h2>
      <h3>“Isso é sobre cadastro?”</h3>
      <p>Não. O treinamento trata de <strong>erros e descuidos do dia a dia</strong> — hábitos e atitudes que a pessoa repete sem perceber. Não é sobre papelada, cadastro ou burocracia.</p>
      <h3>“Isso é difícil de entender?”</h3>
      <p>Não. As aulas são em vídeo, com linguagem direta. Qualquer pessoa consegue acompanhar.</p>
      <h3>“Como recebo o treinamento?”</h3>
      <p>Após a compra, você recebe o acesso online. Assiste quando e onde quiser, pelo celular ou computador.</p>
      <h3>“Preciso ir a algum lugar?”</h3>
      <p>Não. O treinamento é digital. Você assiste de casa.</p>
      <h3>“O treinamento garante que eu não vou perder o benefício?”</h3>
      <p>Não. Nenhum treinamento pode garantir isso. O Blinda mostra quais erros merecem atenção e o que você pode observar. A decisão e a responsabilidade pelas informações são sempre suas.</p>
      <h3>“O pagamento é único?”</h3>
      <p>Sim. R$ 12,99, pagamento único. Sem mensalidade.</p>
      <h3>“O produto é do governo?”</h3>
      <p>Não. É um treinamento digital independente, de caráter educativo.</p>
    </CopySection>

    <CopySection tone="navy">
      <h2>Volte àquela cena do início.</h2>
      <p>O dia do pagamento.</p>
      <p>O Caixa Tem vazio.</p>
      <p>A fila da lotérica.</p>
      <p>O extrato com a notícia que ninguém quer receber.</p>
      <h2>Você quer continuar sem saber quais são os 10 erros?</h2>
      <p>Você quer continuar dependendo da sorte — ou quer finalmente conhecer as informações que podem fazer diferença?</p>
      <p>Por R$ 12,99, você tem acesso a um treinamento que revela os 10 erros do dia a dia, explica por que eles são perigosos e mostra o que você precisa observar.</p>
      <p><strong>A lista está lá dentro. E enquanto você não conhece, ela continua escondida.</strong></p>
      <p>Não deixe para descobrir depois que já é tarde.</p>
      <BuyButton/>
      <a className="bl-text-link" href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">👉 COMPRAR AGORA POR R$ 12,99</a>
      <p className="bl-cta-note">Compra segura. Acesso online. Pagamento único.</p>
    </CopySection>

    <footer className="bl-footer"><div className="bl-shell"><p>Blinda Bolsa Família — Treinamento digital educativo. Este produto não garante manutenção, desbloqueio ou aprovação do benefício. Não é um produto oficial do governo.</p></div></footer>
    <div className="bl-sticky"><BuyButton/></div>
  </main>;
}
