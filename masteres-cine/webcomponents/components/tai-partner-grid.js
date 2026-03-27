const partnerTemplate = document.createElement('template');
partnerTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .partner-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: var(--space-lg, 1.5rem);
      max-inline-size: var(--content-width, 1080px);
      margin-inline: auto;
      align-items: center;
    }

    .partner-grid img {
      display: block;
      object-fit: contain;
      width: 100%;
      height: auto;
      max-height: 60px;
    }

    :host([theme="light"]) .partner-grid img {
      filter: invert(1);
    }

    :host([theme="dark"]) .partner-grid img {
      filter: none;
    }
  </style>

  <div class="partner-grid" id="grid"></div>
`;

class TaiPartnerGrid extends HTMLElement {
  static get observedAttributes() {
    return ['partners', 'theme'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(partnerTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const grid = this.shadowRoot.getElementById('grid');
    if (!grid) return;

    let partners = [];
    try {
      partners = JSON.parse(this.getAttribute('partners') || '[]');
    } catch (e) {
      console.warn('tai-partner-grid: invalid partners JSON');
      return;
    }

    grid.innerHTML = partners.map(p => `
      <picture>
        <img
          src="${p.src}"
          alt="${p.alt}"
          loading="lazy"
          decoding="async"
          width="300"
          height="auto"
        />
      </picture>
    `).join('');
  }
}

customElements.define('tai-partner-grid', TaiPartnerGrid);