const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }

    *,
    *::before,
    *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Background image layer */
    .media-hero {
      position: absolute;
      z-index: 0;
      inset: 0;
      inline-size: 100%;
      block-size: 100%;
    }

    .media-hero::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.2) 20%,
        rgba(0, 0, 0, 0.3)
      );
    }

    .media-hero figure {
      display: flex;
      width: 100%;
      height: 100%;
      margin: 0;
    }

    .media-hero img {
      flex: 1;
      min-inline-size: 100%;
      object-fit: cover;
      display: block;
    }

    /* Navbar */
    .navbar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-lg, 1.5rem);
    }

    .navbar .logo-link {
      inline-size: clamp(9.375rem, 8.033rem + 6.71vw, 14.375rem);
      filter: invert(1);
      display: block;
    }

    .navbar .logo-link img {
      display: block;
      width: 100%;
      height: auto;
    }

    .btn {
      display: inline-block;
      font-family: var(--font-family, Arial, Helvetica, sans-serif);
      font-size: var(--text-xxs, 0.75rem);
      letter-spacing: 1px;
      border-radius: var(--border-radius-pill, 40px);
      text-align: center;
      padding: 10px 20px;
      text-decoration: none;
      text-transform: uppercase;
      transition: var(--transition-base, all 0.3s ease);
      cursor: pointer;
    }

    .btn--white {
      background-color: var(--color-light, #fff);
      color: var(--color-dark, #000);
    }

    .btn--white:hover {
      background-color: var(--color-dark, #000);
      color: var(--color-light, #fff);
      scale: 1.05;
    }

    .btn--red {
      background-color: var(--color-primary, #d12216);
      color: var(--color-light, #fff);
    }

    .btn--red:hover {
      background-color: var(--color-light, #fff);
      color: var(--color-dark, #000);
      scale: 1.05;
    }

    /* Hero content */
    .hero-wrapper {
      position: relative;
      z-index: 5;
      display: grid;
      place-content: center;
      width: 100%;
      height: 100%;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: var(--space-xs, 0.5rem);
      color: var(--color-light, #fff);
      padding: var(--space-lg, 1.5rem);
    }

    .hero-content h1 {
      font-size: var(--text-xl, clamp(2.5rem, 1.8182rem + 3.4091vw, 4rem));
      font-weight: 400;
      line-height: 1.2;
      text-align: center;
      text-wrap: balance;
      max-inline-size: 30ch;
    }

    .hero-content p {
      font-size: var(--text-xs, 1rem);
      font-weight: 400;
      text-align: center;
      text-wrap: pretty;
    }

    .hero-content .cta {
      margin-block-start: var(--space-xl, 2rem);
    }
  </style>

  <div class="media-hero">
    <figure>
      <img id="hero-img" loading="lazy" fetchpriority="high" alt="imagen de cabecera" />
    </figure>
  </div>

  <nav class="navbar" role="navigation">
    <a id="logo-link" class="logo-link" aria-label="Regresar a la página principal">
      <img id="logo-img" alt="Logotipo de TAI" />
    </a>
    <div>
      <a id="nav-cta" class="btn btn--white"></a>
    </div>
  </nav>

  <div class="hero-wrapper">
    <div class="hero-content">
      <h1 id="heading"></h1>
      <p id="subheading"></p>
      <a id="main-cta" class="btn btn--red cta" target="_blank" rel="nofollow"></a>
    </div>
  </div>
`;

class TaiHero extends HTMLElement {
  static get observedAttributes() {
    return [
      'image', 'heading', 'subheading',
      'cta-text', 'cta-href',
      'logo-src', 'logo-href',
      'nav-cta-text', 'nav-cta-href'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const sr = this.shadowRoot;

    const heroImg = sr.getElementById('hero-img');
    if (heroImg) heroImg.src = this.getAttribute('image') || '';

    const logoLink = sr.getElementById('logo-link');
    if (logoLink) logoLink.href = this.getAttribute('logo-href') || '#';

    const logoImg = sr.getElementById('logo-img');
    if (logoImg) logoImg.src = this.getAttribute('logo-src') || '';

    const navCta = sr.getElementById('nav-cta');
    if (navCta) {
      navCta.href = this.getAttribute('nav-cta-href') || '#';
      navCta.textContent = this.getAttribute('nav-cta-text') || '';
    }

    const heading = sr.getElementById('heading');
    if (heading) heading.textContent = this.getAttribute('heading') || '';

    const subheading = sr.getElementById('subheading');
    if (subheading) subheading.textContent = this.getAttribute('subheading') || '';

    const mainCta = sr.getElementById('main-cta');
    if (mainCta) {
      mainCta.href = this.getAttribute('cta-href') || '#';
      mainCta.textContent = this.getAttribute('cta-text') || '';
    }
  }
}

customElements.define('tai-hero', TaiHero);