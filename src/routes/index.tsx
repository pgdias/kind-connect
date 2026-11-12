import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { trackEvent } from "../lib/api";
import "../direct-vsl-desktop.css";


const ACTIVITY_BUYERS = [
  ["Maria Silva", "Fortaleza (CE)"],
  ["Ana Souza", "Salvador (BA)"],
  ["João Santos", "Recife (PE)"],
  ["Francisca Oliveira", "São Luís (MA)"],
  ["Antônia Lima", "Maceió (AL)"],
  ["Josefa Pereira", "Teresina (PI)"],
  ["Raimunda Costa", "Belém (PA)"],
  ["Luís Almeida", "Manaus (AM)"],
  ["Carla Rodrigues", "Natal (RN)"],
  ["Paulo Ferreira", "João Pessoa (PB)"],
  ["Adriana Gomes", "Aracaju (SE)"],
  ["Juliana Martins", "Sobral (CE)"],
  ["Bruna Barbosa", "Feira de Santana (BA)"],
  ["Patrícia Ribeiro", "Jaboatão dos Guararapes (PE)"],
  ["Marcos Araújo", "Caucaia (CE)"],
  ["Fernanda Carvalho", "Duque de Caxias (RJ)"],
  ["Simone Rocha", "São Gonçalo (RJ)"],
  ["Cláudia Nascimento", "Belford Roxo (RJ)"],
  ["Vanessa Dias", "Nova Iguaçu (RJ)"],
  ["Letícia Moreira", "Guarulhos (SP)"],
] as const;

let notificationAudioContext: AudioContext | null = null;

function playNotificationSound() {
  try {
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return;
    if (!notificationAudioContext) notificationAudioContext = new AudioContextClass();
    const context = notificationAudioContext;

    const start = () => {
      const now = context.currentTime;
      const master = context.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.13, now + 0.018);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);
      master.connect(context.destination);

      [
        { frequency: 659.25, offset: 0, duration: 0.18 },
        { frequency: 783.99, offset: 0.11, duration: 0.2 },
        { frequency: 1046.5, offset: 0.22, duration: 0.34 },
      ].forEach(({ frequency, offset, duration }) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, now + offset);
        gain.gain.setValueAtTime(0.0001, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.72, now + offset + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + duration);
        oscillator.connect(gain);
        gain.connect(master);
        oscillator.start(now + offset);
        oscillator.stop(now + offset + duration + 0.02);
      });

      window.setTimeout(() => {
        if (notificationAudioContext === context) {
          void context.close();
          notificationAudioContext = null;
        }
      }, 900);
    };

    if (context.state === "suspended") {
      void context.resume().then(start).catch(() => {
        void context.close();
        notificationAudioContext = null;
      });
    } else {
      start();
    }
  } catch {
    // Audio is optional; notifications remain visible if playback is blocked.
  }
}

function ActivityNotifications() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rotation: number | undefined;
    let transition: number | undefined;

    const firstNotification = window.setTimeout(() => {
      setVisible(true);
      playNotificationSound();

      rotation = window.setInterval(() => {
        setVisible(false);
        transition = window.setTimeout(() => {
          setIndex((current) => (current + 1) % ACTIVITY_BUYERS.length);
          setVisible(true);
          playNotificationSound();
        }, 120);
      }, 25000);
    }, 230000);

    return () => {
      window.clearTimeout(firstNotification);
      if (rotation !== undefined) window.clearInterval(rotation);
      if (transition !== undefined) window.clearTimeout(transition);
    };
  }, []);

  if (!visible) return null;
  const buyer = ACTIVITY_BUYERS[index];

  return (
    <div className="activity-notification" role="status" aria-live="polite">
      <div className="activity-notification-icon">✓</div>
      <div>
        <p>
          <b>{buyer[0]}</b>, de <b>{buyer[1]}</b>, acabou de adquirir o <b>Blinda Bolsa Família</b>.
        </p>
        <small>Agora mesmo</small>
      </div>
      <span className="activity-notification-close">×</span>
    </div>
  );
}

export const Route = createFileRoute("/")({ component: DirectVslPage });

function DirectVslPage() {
  useEffect(() => {
    void trackEvent("direct_vsl_landing_viewed");

    const playerOrigin = document.createElement("link");
    playerOrigin.rel = "preconnect";
    playerOrigin.href = "https://player.vplay.com.br";
    document.head.appendChild(playerOrigin);

    const videoOrigin = document.createElement("link");
    videoOrigin.rel = "preconnect";
    videoOrigin.href = "https://video.vplay.com.br";
    videoOrigin.crossOrigin = "anonymous";
    document.head.appendChild(videoOrigin);

    return () => {
      playerOrigin.remove();
      videoOrigin.remove();
    };
  }, []);

  return (
    <main className="result-page vsl-sales-page direct-vsl-page">\n      <ActivityNotifications />
      <section className="result-main">
        <div className="result-container vsl-sales-container">
          <section className="vsl-headline direct-vsl-headline">
            <h1>
              10 ERROS IMPORTANTES QUE PODEM <em>COLOCAR SEU BOLSA FAMÍLIA EM RISCO</em> E VOCÊ NEM IMAGINA.
            </h1>
          </section>

          <section
            className="direct-vsl-story-image"
            style={{ width: "100%", maxWidth: "900px", margin: "0 auto 22px", padding: "0 2px" }}
          >
            <img
              src="https://i.postimg.cc/d3sPsMhJ/Bolsa-Familia-Bloqueado-Historia-Real.png"
              alt="História real sobre bloqueio do Bolsa Família"
              loading="eager"
              fetchPriority="high"
              style={{ display: "block", width: "100%", height: "auto", borderRadius: "16px" }}
            />
          </section>

          <section className="direct-vsl-scroll-guide" aria-label="Orientação para encontrar o vídeo">
            <p className="direct-vsl-scroll-alert">⬇️ ATENÇÃO! NÃO SAIA DA PÁGINA!</p>
            <h2>DESLIZE A TELA PARA BAIXO</h2>
            <p className="direct-vsl-scroll-description">
              O VÍDEO COMPLETO ESTÁ MAIS ABAIXO. ASSISTA PARA DESCOBRIR OS ERROS!
            </p>
            <span className="direct-vsl-scroll-arrow" aria-hidden="true">↓</span>
          </section>

          <p className="direct-vsl-subtitle direct-vsl-image-caption">
            ASSISTA AO VÍDEO COMPLETO PARA DESCOBRIR OS ERROS QUE EU ESTAVA COMETENDO TODOS OS DIAS E NEM IMAGINAVA QUE PODERIAM CAUSAR O BLOQUEIO DO BOLSA FAMÍLIA.
          </p>

          <section className="vsl-video-wrap">
            <iframe
              src="https://player.vplay.com.br/player/6fce00a3-efeb-4f89-9b49-dc3bcf3d7845/bridge?br=26"
              title="Vídeo explicativo sobre o Bolsa Família"
              allow="fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              loading="eager"
              style={{
                display: "block",
                width: "100%",
                aspectRatio: "9 / 16",
                border: 0,
                borderRadius: "26px",
                background: "#000",
              }}
            />
          </section>
        </div>
      </section>
    </main>
  );
}
