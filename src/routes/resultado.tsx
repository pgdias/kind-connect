import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/resultado")({ component: ResultPlaceholder });

function ResultPlaceholder() {
  return (
    <main className="placeholder">
      <div>
        <span>PRÓXIMA ETAPA</span>
        <h1>Sua avaliação está pronta.</h1>
        <p>A tela de resultado personalizada será implementada na próxima etapa.</p>
        <Link className="secondary-button" to="/">← Voltar ao início</Link>
      </div>
    </main>
  );
}
