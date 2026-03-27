const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      background-color: var(--color-light, #fff);
      color: var(--color-dark, #000);
    }

    *,
    *::before,
    *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .container {
      max-inline-size: var(--content-width, 1080px);
      margin-inline: auto;
      padding-block: var(--space-2xl, 3rem);
      padding-inline: clamp(var(--space-xs, 0.5rem), 0.071rem + 2.14vw, var(--space-xl, 2rem));
      display: flex;
      flex-direction: column;
      gap: var(--space-md, 1rem);
      text-align: center;
      align-items: center;
    }

    figure {
      margin: 0;
    }

    figure img {
      display: block;
      width: 200px;
      height: 80px;
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm, 0.75rem);
    }

    p {
      font-size: var(--text-xs, 1rem);
      font-weight: 400;
      text-wrap: pretty;
      line-height: 1.3;
      max-inline-size: 65ch;
    }

    nav {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    a {
      font-size: var(--text-xs, 1rem);
      font-weight: 400;
      color: inherit;
      text-decoration: none;
      transition: var(--transition-base, all 0.3s ease);
    }

    a:hover {
      color: var(--color-primary, #d12216);
      text-decoration: underline;
    }

    .separator {
      font-size: var(--text-xs, 1rem);
    }
  </style>

  <footer>
    <div class="container">
      <figure>
        <img id="footer-logo" loading="lazy" alt="Logo TAI" />
      </figure>
      <div class="info">
        <p id="footer-copyright"></p>
        <nav id="footer-nav"></nav>
      </div>
    </div>
  </footer>
`;

class TaiFooter extends HTMLElement {
  static get observedAttributes() {
    return ['logo-src', 'copyright', 'links'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const sr = this.shadowRoot;

    const logo = sr.getElementById('footer-logo');
    if (logo) logo.src = this.getAttribute('logo-src') || '';

    const copyright = sr.getElementById('footer-copyright');
    if (copyright) copyright.textContent = this.getAttribute('copyright') || '';

    const nav = sr.getElementById('footer-nav');
    if (!nav) return;

    let links = [];
    try {
      links = JSON.parse(this.getAttribute('links') || '[]');
    } catch (e) {
      console.warn('tai-footer: invalid links JSON');
      return;
    }

    nav.innerHTML = links.map((link, i) => {
      const rel = link.rel ? `rel="${link.rel}"` : '';
      const cls = link.class ? `class="${link.class}"` : '';
      const separator = i < links.length - 1
        ? `<span class="separator">|</span>`
        : '';
      return `<a href="${link.href}" ${rel} ${cls}>${link.text}</a>${separator}`;
    }).join('');
  }
}

customElements.define('tai-footer', TaiFooter);