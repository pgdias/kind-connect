import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackEvent } from "../lib/api";
import "../direct-vsl-desktop.css";

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
    <main className="result-page vsl-sales-page direct-vsl-page">
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
