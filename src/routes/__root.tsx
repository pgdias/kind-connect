import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, useRouterState, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import appCss from "../styles.css?url";
import professionalCss from "../professional-theme.css?url";
import analyticsPremiumCss from "../analytics-premium.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent(){return <div className="placeholder"><div><span>404</span><h1>Página não encontrada</h1><p>A página que você procura não existe.</p><Link className="secondary-button" to="/">Voltar para o início</Link></div></div>}
function ErrorComponent({error,reset}:{error:Error;reset:()=>void}){console.error(error);const router=useRouter();useEffect(()=>{reportLovableError(error,{boundary:"tanstack_root_error_component"});},[error]);return <div className="placeholder"><div><h1>Não foi possível carregar a página</h1><p>Algo deu errado. Tente novamente.</p><button className="secondary-button" onClick={()=>{router.invalidate();reset();}}>Tentar novamente</button></div></div>}
export const Route=createRootRouteWithContext<{queryClient:QueryClient}>()({
head:()=>({meta:[{charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{title:"Blinda Bolsa Família | Descubra o que merece atenção"},{name:"description",content:"Teste gratuito e informativo para identificar pontos do Bolsa Família e do Cadastro Único que podem merecer conferência. Leva cerca de 2 minutos."},{name:"robots",content:"index, follow, max-image-preview:large"},{name:"keywords",content:"Bolsa Família, Cadastro Único, CadÚnico, atualização cadastral, benefício, pendência Bolsa Família, regras Bolsa Família, teste Bolsa Família"},{name:"author",content:"Blinda Bolsa Família"},{property:"og:title",content:"Blinda Bolsa Família | Você sabe se está tudo certo?"},{property:"og:description",content:"Faça um teste gratuito e descubra quais pontos relacionados ao seu Bolsa Família podem merecer atenção."},{property:"og:type",content:"website"},{property:"og:locale",content:"pt_BR"},{property:"og:site_name",content:"Blinda Bolsa Família"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:"Blinda Bolsa Família | Teste gratuito"},{name:"twitter:description",content:"Descubra quais pontos podem merecer conferência. Teste rápido e informativo."}],links:[{rel:"stylesheet",href:appCss},{rel:"stylesheet",href:professionalCss},{rel:"stylesheet",href:analyticsPremiumCss},{rel:"icon",href:"/favicon.ico",type:"image/x-icon"},{rel:"canonical",href:"https://blinda.pgdias.com.br/"}]}),shellComponent:RootShell,component:RootComponent,notFoundComponent:NotFoundComponent,errorComponent:ErrorComponent});

function RootShell({children}:{children:ReactNode}){
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
              s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1677492080666441');
              fbq('track', 'PageView');
            `,
          }}
        />
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          async
          defer
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
        />
        <script
          dangerouslySetInnerHTML={{ __html: 'window.pixelId = "6ae12a45dcb6017f5230a156";' }}
        />
        <script
          src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
          async
          defer
        />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1677492080666441&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent(){
  const {queryClient}=Route.useRouteContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (previousPathname.current !== null && previousPathname.current !== pathname) {
      const pixelWindow = window as Window & {
        fbq?: (action: string, event: string) => void;
      };
      pixelWindow.fbq?.("track", "PageView");
    }
    previousPathname.current = pathname;
  }, [pathname]);

  return <QueryClientProvider client={queryClient}><Outlet/></QueryClientProvider>;
}
