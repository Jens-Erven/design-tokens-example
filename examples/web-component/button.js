import '../../dist/figma-variables/css/tokens.css';
class CustomButton extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
        <button class="button">
          <slot></slot>
        </button>
    `;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL('./button.css', import.meta.url).href;

    shadow.appendChild(link);

    const buttonWrapper = shadow.querySelector('.button');
    buttonWrapper.addEventListener('click', this.handleClick.bind(this));
    buttonWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') this.handleClick();
    });
  }

  handleClick() {
    const event = new CustomEvent('custom-button-click', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

customElements.define('custom-button', CustomButton);
