import { createFileRoute } from "@tanstack/react-router";
import { createElement, useEffect, useState } from "react";
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

function unlockNotificationAudio() {
  try {
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return;
    if (!notificationAudioContext) notificationAudioContext = new AudioContextClass();
    if (notificationAudioContext.state === "suspended") {
      void notificationAudioContext.resume().catch(() => undefined);
    }
  } catch {
    // Audio remains optional if the browser does not support it.
  }
}

function playNotificationSound() {
  try {
    const context = notificationAudioContext;
    if (!context) return;

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

    };

    if (context.state === "suspended") {
      void context.resume().then(start).catch(() => undefined);
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

    // Browsers require a user gesture before allowing notification audio.
    const unlockAudio = () => unlockNotificationAudio();
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

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
      }, 5000);
    }, 119000);

    return () => {
      window.clearTimeout(firstNotification);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      if (rotation !== undefined) window.clearInterval(rotation);
      if (transition !== undefined) window.clearTimeout(transition);
    };
  }, []);

  if (!visible) return null;
  const buyer = ACTIVITY_BUYERS[index]!;

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


function VPlayPlayerEmbed() {
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.customElements) return;

    const registry = window.customElements;
    if (registry.get("vplay-player")) {
      setPlayerReady(true);
      return;
    }

    let active = true;
    void registry.whenDefined("vplay-player").then(() => {
      if (active) setPlayerReady(true);
    });

    return () => {
      active = false;
    };
  }, []);

  if (!playerReady) {
    return (
      <div
        aria-label="Carregando vídeo"
        style={{
          width: "100%",
          aspectRatio: "9 / 16",
          background: "#000",
        }}
      />
    );
  }

  return createElement("vplay-player", {
    id: "6fce00a3-efeb-4f89-9b49-dc3bcf3d7845",
    "aspect-ratio": "9/16",
    style: {
      display: "block",
      width: "100%",
      maxWidth: "100%",
    },
  });
}

export const Route = createFileRoute("/")({ component: DirectVslPage });

function DirectVslPage() {

  useEffect(() => {
    void trackEvent("direct_vsl_landing_viewed");
  }, []);

  return (
    <main className="result-page vsl-sales-page direct-vsl-page">
      <ActivityNotifications />
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
            <VPlayPlayerEmbed />
          </section>
        </div>
      </section>
    </main>
  );
}
