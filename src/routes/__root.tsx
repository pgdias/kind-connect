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
head:()=>({meta:[{charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{title:"Blinda Bolsa Família | Descubra o que merece atenção"},{name:"description",content:"Teste gratuito e informativo para identificar pontos do Bolsa Família e do Cadastro Único que podem merecer conferência. Leva cerca de 2 minutos."},{name:"robots",content:"index, follow, max-image-preview:large"},{name:"keywords",content:"Bolsa Família, Cadastro Único, CadÚnico, atualização cadastral, benefício, pendência Bolsa Família, regras Bolsa Família, teste Bolsa Família"},{name:"author",content:"Blinda Bolsa Família"},{property:"og:title",content:"Blinda Bolsa Família | Você sabe se está tudo certo?"},{property:"og:description",content:"Faça um teste gratuito e descubra quais pontos relacionados ao seu Bolsa Família podem merecer atenção."},{property:"og:type",content:"website"},{property:"og:locale",content:"pt_BR"},{property:"og:site_name",content:"Blinda Bolsa Família"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:"Blinda Bolsa Família | Teste gratuito"},{name:"twitter:description",content:"Descubra quais pontos podem merecer conferência. Teste rápido e informativo."}],links:[{rel:"stylesheet",href:appCss},{rel:"stylesheet",href:professionalCss},{rel:"stylesheet",href:analyticsPremiumCss},{rel:"icon",href:"/favicon.ico",type:"image/x-icon"},{rel:"canonical",href:"https://blinda.pgdias.com.br/"}]}),shellComponent:RootShell,component:RootComponent,notFoundComponent:NotFoundComponent,errorComponent:ErrorComponent});

function RootShell({children}:{children:ReactNode}){
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.install=t():e.install=t()}("undefined"!=typeof window?window:self,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=72)}({72:function(e,t,n){"use strict";var o=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var o,r=0,i=t.length;r<i;r++)!o&&r in t||(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||[])};Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t,n){var o,i=e.createElement("script");i.type="text/javascript",i.async=!0,i.src=t,n&&(i.onerror=function(){r(e,n)});var a=e.getElementsByTagName("script")[0];null===(o=a.parentNode)||void 0===o||o.insertBefore(i,a)};!function(e,t,n){e.KwaiAnalyticsObject=n;var i=e[n]=e[n]||[];i.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];var a=function(e,t){e[t]=function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var i=o([t],n,!0);e.push(i)}};i.methods.forEach((function(e){a(i,e)})),i.instance=function(e){var t,n=(null===(t=i._i)||void 0===t?void 0:t[e])||[];return i.methods.forEach((function(e){a(n,e)})),n},i.load=function(e,o){var a="https://s21-def.ap4r.com/kos/s101/nlav112572/pixel/events.js";i._i=i._i||{},i._i[e]=[],i._i[e]._u=a,i._t=i._t||{},i._t[e]=+new Date,i._o=i._o||{},i._o[e]=o||{};var c="?sdkid=".concat(e,"&lib=").concat(n);r(t,a+c,"https://s21-def.ks-la.net/kos/s101/nlav112572/pixel/events.js"+c)}}(window,document,"kwaiq")}})}));
              kwaiq.load('325901606065311');
              if (window.location.pathname !== '/analytics') {
                kwaiq.page();
                kwaiq.instance('325901606065311').track('contentView');
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
