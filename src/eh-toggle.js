window.customElements.define('eh-toggle',
  class EhToggle extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({mode: 'open'})

      this.onClick = this.onClick.bind(this)

      let checked = this.hasAttribute('checked') ? "checked" : ""
      let disabled = this.hasAttribute('disabled') ? "disabled" : ""
      let rounded = this.hasAttribute('rounded') ? "rounded" : ""

      this.shadowRoot.innerHTML = `<!-- ##HTML -->
        <style>
          #wrapper {
            display: inline-block;
            height: var(--toggle-height, 28px);
            position: relative;
            width: calc(2 * var(--toggle-height, 28px));
          }
          #wrapper input {
            display: none;
          }
          .toggle {
            background-color: rgb(var(--toggle_unchecked-background-color, 127 127 127));
            bottom: 0;
            cursor: pointer;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            transition: var(--toggle-transition-time, 0.25s);
          }
          .toggle:before {
            background-color: rgb(var(--button-color, 255 255 255));
            bottom: calc((var(--toggle-height, 28px) - var(--button-size, calc(var(--toggle-height, 28px) - 6px))) / 2);
            content: var(--toggle_unchecked-content, "");
            font-size: smaller;
            height: var(--button-size, calc(var(--toggle-height, 28px) - 6px));
            left: calc((var(--toggle-height, 28px) - var(--button-size, calc(var(--toggle-height, 28px) - 6px))) / 2);
            position: absolute;
            transition: var(--toggle-transition-time, 0.25s);
            width: var(--button-size, calc(var(--toggle-height, 28px) - 6px));
          }
          .toggle.rounded {
            border-radius: var(--toggle-height, 28px);
          }
          .toggle.rounded:before {
            border-radius: 50%;
          }
          input:checked + .toggle {
            background-color: rgb(var(--toggle_checked-background-color, 0 178 0));
          }
          input:disabled + .toggle {
            background-color: rgb(var(--toggle_disabled-background-color, 100 100 100));
            cursor: auto;
          }
          input:disabled + .toggle:before {
            content: var(--toggle_disabled-content, "");
          }
          input:checked + .toggle:before {
            content: var(--toggle_checked-content, "");
            transform: translateX(calc(
              2 * var(--toggle-height, 28px)
              - var(--button-size, calc(var(--toggle-height, 28px) - 6px))
              - (var(--toggle-height, 28px) - var(--button-size, calc(var(--toggle-height, 28px) - 6px)))
            ));
          }
        </style>
        <label id='wrapper'>
          <input type="checkbox" ${checked} ${disabled}>
          <span class="toggle ${rounded}"></span>
        </label>
        <!-- ##/HTML -->`

      this.chkbox = this.shadowRoot.querySelector('#wrapper input')
    }
    get checked() {
      return this.chkbox.checked
    }
    set checked(v) {
      this.chkbox.checked = Boolean(v)
    }
    get disabled() {
      return this.chkbox.disabled
    }
    set disabled(v) {
      this.chkbox.disabled = Boolean(v)
    }
    get rounded() { return this.rounded }
    set rounded(v) {
      if (v) {
        this.shadowRoot.querySelector('.toggle').classList.add('rounded')
      } else {
        this.shadowRoot.querySelector('.toggle').classList.remove('rounded')
      }
    }
    onClick(evt) {
      this.checked = evt.currentTarget.checked
      this.dispatchEvent(new Event("change", {bubbles: true}))
    }
    attributeChangedCallback(name, oldVal, newVal) {
      switch (name) {
        case 'checked':
          this.checked = newVal
          break
        case 'disabled':
          this.disabled = newVal
          break
        case 'rounded':
          this.rounded = newVal
          break
      }
    }
    connectedCallback() {
      if (this.hasAttribute('checked')) {
        this.chkbox.checked = true
      }
      if (this.hasAttribute('disabled')) {
        this.chkbox.disabled = true
      }
      if (this.hasAttribute('rounded')) {
        this.shadowRoot.querySelector('.toggle').classList.add('rounded')
      }
      this.chkbox.addEventListener('change', this.onClick)
    }
    disconnectedCallback() {
      this.chkbox.removeEventListener('change', this.onClick)
    }
    static get observedAttributes() {
      return ['checked', 'disabled', 'rounded'];
    }
  }
)
