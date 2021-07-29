# EH-WebComponents

These are some simple utility Web Components I find myself needing again and
again. They are all completely self-contained in individual `.min.js` files.
Though a bundle is also available.

These are intended to be dropped into sites without a build process. Reference
them directly in your HTML.

## Installation

Ideally, you don't install anything to use these. There is -- intentionally --
no npm package, no installer, no tooling required to use these components.

You can load individual components via CDN, i.e.:
```
<script src="https://cdn.jsdelivr.net/gh/tdesposito/eh-webcomponents/dist/eh-loading-modal.min.js"></script>
```

You can load ALL of them in a single bundle:
```
<script src="https://cdn.jsdelivr.net/gh/tdesposito/eh-webcomponents/dist/ehcomponents-bundle.min.js"></script>
```

You can copy them into your project, then serve them from there:
```
<script src="/static/eh-loading-modal.min.js"></script>
```

## Modals - Components which take over the screen
* [`<eh-confirm-modal>`](docs/confirm-modal.md): A full-screen modal confirm dialog box.
* [`<eh-loading-modal>`](docs/loading-modal.md): A full-screen "loading" modal pop-over.
* [`<eh-message-modal>`](docs/message-modal.md): A full-screen modal showing a message.

## Input Elements - Components which augment user input
* [`<eh-toggle>`](docs/toggle.md): A single toggle switch.

## Styling Components
Each component uses CSS Custom Properties for styling. See each component's
documentation for a complete list.

These CSS Custom Properties are of the form:
```
--{aspect}[_{state}]-{css-property}: [{default value}]
```

In your stylesheets:
```
/* target a single instance of a component, by ID - as one does: */
#my_id_for_a_component {
  --box-color: 255 15 15;
  --button_hover-color: 0 255 185
}
/* or EVERY eh-message-modal on the page: */
eh-message-modal {
  --box-top: 100px;
}
/* You can target the slotted (child) content as usual. */
/* Here, you don't need the '--' since we're manipulating a child node: */
eh-message-modal pre {
  font-family: 'Comic Sans'
}
```
__*NOTE:* All colors are expressed as space-separated RGB values!__

## Demos

[See them in action](https://tdesposito.github.io/EH-WebComponents/)

## Contributing
I welcome comments, suggestions, and requests for components. Or build your own
and send me a pull request!

I intend that this library NOT become more complex to use or build:
* I don't want to adopt a framework.
* I don't want to create a framework.
* I don't want to create an NPM package.
* I don't want a complex build process. The [one in place](docs/dev.md) is super simple and, I think, Good Enough.

That said, if you want to create an NPM package, please let me know and we can talk.
