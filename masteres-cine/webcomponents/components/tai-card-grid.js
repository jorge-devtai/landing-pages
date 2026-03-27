const gridTemplate = document.createElement('template');
gridTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-md, 1rem);
      max-inline-size: var(--content-width, 1080px);
      margin-inline: auto;
     /*  padding-inline: var(--gutter-h, 1rem); */
    }

    @media (min-width: 768px) {
      .cards {
        padding-inline: calc(var(--gutter-h, 1rem) * 2);
      }
    }

    @media (min-width: 1024px) {
      .cards {
       /*  padding-inline: calc(var(--gutter-h, 1rem) * 4); */
      }
    }
  </style>

  <div class="cards">
    <slot></slot>
  </div>
`;

class TaiCardGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(gridTemplate.content.cloneNode(true));
  }
}

customElements.define('tai-card-grid', TaiCardGrid);