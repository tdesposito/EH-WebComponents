# &lt;eh-message-modal&gt;

## Slots
### Default Slot
Everything inside the open and close tags will show as the message body of the
component, except see below.

### "button-text"
Anything in the "button-text" slot will be displayed in the "close" button.
```
<span slot="button-text">Replaces The Default Button Text</span>
```

## Events
* "close" fires when the Close button is pressed.

## Custom Properties
* --box-background-color: [254 254 254]
* --box-border-radius: [10px]
* --box-border: [1px solid rgba(var(--box-background-color) / 10%)]
* --box-left: [15%]
* --box-padding: [12px]
* --box-text-align: [center]
* --box-top: [20%]
* --box-width: [70%]
* --button_hover-transform: [scale3d(1.02, 1.02, 1)]
* --button-background-color: [27 149 9]
* --button-border-radius: [6px]
* --button-border: [1px solid rgba(var(--button-background-color) / 50%]
* --button-color: [255 255 255]
* --button-font-size: [1.1rem]
* --button-line-height: [16px]
* --button-margin: [6px]
* --button-min-width: [10rem]
* --button-padding: [17px 34px]
* --button-transition-duration: [var(--transition-duration)]
  * if you want the transition effect time different from the "fade-in/fade-out" of the entire component.
* --content-margin: [20px 2px]
* --content-padding: [2px 16px]
* --mask-background-color: [198 187 187]
* --mask-opacity: [97%]
* --title-background-color: [86 120 229]
* --title-border-radius: [6px]
* --title-border: [1px solid rgba(var(--title-background-color) / 50%)]
* --title-color: [255 255 255]
* --title-font-size: [1.5rem]
* --title-padding: [2px 16px]
* --transition-duration: [.25s] -- duration of the "fade-in/fade-out" effect
