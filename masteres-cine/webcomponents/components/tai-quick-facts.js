const ICONS = {
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><mask id="m1" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16"><rect width="16" height="16" fill="#D9D9D9"/></mask><g mask="url(#m1)"><path d="M3.539 14.333c-.337 0-.622-.116-.855-.35-.234-.233-.35-.518-.35-.855V4.205c0-.337.116-.622.35-.855.233-.233.518-.35.855-.35h.923V1.59h1.025V3h5.052V1.59h1v1.41h.923c.337 0 .622.117.855.35.234.234.35.519.35.855v8.923c0 .337-.116.622-.35.855-.233.234-.518.35-.855.35H3.539Zm0-1h8.923c.051 0 .098-.022.141-.064.043-.043.064-.09.064-.141V6.872H3.334v6.256c0 .051.021.098.064.141.043.043.09.064.141.064Zm-.205-7.461h9.333V4.205c0-.051-.021-.098-.064-.141-.043-.043-.09-.064-.141-.064H3.539c-.051 0-.098.021-.141.064-.043.043-.064.09-.064.141v1.667Z" fill="white"/></g></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9.315 10.018l.703-.703L7.5 6.797V3.667h-1v3.536l2.815 2.815ZM7.001 13.333c-.876 0-1.699-.166-2.47-.498-.77-.333-1.441-.784-2.011-1.354-.57-.57-1.021-1.24-1.354-2.011-.332-.77-.499-1.594-.499-2.469 0-.876.166-1.7.499-2.47.332-.771.784-1.441 1.354-2.011.57-.57 1.24-1.022 2.01-1.354.771-.333 1.594-.5 2.47-.5.876 0 1.699.167 2.47.499.77.333 1.441.784 2.011 1.354.57.57 1.021 1.24 1.354 2.011.333.77.499 1.594.499 2.469 0 .876-.166 1.7-.499 2.47-.332.771-.784 1.441-1.354 2.011-.57.57-1.24 1.022-2.01 1.354-.771.333-1.594.5-2.47.5ZM7 12.333c1.478 0 2.736-.52 3.775-1.558C11.814 9.736 12.333 8.478 12.333 7c0-1.478-.52-2.736-1.558-3.775C9.736 2.186 8.478 1.667 7 1.667c-1.478 0-2.736.52-3.775 1.558C2.186 4.264 1.667 5.522 1.667 7c0 1.478.52 2.736 1.558 3.775C4.264 11.814 5.522 12.333 7 12.333Z" fill="white"/></svg>`,
  degree: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none"><path d="M7 11.231 2.667 8.877V5.261L.359 4 7 .385l6.641 3.615v4.795h-1V4.554L11.333 5.26v3.616L7 11.231ZM7 6.467l4.56-2.467L7 1.533 2.44 4 7 6.467Zm0 3.625 3.333-1.8V5.795L7 7.614 3.667 5.795v2.497L7 10.092Z" fill="white"/></svg>`,
  location: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><mask id="m2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16"><rect width="16" height="16" fill="#D9D9D9"/></mask><g mask="url(#m2)"><path d="M8 14.333c-1.127 0-2.047-.161-2.762-.485-.714-.323-1.071-.741-1.071-1.252 0-.237.089-.46.267-.668.178-.208.425-.388.74-.537l.786.714c-.143.057-.293.129-.45.214-.157.086-.265.176-.323.27.11.2.438.373.984.522.546.148 1.155.222 1.826.222.671 0 1.283-.074 1.834-.222.551-.148.882-.322.992-.522-.056-.102-.17-.192-.342-.276-.171-.086-.334-.157-.487-.214l.776-.724c.341.156.604.339.788.548.184.208.276.433.276.675 0 .512-.357.93-1.072 1.253-.714.324-1.635.485-2.761.485Zm.017-3.25c1.104-.837 1.933-1.666 2.487-2.487.553-.82.83-1.636.83-2.445 0-1.15-.36-2.019-1.08-2.605-.72-.587-1.47-.88-2.25-.88-.78 0-1.531.293-2.253.88-.722.587-1.083 1.455-1.083 2.607 0 .756.273 1.54.82 2.352.546.812 1.39 1.672 2.53 2.578Zm-.016 1.25c-1.455-1.088-2.541-2.144-3.258-3.169C3.986 8.14 3.667 7.135 3.667 6.152c0-.742.131-1.393.393-1.951.262-.558.6-1.026 1.015-1.402.414-.377.88-.66 1.395-.85.516-.19 1.026-.283 1.531-.283.506 0 1.015.094 1.53.283.515.19.98.473 1.395.85.414.377.753.845 1.015 1.403.262.558.393 1.208.393 1.95 0 .983-.359 1.987-1.076 3.013-.717 1.025-1.803 2.081-3.258 3.169Zm.002-5.07c.33 0 .613-.117.849-.35.235-.234.353-.518.353-.852 0-.335-.118-.62-.354-.855-.236-.236-.52-.354-.851-.354-.328 0-.611.118-.849.354-.236.236-.355.52-.355.852 0 .336.119.621.355.855.237.233.52.35.852.35Z" fill="white"/></g></svg>`
};

const qfTemplate = document.createElement('template');
qfTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .facts {
      display: flex;
      gap: var(--space-md, 1rem);
      flex-wrap: wrap;
    }

    @media (max-width: 600px) {
      .facts {
        flex-direction: column;
      }
    }

    .fact {
      display: flex;
      align-items: center;
      gap: var(--space-xs, 0.5rem);
    }

    .fact-icon {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .fact-text {
      font-size: var(--text-xxs, 0.75rem);
      font-weight: 400;
      font-family: var(--font-family, Arial, Helvetica, sans-serif);
      white-space: nowrap;
    }
  </style>

  <div class="facts" id="facts-container"></div>
`;

class TaiQuickFacts extends HTMLElement {
  static get observedAttributes() {
    return ['items'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(qfTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const container = this.shadowRoot.getElementById('facts-container');
    if (!container) return;

    let items = [];
    try {
      items = JSON.parse(this.getAttribute('items') || '[]');
    } catch (e) {
      console.warn('tai-quick-facts: invalid items JSON');
      return;
    }

    container.innerHTML = items.map(item => `
      <span class="fact">
        <span class="fact-icon">${ICONS[item.icon] || ''}</span>
        <span class="fact-text">${item.text}</span>
      </span>
    `).join('');
  }
}

customElements.define('tai-quick-facts', TaiQuickFacts);