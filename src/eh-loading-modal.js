// This file is part of EH-WebComponents, Copyright (C) Todd D. Esposito 2021.
// Distributed under the MIT License (see https://opensource.org/licenses/MIT).

window.customElements.define('eh-loading-modal',
  class EhLoadingModal extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })

      const visible = this.hasAttribute('visible') ? "visible" : ""
      this.shadowRoot.innerHTML = `<!-- ##HTML -->
        <style>
          .wrapper {
            background-color: rgb(var(--mask-background-color, 187 187 187));
            height: 100%;
            left: 0;
            opacity: 0;
            position: fixed;
            top: 0;
            visibility: hidden;
            width: 100%;
            z-index: 1;
          }
          .visible {
            opacity: var(--mask-opacity, 97%);
            visibility: visible;
            transition: visibility 0s linear 0s, opacity var(--transition-duration, .25s) 0s;
          }
          .content {
            font-size: var(--content-font-size, 2.5rem);
            height: 100%;
            margin: var(--content-margin, 20px 2px);
            padding: var(--content-padding, 2px 16px);
            position: relative;
            text-align: var(--content-text-align, center);
            top: var(--content-top, 30%);
            vertical-align: var(--content-vertical-align, middle);
          }
        </style>
        <div class="wrapper ${visible}">
          <div class='content'>
            <slot>
              Loading...
            </slot>
          </div>
        </div>
      <!-- ##/HTML -->`

      this.wrapper = this.shadowRoot.querySelector(".wrapper")
    }

    connectedCallback() {
    }

    get visible() {
      return this.hasAttribute("visible")
    }
    set visible(v) {
      if (v) {
        this.setAttribute("visible", "")
      } else {
        this.removeAttribute("visible")
      }
    }

    static get observedAttributes() {
      return ["visible"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
      case 'visible':
        if (newValue === null) {
          this.wrapper.classList.remove("visible")
        } else {
          this.wrapper.classList.add("visible")
        }
        break
      }
    }

    show() { this.setAttribute("visible", "") }
    hide() { this.removeAttribute("visible") }
  }
)
