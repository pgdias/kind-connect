import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, useRouterState, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import appCss from "../styles.css?url";
import professionalCss from "../professional-theme.css?url";
import analyticsPremiumCss from "../analytics-premium.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { getStoredUtmParams, trackEvent } from "../lib/api";
import { trackKwaiEvent, trackKwaiPageView } from "../lib/kwai-pixel";

function NotFoundComponent(){return <div className="placeholder"><div><span>404</span><h1>Página não encontrada</h1><p>A página que você procura não existe.</p><Link className="secondary-button" to="/">Voltar para o início</Link></div></div>}
function ErrorComponent({error,reset}:{error:Error;reset:()=>void}){console.error(error);const router=useRouter();useEffect(()=>{reportLovableError(error,{boundary:"tanstack_root_error_component"});},[error]);return <div className="placeholder"><div><h1>Não foi possível carregar a página</h1><p>Algo deu errado. Tente novamente.</p><button className="secondary-button" onClick={()=>{router.invalidate();reset();}}>Tentar novamente</button></div></div>}
export const Route=createRootRouteWithContext<{queryClient:QueryClient}>()({
head:()=>({meta:[{charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{title:"Blinda Bolsa Família | Descubra o que merece atenção"},{name:"description",content:"Descubra 10 erros comuns que podem colocar seu Bolsa Família em risco e que muitas pessoas nem imaginam. Conteúdo informativo sobre cuidados com o benefício."},{name:"robots",content:"index, follow, max-image-preview:large"},{name:"keywords",content:"Bolsa Família, Cadastro Único, CadÚnico, atualização cadastral, benefício, pendência Bolsa Família, regras Bolsa Família, teste Bolsa Família"},{name:"author",content:"Blinda Bolsa Família"},{property:"og:title",content:"Blinda Bolsa Família | Você sabe se está tudo certo?"},{property:"og:description",content:"Descubra 10 erros comuns que podem colocar seu Bolsa Família em risco e merecem atenção. Conteúdo informativo."},{property:"og:type",content:"website"},{property:"og:locale",content:"pt_BR"},{property:"og:site_name",content:"Blinda Bolsa Família"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:"Blinda Bolsa Família | Teste gratuito"},{name:"twitter:description",content:"Descubra 10 erros comuns que podem colocar seu Bolsa Família em risco. Conteúdo informativo."}],links:[{rel:"stylesheet",href:appCss},{rel:"stylesheet",href:professionalCss},{rel:"stylesheet",href:analyticsPremiumCss},{rel:"icon",href:"/favicon.ico",type:"image/x-icon"},{rel:"canonical",href:"https://blinda.pgdias.com.br/"}]}),shellComponent:RootShell,component:RootComponent,notFoundComponent:NotFoundComponent,errorComponent:ErrorComponent});

function RootShell({children}:{children:ReactNode}){
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function (window, document, name) {
                window.KwaiAnalyticsObject = name;
                var kwaiq = window[name] = window[name] || [];
                kwaiq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
                kwaiq.methods.forEach(function (method) {
                  kwaiq[method] = function () {
                    var args = Array.prototype.slice.call(arguments);
                    args.unshift(method);
                    kwaiq.push(args);
                  };
                });
                kwaiq.load = function (pixelId, options) {
                  var src = "https://s21-def.ap4r.com/kos/s101/nlav112572/pixel/events.js";
                  kwaiq._i = kwaiq._i || {};
                  kwaiq._i[pixelId] = [];
                  kwaiq._i[pixelId]._u = src;
                  kwaiq._t = kwaiq._t || {};
                  kwaiq._t[pixelId] = +new Date();
                  kwaiq._o = kwaiq._o || {};
                  kwaiq._o[pixelId] = options || {};
                  var script = document.createElement("script");
                  script.type = "text/javascript";
                  script.async = true;
                  script.src = src + "?sdkid=" + pixelId + "&lib=" + name;
                  var firstScript = document.getElementsByTagName("script")[0];
                  if (firstScript && firstScript.parentNode) {
                    firstScript.parentNode.insertBefore(script, firstScript);
                  } else {
                    (document.head || document.body).appendChild(script);
                  }
                };
                kwaiq.instance = function (pixelId) {
                  var instance = (kwaiq._i && kwaiq._i[pixelId]) || [];
                  kwaiq.methods.forEach(function (method) {
                    instance[method] = function () {
                      var args = Array.prototype.slice.call(arguments);
                      args.unshift(method);
                      instance.push(args);
                    };
                  });
                  return instance;
                };
              })(window, document, "kwaiq");
              kwaiq.load("325901606065311");
              if (window.location.pathname !== "/analytics") {
                kwaiq.page();
              }
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
      if (pathname !== "/analytics") {
        trackKwaiPageView();
      }
    }
    previousPathname.current = pathname;
  }, [pathname]);

  useEffect(() => {
    let lastCheckoutClickAt = 0;

    const handleCheckoutClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      let destination: URL;
      try {
        destination = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (destination.hostname !== "pay.cakto.com.br") return;

      // Keep campaign attribution on Cakto checkout links even after quiz URLs change.
      const utmParams = getStoredUtmParams();
      for (const [key, value] of Object.entries(utmParams)) {
        if (value && !destination.searchParams.has(key)) {
          destination.searchParams.set(key, value);
        }
      }
      anchor.href = destination.toString();

      const now = Date.now();
      if (now - lastCheckoutClickAt < 800) return;
      lastCheckoutClickAt = now;

      // Button click is an intent signal; Cakto itself reports Initiated Checkout
      // after the checkout page opens and Purchase after payment confirmation.
      trackKwaiEvent("buttonClick");
      void trackEvent("checkout_click", {
        page: window.location.pathname,
        checkout_provider: "cakto",
      });
    };

    document.addEventListener("click", handleCheckoutClick, true);
    return () => document.removeEventListener("click", handleCheckoutClick, true);
  }, []);

  return <QueryClientProvider client={queryClient}><Outlet/></QueryClientProvider>;
}
