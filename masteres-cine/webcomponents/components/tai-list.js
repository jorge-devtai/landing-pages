const listTemplate = document.createElement('template');
listTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    ::slotted(li) {
      position: relative;
      padding-inline-start: 1.5rem;
      font-size: var(--text-xs, 1rem);
      font-weight: 400;
      text-wrap: pretty;
      list-style: none;
    }
  </style>

  <ul class="list" role="list">
    <slot></slot>
  </ul>
`;

class TaiList extends HTMLElement {
  static get observedAttributes() {
    return ['theme'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(listTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this._applyBullets();
    this._observeSlot();
  }

  attributeChangedCallback() {
    this._applyBullets();
  }

  _observeSlot() {
    const slot = this.shadowRoot.querySelector('slot');
    if (slot) {
      slot.addEventListener('slotchange', () => this._applyBullets());
    }
  }

  _applyBullets() {
    const theme = this.getAttribute('theme') || 'dark';
    const fillColor = theme === 'light' ? 'white' : 'black';

    const starSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15 15' preserveAspectRatio='xMidYMin meet'%3E%3Cpath d='M6.7 6.4c-.04-.74-.19-1.48-.45-2.21-.37-1.05-.55-1.78-.55-2.18 0-.56.13-.98.39-1.27.27-.29.6-.44.98-.44.33 0 .62.15.87.44.25.29.37.7.37 1.24 0 .48-.15 1.16-.44 2.03-.28.86-.45 1.65-.52 2.38.59-.38 1.12-.83 1.6-1.37.73-.85 1.27-1.38 1.63-1.58.35-.2.71-.31 1.08-.31s.65.12.89.37c.25.24.37.52.37.85 0 .4-.18.75-.53 1.06-.35.31-1.24.62-2.66.93-.83.18-1.51.39-2.06.63.56.29 1.24.51 2.05.66 1.3.24 2.15.53 2.55.89.41.35.61.74.61 1.16 0 .32-.12.6-.37.84-.24.24-.52.35-.84.35s-.68-.11-1.08-.34c-.39-.23-.91-.73-1.58-1.51-.44-.53-.99-1.02-1.64-1.48.02.61.15 1.28.37 2 .39 1.27.58 2.13.58 2.59 0 .43-.13.79-.39 1.1-.26.29-.53.44-.82.44-.4 0-.76-.16-1.08-.47-.23-.23-.34-.59-.34-1.08s.12-1.13.37-1.85c.25-.73.4-1.23.47-1.5.06-.28.12-.69.18-1.22-.63.42-1.19.89-1.66 1.4-.78.88-1.38 1.44-1.77 1.68-.28.17-.57.26-.87.26-.37 0-.68-.12-.93-.37s-.39-.52-.39-.82c0-.27.11-.55.32-.84.23-.3.56-.55 1-.74.29-.13.95-.3 1.98-.52.67-.14 1.32-.34 1.95-.61-.58-.29-1.27-.52-2.08-.68-1.32-.28-2.14-.53-2.45-.76-.48-.35-.73-.78-.73-1.29 0-.29.12-.55.35-.79.25-.25.53-.37.85-.37.35 0 .73.11 1.13.34.4.23.89.68 1.48 1.37.59.68 1.19 1.2 1.8 1.58Z' fill='${fillColor}'/%3E%3C/svg%3E")`;

    const items = this.querySelectorAll('li');
    items.forEach(li => {
      li.style.position = 'relative';
      li.style.paddingInlineStart = '1.5rem';
      li.style.listStyle = 'none';
      li.style.backgroundImage = starSvg;
      li.style.backgroundRepeat = 'no-repeat';
      li.style.backgroundPosition = 'left 0.3rem';
      li.style.backgroundSize = '1rem 1rem';
    });
  }
}

customElements.define('tai-list', TaiList);