import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/quiz")({ component: QuizPlaceholder });
function QuizPlaceholder(){return <main className="placeholder"><div><span>PRÓXIMA ETAPA</span><h1>O teste será carregado aqui.</h1><p>Esta é a estrutura inicial do projeto. O motor do quiz entra na próxima etapa.</p><Link className="secondary-button" to="/">← Voltar</Link></div></main>}
