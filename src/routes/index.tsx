import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackEvent } from "../lib/api";
import "../direct-vsl-desktop.css";

export const Route = createFileRoute("/")({ component: DirectVslPage });

function DirectVslPage() {
  useEffect(() => {
    void trackEvent("direct_vsl_landing_viewed");

    const w = window as Window & { _vpt?: number };
    const p = performance;
    w._vpt = w._vpt || (p && p.timeOrigin ? p.timeOrigin + p.now() : Date.now());

    const addLink = (rel: string, href: string, as?: string, crossOrigin?: boolean) => {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      if (as) link.as = as;
      if (crossOrigin) link.crossOrigin = "anonymous";
      if (rel === "preload" && as === "image") {
        link.setAttribute("fetchpriority", "high");
      }
      document.head.appendChild(link);
    };

    addLink("preconnect", "https://player.vplay.com.br");
    addLink("preconnect", "https://video.vplay.com.br", undefined, true);
    addLink("dns-prefetch", "https://player.vplay.com.br");
    addLink("dns-prefetch", "https://video.vplay.com.br");
    addLink("preload", "https://player.vplay.com.br/embed.min.js", "script");
    addLink(
      "preload",
      "https://api.vplay.com.br/uploads/u151-img-44b3621d-f3ba-4b3b-a673-20ebb0e2f2ea.png",
      "image",
    );

    const script = document.createElement("script");
    script.src = "https://player.vplay.com.br/embed.min.js";
    script.defer = true;
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

          <section className="vsl-video-wrap">
            <div
              data-vplay="6fce00a3-efeb-4f89-9b49-dc3bcf3d7845"
              data-aspect-ratio="9/16"
              data-border-radius="26"
              data-poster="https://api.vplay.com.br/uploads/u151-img-44b3621d-f3ba-4b3b-a673-20ebb0e2f2ea.png"
              data-loading="eager"
            />
          </section>
        </div>
      </section>
    </main>
  );
}
