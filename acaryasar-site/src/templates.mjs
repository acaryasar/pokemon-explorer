import { site, products, demoUrl, demoHost } from './data.mjs';
import { icon } from './icons.mjs';

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const initials = site.name
  .split(' ')
  .map((w) => w[0])
  .join('');

function layout({ title, description, path, body, accent }) {
  const canonical = `${site.url}${path}`;
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#0b0d12" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/styles.css">
<script>document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<script src="/assets/main.js" defer></script>
</head>
<body${accent ? ` style="--accent:${accent};--accent-2:color-mix(in srgb, ${accent} 55%, #7c3aed)"` : ''}>
<a class="skip" href="#main">İçeriğe geç</a>
${header()}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>
`;
}

function header() {
  return `<header class="nav" data-nav>
  <div class="container nav__inner">
    <a class="brand" href="/" aria-label="${esc(site.name)} ana sayfa">
      <span class="brand__mark">${initials}</span>
      <span class="brand__name">${esc(site.name)}</span>
    </a>
    <nav class="nav__links" id="nav-links" aria-label="Ana menü">
      <a href="/#urunler">Ürünler</a>
      <a href="/#hakkimda">Hakkımda</a>
      <a href="/#teknolojiler">Teknolojiler</a>
      <a href="/#iletisim">İletişim</a>
    </nav>
    <div class="nav__actions">
      <button class="icon-btn" type="button" data-theme-toggle aria-label="Temayı değiştir">
        <span class="icon-sun">${icon('sun', 20)}</span><span class="icon-moon">${icon('moon', 20)}</span>
      </button>
      <button class="icon-btn nav__toggle" type="button" data-menu-toggle aria-controls="nav-links" aria-expanded="false" aria-label="Menüyü aç">
        <span class="icon-open">${icon('menu', 22)}</span><span class="icon-close">${icon('close', 22)}</span>
      </button>
    </div>
  </div>
</header>`;
}

function footer() {
  return `<footer class="footer">
  <div class="container footer__inner">
    <p>© ${new Date().getFullYear()} ${esc(site.name)}. Tüm hakları saklıdır.</p>
    <div class="footer__links">
      ${socialLinks()}
    </div>
  </div>
</footer>`;
}

function socialLinks() {
  const { linkedin, github, email } = site.links;
  return [
    linkedin && `<a class="icon-btn" href="${linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon('linkedin', 20)}</a>`,
    github && `<a class="icon-btn" href="${github}" target="_blank" rel="noopener" aria-label="GitHub">${icon('github', 20)}</a>`,
    email && `<a class="icon-btn" href="mailto:${email}" aria-label="E-posta">${icon('mail', 20)}</a>`,
  ]
    .filter(Boolean)
    .join('\n      ');
}

function productCard(p) {
  return `<article class="card product-card reveal" style="--accent:${p.color}">
  <div class="product-card__icon">${icon(p.icon, 26)}</div>
  <h3>${esc(p.name)}</h3>
  <p class="product-card__tagline">${esc(p.tagline)}</p>
  <p class="muted">${esc(p.summary)}</p>
  <div class="product-card__actions">
    <a class="btn btn--primary btn--sm" href="/${p.slug}">İncele ${icon('arrowRight', 16)}</a>
    <a class="btn btn--ghost btn--sm" href="${demoUrl(p)}" target="_blank" rel="noopener">Demo ${icon('external', 16)}</a>
  </div>
</article>`;
}

export function homePage() {
  const body = `
<section class="hero">
  <div class="hero__glow" aria-hidden="true"></div>
  <div class="container hero__inner">
    <p class="eyebrow reveal">${icon('code', 16)} ${esc(site.title)}</p>
    <h1 class="reveal">Merhaba, ben <span class="gradient-text">${esc(site.name)}</span>.<br>İşinizi kolaylaştıran yazılımlar geliştiriyorum.</h1>
    <p class="lead reveal">${esc(site.intro)}</p>
    <div class="hero__cta reveal">
      <a class="btn btn--primary" href="#urunler">Ürünleri keşfet ${icon('arrowRight', 18)}</a>
      <a class="btn btn--ghost" href="${site.links.linkedin}" target="_blank" rel="noopener">${icon('linkedin', 18)} LinkedIn</a>
    </div>
    <dl class="stats reveal">
      ${site.stats.map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join('\n      ')}
    </dl>
  </div>
</section>

<section class="section" id="urunler">
  <div class="container">
    <header class="section__head reveal">
      <p class="eyebrow">Ürünler</p>
      <h2>“iyi” ürün ailesi</h2>
      <p class="muted">Her biri bir sektörün gündelik iş yükünü azaltmak için tasarlanmış, bulut tabanlı ve mobil uyumlu uygulamalar.</p>
    </header>
    <div class="grid grid--products">
      ${products.map(productCard).join('\n')}
    </div>
  </div>
</section>

<section class="section section--alt" id="hakkimda">
  <div class="container about">
    <div class="about__avatar reveal" aria-hidden="true"><span>${initials}</span></div>
    <div class="reveal">
      <p class="eyebrow">Hakkımda</p>
      <h2>Fikirden canlı ürüne</h2>
      ${site.about.map((p) => `<p class="muted">${esc(p)}</p>`).join('\n      ')}
      <a class="btn btn--ghost" href="${site.links.linkedin}" target="_blank" rel="noopener">${icon('linkedin', 18)} Deneyimlerim için LinkedIn</a>
    </div>
  </div>
</section>

<section class="section" id="teknolojiler">
  <div class="container">
    <header class="section__head reveal">
      <p class="eyebrow">Teknolojiler</p>
      <h2>Çalıştığım teknolojiler</h2>
    </header>
    <div class="grid grid--tech">
      ${site.tech
        .map(
          (t) => `<div class="card tech reveal">
        <h3>${esc(t.group)}</h3>
        <ul class="chips">${t.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>

<section class="section" id="iletisim">
  <div class="container">
    <div class="cta reveal">
      <h2>Bir projeniz mi var?</h2>
      <p>Ürünlerim hakkında bilgi almak ya da birlikte çalışmak için bana ulaşın.</p>
      <div class="hero__cta">
        <a class="btn btn--light" href="${site.links.linkedin}" target="_blank" rel="noopener">${icon('linkedin', 18)} LinkedIn'den yaz</a>
        ${site.links.email ? `<a class="btn btn--outline-light" href="mailto:${site.links.email}">${icon('mail', 18)} E-posta gönder</a>` : `<a class="btn btn--outline-light" href="${site.links.github}" target="_blank" rel="noopener">${icon('github', 18)} GitHub</a>`}
      </div>
    </div>
  </div>
</section>`;

  return layout({ title: `${site.name} — ${site.title}`, description: site.description, path: '/', body });
}

export function productPage(p) {
  const others = products.filter((o) => o.slug !== p.slug);
  const body = `
<section class="hero hero--product">
  <div class="hero__glow" aria-hidden="true"></div>
  <div class="container product-hero">
    <div>
      <a class="back reveal" href="/#urunler">${icon('arrowLeft', 16)} Tüm ürünler</a>
      <div class="product-hero__badge reveal">${icon(p.icon, 28)}</div>
      <h1 class="reveal">${esc(p.name)}</h1>
      <p class="lead reveal"><strong>${esc(p.tagline)}.</strong> ${esc(p.summary)}</p>
      <div class="hero__cta reveal">
        <a class="btn btn--primary" href="${demoUrl(p)}" target="_blank" rel="noopener">Canlı demoyu aç ${icon('external', 18)}</a>
        <a class="btn btn--ghost" href="#ozellikler">Özellikler</a>
      </div>
      <p class="demo-host reveal">${icon('external', 14)} <a href="${demoUrl(p)}" target="_blank" rel="noopener">${esc(demoHost(p))}</a></p>
    </div>
    <div class="mockup reveal" aria-hidden="true">
      <div class="mockup__bar"><i></i><i></i><i></i><span>${esc(demoHost(p))}</span></div>
      <div class="mockup__body">
        <div class="mockup__side">${p.features.slice(0, 5).map((f) => `<span>${icon(f.icon, 16)}</span>`).join('')}</div>
        <div class="mockup__main">
          <div class="mockup__row"><b></b><b></b><b></b></div>
          <div class="mockup__chart">${[40, 65, 50, 80, 60, 90, 75].map((h) => `<i style="height:${h}%"></i>`).join('')}</div>
          <div class="mockup__list"><i></i><i></i><i></i></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="ozellikler">
  <div class="container">
    <header class="section__head reveal">
      <p class="eyebrow">Özellikler</p>
      <h2>${esc(p.name)} ile neler yapabilirsiniz?</h2>
      <p class="muted"><strong>Kimler için:</strong> ${esc(p.audience)}</p>
    </header>
    <div class="grid grid--features">
      ${p.features
        .map(
          (f) => `<div class="card feature reveal">
        <div class="feature__icon">${icon(f.icon, 22)}</div>
        <h3>${esc(f.title)}</h3>
        <p class="muted">${esc(f.text)}</p>
      </div>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta reveal">
      <h2>${esc(p.name)}'i hemen deneyin</h2>
      <p>Kurulum gerektirmez; demo ortamında tüm özellikleri keşfedebilirsiniz.</p>
      <div class="hero__cta">
        <a class="btn btn--light" href="${demoUrl(p)}" target="_blank" rel="noopener">Demoya git ${icon('external', 18)}</a>
        <a class="btn btn--outline-light" href="${site.links.linkedin}" target="_blank" rel="noopener">${icon('linkedin', 18)} Bilgi al</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <header class="section__head reveal"><h2>Diğer ürünler</h2></header>
    <div class="grid grid--products">
      ${others.map(productCard).join('\n')}
    </div>
  </div>
</section>`;

  return layout({
    title: `${p.name} — ${p.tagline} | ${site.name}`,
    description: `${p.name}: ${p.tagline}. ${p.summary}`,
    path: `/${p.slug}`,
    body,
    accent: p.color,
  });
}

export function notFoundPage() {
  const body = `
<section class="hero">
  <div class="container hero__inner">
    <p class="eyebrow">404</p>
    <h1>Sayfa bulunamadı</h1>
    <p class="lead">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
    <div class="hero__cta"><a class="btn btn--primary" href="/">${icon('arrowLeft', 18)} Ana sayfaya dön</a></div>
  </div>
</section>`;
  return layout({ title: `Sayfa bulunamadı | ${site.name}`, description: site.description, path: '/404', body });
}
