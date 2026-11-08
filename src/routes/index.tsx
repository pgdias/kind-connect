import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackEvent } from "../lib/api";
import "../direct-vsl-desktop.css";

export const Route = createFileRoute("/")({ component: DirectVslPage });

function DirectVslPage() {
  useEffect(() => {
    void trackEvent("direct_vsl_landing_viewed");

    const script = document.createElement("script");
    script.src = "https://player.vplay.com.br/embed.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
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
            <p className="direct-vsl-subtitle">
              ASSISTA AO VÍDEO ABAIXO PARA DESCOBRIR QUAIS SÃO ESSES ERROS.
            </p>
          </section>

          <section className="vsl-video-wrap">
            <div
              data-vplay="6fce00a3-efeb-4f89-9b49-dc3bcf3d7845"
              data-aspect-ratio="9/16"
              data-border-radius="26"
              data-poster="https://video.vplay.com.br/users/151/media/4a1e7906-ce29-4de6-bdaf-bb8baced0306/poster/v1792525841179/poster.jpg"
              data-loading="eager"
            />
          </section>
        </div>
      </section>
    </main>
  );
}
