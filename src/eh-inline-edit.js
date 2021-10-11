window.customElements.define('eh-inline-edit',
  class EhEditField extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({mode: 'open'})
      this.onClick = this.onClick.bind(this)
    }

    static get observedAttributes() {
      return ["value"]
    }

    get type() {
      return this.getAttribute('type') || "text"
    }

    get value() {
      return this.display?.innerText || this.getAttribute('value')
    }
    set value(str) {
      if (this.display) {
        this.display.innerText = str
      }
    }

    get isChanged() {
      return this.display.innerHTML !== this.value
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name == 'value') {
        this.value = newValue
      }
    }

    connectedCallback () {
      const value = this.value || ""
      const readonly = this.hasAttribute('readonly')

      // build the input's params
      const params = ['autocomplete', 'max', 'maxLength', 'min',
        'minLength','pattern', 'placeholder', 'size']
      var attrs = []
      params.forEach(attr => {
       if (this.hasAttribute(attr)) {
         attrs.push(`${attr}="${this.getAttribute(attr)}"`)
       }
      })

      this.shadowRoot.innerHTML = `<!-- ##HTML -->
        <style>
          .wrapper {
            background-color: rgb(var(--editor-background-color, transparent));
            border-radius: var(--editor-border-radius, 0);
            border: var(--editor-border, inherit);
            display: inline-block;
            min-height: var(--editor-height, 1.5em);
            padding: var(--editor-padding, 0);
            vertical-align: middle;
            width: var(--editor-width, unset);
          }
          .wrapper > .display {
            display: none;
          }
          .wrapper.displaymode > .display {
            display: unset;
          }
          .wrapper.displaymode > .editor {
            display: none;
          }
          .editvalue {
            color: rgb(var(--label-color, 0 0 0));
            font-family: var(--label-font-family, inherit);
            font-size: var(--label-font-size, 1rem);
            font-weight: var(--label-font-weight, inherit);
            padding-block-end: var(--label-padding-block-end, 0.1em);
            padding-block-start: var(--label-padding-block-start, 0.1em);
            padding-inline-end: var(--label-padding-inline-end, 0.25em);
            padding-inline-start: var(--label-padding-inline-start, 0.25em);
          }
          .button {
            cursor: pointer;
            color: rgb(var(--button-color, 0 0 0));
          }
          .button.edit {
            color: rgb(var(--edit-button-color, var(--button-color, 0 0 0)));
          }
          .button.update {
            color: rgb(var(--update-button-color, var(--button-color, 0 0 0)));
          }
          .button.cancel {
            color: rgb(var(--cancel-button-color, var(--button-color, 0 0 0)));
          }
          input {
            background-color: rgb(var(--editor-background-color, transparent));
            color: rgb(var(--input-color, 0 0 0));
            font-family: var(--input-font-family, inherit);
            font-size: var(--input-font-size, 1rem);
            font-weight: var(--input-font-weight, inherit);
            padding-block-end: var(--input-padding-block-end, 0.1em);
            padding-block-start: var(--input-padding-block-start, 0.1em);
            padding-inline-start: var(--input-padding-inline-start, 0.25em);
          }
        </style>
        <div class="wrapper displaymode">
          <div class="display">
            <span class="editvalue">${value}</span>
            <slot name="edit-button" class="button edit"><sup>✎</sup></slot>
          </div>
          <div class="editor">
            <input type="${this.type}" ${attrs.join(' ')}/>
            <slot name="update-button" class="button update">✔</slot>
            <slot name="cancel-button" class="button cancel">ⓧ</slot>
          </div>
        </div>
        <!-- ##/HTML -->`

      this.wrapper = this.shadowRoot.querySelector('.wrapper')
      this.display = this.shadowRoot.querySelector('.display span')
      this.editor = this.shadowRoot.querySelector('input')
      this.edit_button = this.shadowRoot.querySelector('slot[name="edit-button"]')
      this.update_button = this.shadowRoot.querySelector('slot[name="update-button"]')
      this.cancel_button = this.shadowRoot.querySelector('slot[name="cancel-button"]')

      this.edit_button.addEventListener('click', this.onClick)
      this.update_button.addEventListener('click', this.onClick)
      this.cancel_button.addEventListener('click', this.onClick)
    }

    disconnectedCallback () {
      this.edit_button.removeEventListener('click', this.onClick)
      this.update_button.removeEventListener('click', this.onClick)
      this.cancel_button.removeEventListener('click', this.onClick)
    }

    blur() {
      if (! this.wrapper.classList.contains('displaymode')) {
        this.editor.blur()
      }
    }

    cancelEdit() {
      if (! this.wrapper.classList.contains('displaymode')) {
        this.onClick({currentTarget: {name: 'cancel-button'}})
      }
    }

    click() {
      if (! this.wrapper.classList.contains('displaymode')) {
        this.editor.click()
      }
    }

    closeEdit() {
      if (! this.wrapper.classList.contains('displaymode')) {
        this.onClick({currentTarget: {name: 'update-button'}})
      }
    }

    focus() {
      if (! this.wrapper.classList.contains('displaymode')) {
        this.editor.focus()
      }
    }

    onClick(evt) {
      switch(evt.currentTarget.name) {
      case 'edit-button':
        this.editor.value = this.display.innerHTML
        this.wrapper.classList.remove('displaymode')
        this.editor.focus()
        this.editor.select()
        break
      case 'update-button':
        // this.value = this.editor.value
        // this.setAttribute('value', this.editor.value)
        this.display.innerHTML = this.editor.value
        this.wrapper.classList.add('displaymode')
        this.dispatchEvent(new Event("change", {bubbles: true}))
        break
      case 'cancel-button':
        this.wrapper.classList.add('displaymode')
        break
      }
    }

    setSelectionRange(s, e, d="none") {
      if (! this.wrapper.classList.contains('displaymode')) {
        this.editor.setSelectionRange(s, e, d)
      }
    }

    setRangeText(r, s=null, e=null, m="preserve") {
      if (! this.wrapper.classList.contains('displaymode')) {
        if (s) {
          this.editor.setRangeText(r, s, e, m)
        } else {
          this.editor.setRangeText(r)
        }
      }
    }

    startEdit() {
      if (this.wrapper.classList.contains('displaymode')) {
        this.onClick({currentTarget: {name: 'edit-button'}})
      }
    }
})
