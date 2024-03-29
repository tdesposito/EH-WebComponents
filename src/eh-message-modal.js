// This file is part of EH-WebComponents, Copyright (C) Todd D. Esposito 2021.
// Distributed under the MIT License (see https://opensource.org/licenses/MIT).

window.customElements.define('eh-message-modal',
  class EhMessageModal extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })

      const visible = this.getAttribute('visible') || ""
      const title = this.getAttribute('title') || "Message"

      this.shadowRoot.innerHTML = `<!-- ##HTML -->
        <style>
          .wrapper {
            background-color: rgb(var(--mask-background-color, 198 187 187));
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
          .modal {
            background-color: rgb(var(--box-background-color, 254 254 254));
            border-radius: var(--box-border-radius, 10px);
            border: var(--box-border, 1px solid rgba(var(--box-background-color, 254 254 254) / 10%));
            box-shadow: 0 4px 8px 0 rgba(0 0 0 / 20%), 0 6px 20px 0 rgba(0 0 0 / 19%);
            left: var(--box-left, 15%);
            min-width: var(--box-width, 70%);
            padding: var(--box-padding, 12px);
            position: relative;
            text-align: var(--box-text-align, center);
            top: var(--box-top, 20%);
            width: var(--box-width, 70%);
            z-index: 10;
          }
          .title {
            background-color: rgb(var(--title-background-color, 86 120 229));
            border-radius: var(--title-border-radius, 6px);
            border: var(--title-border, 1px solid rgba(var(--title-background-color, 86 120 229) / 50%));
            color: rgb(var(--title-color, 255 255 255));
            font-size: var(--title-font-size, 1.5rem);
            padding: var(--title-padding, 2px 16px);
          }
          .content {
            margin: var(--content-margin, 20px 2px);
            padding: var(--content-padding, 2px 16px);
          }
          .button-container {
            text-align: center;
          }
          button {
            background-color: rgba(var(--button-background-color, 27 149 9) / 95%);
            border-radius: var(--button-border-radius, 6px);
            border: var(--button-border, 1px solid rgba(var(--button-background-color, 27 149 9) / 50%));
            color: rgb(var(--button-color, 255 255 255));
            cursor: pointer;
            font-size: var(--button-font-size, 1.1rem);
            line-height: var(--button-line-height, 16px);
            margin: var(--button-margin, 6px);
            min-width: var(--button-min-width, 10rem);
            padding: var(--button-padding, 17px 34px);
            transition: opacity var(--button-transition-duration, var(--transition-duration, .25s)) 0s;
          }
          button:hover {
            transform: var(--button_hover-transform, scale3d(1.02, 1.02, 1));
            background-color: rgba(var(--button-background-color, 27 149 9) / 100%);
            box-shadow: inset 0px 3px 12px rgba(var(--button-background-color, 27 149 9) / 20%);
          }
        </style>
        <div class="wrapper ${visible}">
          <div class='modal'>
            <div class='title'>${title}</div>
            <div class='content'>
              <slot>Important Message</slot>
            </div>
            <div class='button-container'>
              <button class='close'><slot name="button-text">Ok</slot></button>
            </div>
          </div>
        </div>
      <!-- ##/HTML -->`

      this.closeButton = this.shadowRoot.querySelector(".close")
      this.wrapper = this.shadowRoot.querySelector(".wrapper")

      this.onCloseClick = this.onCloseClick.bind(this)
    }

    onCloseClick() {
      this.removeAttribute("visible")
      this.dispatchEvent(new CustomEvent("close"))
    }

    connectedCallback() {
      this.closeButton.addEventListener("click", this.onCloseClick)
    }

    disconnectedCallback() {
      this.closeButton.removeEventListener("click", this.onCloseClick)
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
      }
    }

    show() { this.setAttribute("visible", "") }
    hide() { this.removeAttribute("visible") }
  }
)
