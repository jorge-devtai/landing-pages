const ctaTemplate = document.createElement('template');
ctaTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      padding-block: var(--section-padding, clamp(2rem, 1.1429rem + 4.2857vw, 5rem));
    }

    :host([theme="red"]) {
      background-color: var(--color-primary, #d12216);
      color: var(--color-light, #fff);
    }

    :host([theme="dark"]) {
      background-color: var(--color-dark, #000);
      color: var(--color-light, #fff);
    }

    :host([theme="light"]) {
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
      padding-inline: clamp(var(--space-xs, 0.5rem), 0.071rem + 2.14vw, var(--space-xl, 2rem));
      padding-block: var(--space-3xl, 1.5rem);
      display: flex;
      flex-direction: column;
      gap: var(--space-md, 1rem);
      text-align: center;
      align-items: center;
    }

    h2 {
      font-size: var(--text-lg, clamp(1.75rem, 1.1818rem + 2.8409vw, 3rem));
      font-weight: 400;
      line-height: 1.2;
      text-wrap: balance;
    }

    p {
      font-size: var(--text-xs, 1rem);
      font-weight: 400;
      text-wrap: pretty;
      line-height: 1.3;
    }

    .btn {
      display: inline-block;
      font-family: var(--font-family, Arial, Helvetica, sans-serif);
      font-size: var(--text-xs, 1rem);
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
  </style>

  <section class="container">
    <h2 id="cta-heading"></h2>
    <p id="cta-desc"></p>
    <span>
      <a id="cta-link" class="btn btn--white"></a>
    </span>
  </section>
`;

class TaiCtaBlock extends HTMLElement {
  static get observedAttributes() {
    return ['theme', 'heading', 'description', 'cta-text', 'cta-href'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(ctaTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const sr = this.shadowRoot;

    const heading = sr.getElementById('cta-heading');
    if (heading) heading.textContent = this.getAttribute('heading') || '';

    const desc = sr.getElementById('cta-desc');
    if (desc) desc.textContent = this.getAttribute('description') || '';

    const link = sr.getElementById('cta-link');
    if (link) {
      link.href = this.getAttribute('cta-href') || '#';
      link.textContent = this.getAttribute('cta-text') || '';
    }
  }
}

customElements.define('tai-cta-block', TaiCtaBlock);