const sectionTemplate = document.createElement('template');
sectionTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      padding-block: var(--section-padding, clamp(2rem, 1.1429rem + 4.2857vw, 5rem));
    }

    :host([theme="dark"]) {
      background-color: var(--color-dark, #000);
      color: var(--color-light, #fff);
    }

    :host([theme="light"]) {
      background-color: var(--color-light, #fff);
      color: var(--color-dark, #000);
    }

    :host([theme="red"]) {
      background-color: var(--color-primary, #d12216);
      color: var(--color-light, #fff);
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
      padding-inline: var(--gutter-h, 1rem);
      padding-block: var(--space-2xl, 4rem);
    }

    @media (min-width: 768px) {
      .container {
        padding-inline: calc(var(--gutter-h, 1rem) * 2);
      }
    }

    @media (min-width: 1024px) {
      .container {
        padding-inline: calc(var(--gutter-h, 1rem) * 4);
      }
    }

    /* Two-column layout */
    .grid-two-col {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-md, 1rem);
    }

    @media (min-width: 1024px) {
      .grid-two-col {
        grid-template-columns: 1fr 1fr;
      }
    }

    .column {
      display: flex;
      flex-direction: column;
      gap: var(--space-md, 1rem);
    }

    /* Full layout (header + body stacked) */
    .layout-full {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg, 1.5rem);
    }

    .header-slot,
    .body-slot {
      display: flex;
      flex-direction: column;
      gap: var(--space-md, 1rem);
    }

    /* Slotted content inherits gap */
    ::slotted(div) {
      display: flex;
      flex-direction: column;
      gap: var(--space-md, 1rem);
    }
  </style>

  <div class="container" id="root"></div>
`;

class TaiSection extends HTMLElement {
  static get observedAttributes() {
    return ['theme', 'layout'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(sectionTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this._buildLayout();
  }

  attributeChangedCallback() {
    this._buildLayout();
  }

  _buildLayout() {
    const root = this.shadowRoot.getElementById('root');
    if (!root) return;

    const layout = this.getAttribute('layout');

    root.innerHTML = '';

    if (layout === 'full') {
      root.classList.remove('grid-two-col');
      root.classList.add('layout-full');
      root.innerHTML = `
        <div class="header-slot"><slot name="header"></slot></div>
        <div class="body-slot"><slot name="body"></slot></div>
      `;
    } else {
      root.classList.remove('layout-full');
      root.classList.add('grid-two-col');
      root.innerHTML = `
        <div class="column"><slot name="left"></slot></div>
        <div class="column"><slot name="right"></slot></div>
      `;
    }
  }
}

customElements.define('tai-section', TaiSection);