// This file is part of EH-WebComponents, Copyright (C) Todd D. Esposito 2021.
// Distributed under the MIT License (see https://opensource.org/licenses/MIT).

window.customElements.define('eh-confirm-modal',
  class EhConfirmModal extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" })

      const visible = this.getAttribute('visible') || ""

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
          button.confirm {
            background-color: rgba(var(--confirm-background-color, var(--button-background-color, 27 149 9)) / 95%);
          }
          button.cancel {
            background-color: rgba(var(--cancel-background-color, var(--button-background-color, 27 149 9)) / 95%);
          }
          button:hover {
            transform: var(--button_hover-transform, scale3d(1.02, 1.02, 1));
          }
          button.confirm:hover {
            background-color: rgba(var(--confirm-background-color, var(--button-background-color, 27 149 9)) / 100%);
          }
          button.cancel:hover {
            background-color: rgba(var(--cancel-background-color, var(--button-background-color, 27 149 9)) / 1005%);
          }
        </style>
        <div class="wrapper ${visible}">
          <div class='modal'>
            <div class='title'><slot name="title">Confirm</slot></div>
            <div class='content'>
              <slot>Are You Sure You Want To Continue?</slot>
            </div>
            <div class='button-container'>
              <button class='confirm'><slot name="confirm-text">Confirm</slot></button>
              <button class='cancel'><slot name="cancel-text">Cancel</slot></button>
            </div>
          </div>
        </div>
      <!-- ##/HTML -->`

      this.wrapper = this.shadowRoot.querySelector(".wrapper")
      this.confirmButton = this.shadowRoot.querySelector(".confirm")
      this.cancelButton = this.shadowRoot.querySelector(".cancel")

      this.onConfirm = this.onConfirm.bind(this)
      this.onCancel = this.onCancel.bind(this)
    }

    onConfirm() {
      this.removeAttribute("visible")
      if (this.getAttribute("onConfirm")) {
        let fn
        try {
          fn = Function(this.getAttribute("onConfirm"))
          fn()
        } catch (error) {
          console.error("eh-confirm-modal: can't execute the 'onConfirm' routine.")
        }
      }
      this.dispatchEvent(new CustomEvent("confirm"))
    }

    onCancel() {
      this.removeAttribute("visible")
      this.dispatchEvent(new CustomEvent("cancel"))
    }

    connectedCallback() {
      this.confirmButton.addEventListener("click", this.onConfirm)
      this.cancelButton.addEventListener("click", this.onCancel)
    }

    disconnectedCallback() {
      this.confirmButton.removeEventListener("click", this.onConfirm)
      this.cancelButton.removeEventListener("click", this.onCancel)
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
