import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent(){return <div className="placeholder"><div><span>404</span><h1>Página não encontrada</h1><p>A página que você procura não existe.</p><Link className="secondary-button" to="/">Voltar para o início</Link></div></div>}
function ErrorComponent({error,reset}:{error:Error;reset:()=>void}){console.error(error);const router=useRouter();useEffect(()=>{reportLovableError(error,{boundary:"tanstack_root_error_component"});},[error]);return <div className="placeholder"><div><h1>Não foi possível carregar a página</h1><p>Algo deu errado. Tente novamente.</p><button className="secondary-button" onClick={()=>{router.invalidate();reset();}}>Tentar novamente</button></div></div>}
export const Route=createRootRouteWithContext<{queryClient:QueryClient}>()({
  head:()=>({meta:[
    {charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},
    {title:"Blinda Bolsa Família"},{name:"description",content:"Teste informativo para identificar pontos relacionados ao Bolsa Família que podem merecer conferência."},
    {property:"og:title",content:"Blinda Bolsa Família"},{property:"og:description",content:"Teste informativo sobre pontos que podem merecer conferência."},{property:"og:type",content:"website"}
  ],links:[{rel:"stylesheet",href:appCss},{rel:"icon",href:"/favicon.ico",type:"image/x-icon"}]}),
  shellComponent:RootShell,component:RootComponent,notFoundComponent:NotFoundComponent,errorComponent:ErrorComponent
});
function RootShell({children}:{children:ReactNode}){return <html lang="pt-BR"><head><HeadContent/></head><body>{children}<Scripts/></body></html>}
function RootComponent(){const {queryClient}=Route.useRouteContext();return <QueryClientProvider client={queryClient}><Outlet/></QueryClientProvider>}
