const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      height: 100%;
    }

    *,
    *::before,
    *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .card {
      background-color: var(--color-dark, #000);
      color: var(--color-light, #fff);
      padding: clamp(var(--space-sm, 0.75rem), 0.271rem + 1.14vw, 1.3rem);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-lg, 1.5rem);
      min-block-size: 10rem;
      height: 100%;
      outline: 2px solid var(--color-primary, #d12216);
      outline-offset: -1px;
      transition: var(--transition-base, all 0.3s ease);
    }

    .card:hover {
      background-color: var(--color-primary, #d12216);
    }

    .card__content {
      display: flex;
      flex-direction: column;
      gap: var(--space-md, 1rem);
      min-inline-size: 0;
      width: 100%;
    }

    figure {
      display: flex;            /* flex container como el original */
      max-inline-size: 100%;    /* no excede al padre */
      margin: 0;
      padding: 0;
      position: relative;
    }

    figure img {
      flex: 1;                 
      min-inline-size: 100%;   
      object-fit: cover;       
      aspect-ratio: 1 / 1; 
    }

    h4 {
      font-size: var(--text-sm, clamp(1.25rem, 1.1364rem + 0.5682vw, 1.5rem));
      font-weight: 400;
      line-height: 1.2;
    }

    p {
      font-size: var(--text-xs, 1rem);
      font-weight: 400;
    }

    .card__action {
      display: block;
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
      background-color: var(--color-primary, #d12216);
      color: var(--color-light, #fff);
      cursor: pointer;
    }

    .btn:hover {
      background-color: var(--color-light, #fff);
      color: var(--color-dark, #000);
      scale: 1.05;
    }

    .card:hover .btn {
      background-color: var(--color-dark, #000);
      color: var(--color-light, #fff);
    }
  </style>

  <div class="card">
    <div class="card__content">
      <figure>
        <img id="card-img" loading="lazy" />
      </figure>
      <h4 id="card-heading"></h4>
      <p id="card-desc"></p>
    </div>
    <span class="card__action">
      <a id="card-cta" class="btn"></a>
    </span>
  </div>
`;

class TaiCard extends HTMLElement {
  static get observedAttributes() {
    return ['image', 'alt', 'heading', 'description', 'cta-text', 'cta-href'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const sr = this.shadowRoot;

    const img = sr.getElementById('card-img');
    if (img) {
      img.src = this.getAttribute('image') || '';
      img.alt = this.getAttribute('alt') || '';
    }

    const heading = sr.getElementById('card-heading');
    if (heading) heading.textContent = this.getAttribute('heading') || '';

    const desc = sr.getElementById('card-desc');
    if (desc) desc.textContent = this.getAttribute('description') || '';

    const cta = sr.getElementById('card-cta');
    if (cta) {
      cta.href = this.getAttribute('cta-href') || '#';
      cta.textContent = this.getAttribute('cta-text') || '';
    }
  }
}

customElements.define('tai-card', TaiCard);