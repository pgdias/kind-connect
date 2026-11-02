const svg = String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
<defs>
  <linearGradient id="bg" x2="1" y2="1"><stop stop-color="#031b13"/><stop offset=".55" stop-color="#063c22"/><stop offset="1" stop-color="#010b0a"/></linearGradient>
  <linearGradient id="gold" x2="0" y2="1"><stop stop-color="#fff2a3"/><stop offset=".35" stop-color="#ffc928"/><stop offset="1" stop-color="#b86b00"/></linearGradient>
  <linearGradient id="silver" x2="0" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#9aa5a4"/></linearGradient>
  <linearGradient id="panel" x2="0" y2="1"><stop stop-color="#172321"/><stop offset="1" stop-color="#050b0a"/></linearGradient>
  <linearGradient id="green" x2="1" y2="1"><stop stop-color="#b8ff24"/><stop offset="1" stop-color="#00a94f"/></linearGradient>
  <filter id="glow"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="8"/><feOffset dy="8"/><feComponentTransfer><feFuncA type="linear" slope=".6"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="1200" height="800" fill="url(#bg)"/>
<path d="M0 650 310 300 480 470 760 80 930 250 1200 0" fill="none" stroke="#13c75a" stroke-opacity=".22" stroke-width="12"/>
<g opacity=".18" fill="#00d65a"><rect x="25" y="570" width="40" height="150"/><rect x="90" y="510" width="40" height="210"/><rect x="160" y="455" width="40" height="265"/><rect x="230" y="390" width="40" height="330"/></g>
<path d="M40 32H1160V768H40Z" fill="none" stroke="#a6ff37" stroke-opacity=".3" stroke-width="2"/>
<g filter="url(#shadow)">
 <text x="65" y="170" font-family="Arial,sans-serif" font-size="116" font-weight="900" letter-spacing="-5" fill="url(#silver)" stroke="#202b2a" stroke-width="5" paint-order="stroke">AUMENTE</text>
 <text x="58" y="315" font-family="Arial,sans-serif" font-size="174" font-weight="900" letter-spacing="-7" fill="url(#gold)" stroke="#603700" stroke-width="7" paint-order="stroke">SCORE</text>
</g>
<path d="M65 350H825Q850 350 850 375V438Q850 462 825 462H65Q40 462 40 438V375Q40 350 65 350Z" fill="#07110f" stroke="url(#gold)" stroke-width="6"/>
<text x="445" y="422" text-anchor="middle" font-family="Arial,sans-serif" font-size="43" font-weight="900" fill="#fff">LIMITE DE CARTÃO DE <tspan fill="#ffd43b">CRÉDITO</tspan></text>
<g filter="url(#shadow)">
 <rect x="895" y="125" width="250" height="410" rx="38" fill="#091521" stroke="#c7d4d3" stroke-width="9"/>
 <rect x="912" y="151" width="216" height="357" rx="25" fill="#071b2b"/>
 <text x="1020" y="218" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#fff">Seu Score</text>
 <path d="M950 345 A72 72 0 0 1 1090 345" fill="none" stroke="#183c36" stroke-width="20" stroke-linecap="round"/>
 <path d="M950 345 A72 72 0 0 1 1088 322" fill="none" stroke="url(#green)" stroke-width="20" stroke-linecap="round" filter="url(#glow)"/>
 <text x="1020" y="390" text-anchor="middle" font-family="Arial,sans-serif" font-size="70" font-weight="900" fill="#fff">950</text>
 <text x="1020" y="432" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="#a9ff5a">EXCELENTE*</text>
 <text x="1020" y="478" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#b7c9d1">ILUSTRATIVO</text>
</g>
<g filter="url(#shadow)" transform="rotate(-7 1020 630)">
 <rect x="865" y="555" width="300" height="180" rx="22" fill="#111a1d" stroke="url(#gold)" stroke-width="5"/>
 <rect x="895" y="600" width="58" height="44" rx="8" fill="url(#gold)"/>
 <path d="M910 600v44M932 600v44M895 622h58" stroke="#8d5c05" stroke-width="2"/>
 <path d="M990 620q35 28 0 56m18-68q48 40 0 80" fill="none" stroke="#e5e5e5" stroke-width="6" stroke-linecap="round"/>
 <text x="1010" y="710" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#d6d6d6">CARTÃO ILUSTRATIVO</text>
</g>
<g filter="url(#shadow)">
 <rect x="55" y="510" width="760" height="95" rx="20" fill="#9b0909" stroke="url(#gold)" stroke-width="6"/>
 <text x="435" y="574" text-anchor="middle" font-family="Arial,sans-serif" font-size="58" font-weight="900" fill="#ffe45b">BÔNUS EXCLUSIVO</text>
 <rect x="55" y="625" width="760" height="120" rx="18" fill="url(#panel)" stroke="url(#gold)" stroke-width="5"/>
 <text x="435" y="674" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" font-weight="700" fill="#fff">Descubra instituições que analisam</text>
 <text x="435" y="718" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" font-weight="700" fill="#ffd43b">pedidos de quem está negativado.</text>
</g>
<text x="60" y="780" font-family="Arial,sans-serif" font-size="14" fill="#b6c9bd">*Pontuação exibida apenas como ilustração. Aprovação de crédito depende da análise de cada instituição.</text>
</svg>`;
const aumentaScoreCapa = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
export default aumentaScoreCapa;
