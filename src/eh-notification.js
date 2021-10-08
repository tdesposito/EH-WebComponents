window.customElements.define('eh-notification',
  class EhNotification extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({mode: 'open'})

      this.onClick = this.onClick.bind(this)
      this.closePanel = this.closePanel.bind(this)

      this.shadowRoot.innerHTML = `<!-- ##HTML -->
        <style>
          #wrapper {
            font-size: var(--notification-font-size, 1rem);
            height: calc(100vh - var(--notification-margin, 20px) * 2);
            left: var(--notification-margin, 20px);
            margin: 0;
            overflow: hidden;
            padding: 0;
            pointer-events: none;
            position: absolute;
            text-align: left;
            top: var(--notification-margin, 20px);
            width: calc(100vw - var(--notification-margin, 20px) * 2);
          }
          .panel {
            border: var(--panel-border, none);
            border-radius: var(--panel-border-radius, 0px);
            color: var(--panel-color, white);
            height: var(--panel-height, 4em);
            margin-bottom: var(--panel-margin, 0.5em);
            margin-left: calc(100vw - var(--notification-margin, 20px) * 2 - var(--panel-width, 20em));
            opacity: var(--panel-opacity, .75);
            overflow: hidden;
            padding: 0;
            pointer-events: auto;
            transition-property: opacity, transform;
            transition-duration: var(--animation-time, 1.5s);
            width: var(--panel-width, 20em);
          }
          .panel.closed {
            height: 0;
            transition: height var(--animation-time, 0.75s);
          }
          .panel:hover {
            opacity: 1;
            transition: opacity 0.25s ease;
          }
          .panel.success {
            background-color: rgb(var(--success-background-color, 0 100 0));
          }
          .panel.info {
            background-color: rgb(var(--info-background-color, 0 0 200));
          }
          .panel.warning {
            background-color: rgb(var(--warning-background-color, 200 200 0));
          }
          .panel.error {
            background-color: rgb(var(--error-background-color, 200 0 0));
          }
          .panel.slide {
            margin-left: calc(100vw - var(--notification-margin, 20px) * 2);
          }
          .panel.fade {
            opacity: 0;
          }
          .panel.left {
            margin-left: 0;
          }
          .panel.left.slide {
            margin-left: calc(var(--panel-width, 20em) * -1);
          }
          .panel.center {
            margin-left: calc(50vw - var(--panel-width, 20em) / 2);
          }
          .inner {
            padding: 10px;
          }
          .inner button {
            cursor: pointer;
            float: right;
            color: var(--panel-color, white);
            background-color: transparent;
            border: none;
          }
          .hidden {
            display: none;
          }
          .message {
            margin: 0;
          }
        </style>
        <div id="wrapper">
        </div>
        <template id="template"><div class="panel"><div class="inner"><button class="hidden">ⓧ</button><p class="message"></p></div></div></template>
        <!-- ##/HTML -->`

      this.panelList = {}
      this.wrapper = this.shadowRoot.getElementById('wrapper')
      this.template = this.shadowRoot.getElementById('template')

      // Calculate allowable class combos
      let attrs = ['canclose']
      if (this.hasAttribute('center')) {
        attrs = attrs.concat(['center', 'fade'])
      } else if (this.hasAttribute('fade')) {
        attrs = attrs.concat(['fade', 'center', 'left'])
      } else if (this.hasAttribute('slide')) {
        attrs = attrs.concat(['slide', 'left'])
      } else {
        attrs = attrs.concat(['left'])
      }
      this.panelClasses = []
      attrs.forEach((attr) => {
        if (this.hasAttribute(attr)) {
          this.panelClasses.push(attr)
        }
      })
    }

    get canclose() {
      return (this.hasAttribute('canclose') || this.timeout < 1)
    }

    get timeout() {
      return (parseInt(this.getAttribute('autoclose') || 0))
    }

    onClick(e) {
      e.stopPropagation()
      if (this.canclose) {
        let target = e.target
        if (target.nodeName !== "DIV")
          target = target.parentNode.parentNode
        this.closePanel(target.dataset.id)
      }
    }

    connectedCallback() {
      this.shadowRoot.addEventListener('click', this.onClick)
    }

    disconnectedCallback() {
      this.shadowRoot.removeEventListener('click', this.onClick)
    }

    add(message, type='info') {
      let msg_id = window.performance.now()
      let frag = this.template.content.cloneNode(true)
      let panel = frag.querySelector('.panel')

      panel.classList.add(type)
      panel.dataset.id = msg_id
      panel.classList.add(...this.panelClasses)
      frag.querySelector('.message').innerHTML = message
      if (this.canclose) {
        frag.querySelector('button').classList.remove('hidden')
      }
      this.wrapper.appendChild(frag)
      this.panelList[msg_id] = { panel }
      if (this.timeout) {
        this.panelList[msg_id].timer = setTimeout(() => this.closePanel(msg_id), this.timeout)
      }
      if (panel.classList.contains('fade')) {
        setTimeout(() => {
          panel.style.opacity = getComputedStyle(this.wrapper).getPropertyValue('--panel-opacity') || 0.75
        }, 100)
      } else if(panel.classList.contains('slide')) {
        let offset = parseInt(getComputedStyle(panel).width)
        if (panel.classList.contains('left')) {
          panel.style.transform = `translateX(${offset}px)`
        } else {
          panel.style.transform = `translateX(-${offset}px)`
        }
      }
      return msg_id
    }

    clearPanels() {
      Object.keys(this.panelList).forEach(id => {
        this.closePanel(id)
      })
    }

    closePanel(message_id) {
      let node = this.panelList[message_id]
      if (node) {
        if (node.timer) {
          clearTimeout(node.timer)
        }
        node.panel.classList.add('closed')
        node.panel.addEventListener('transitionend', () => {
          node.panel.remove()
        })
      }
    }

    onClose() {
    }
  }
)
