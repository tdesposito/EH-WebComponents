# &lt;eh-notification&gt;

`<eh-notification [left|center] [slide|fade] [canclose] [autoclose="ms"]>`

  * `left` - positions notification panels on the left
  * `center` - positions notification panels in the center of the window
  * `slide` - notifications slide in (`left` or `right` only)
  * `fade` - notifications fade in
  * `canclose` - add a "close" button to notifications
  * `autoclose=` - sets the automatic closure time of notifications (in milliseconds)

## Slots
  * None

## Methods

`add(message, type='info')`
> add a notification; type is `info`, `success`, `warning`, or `error`; returns an opaque ID

`clearPanels()`
> closes all open notifications

`closePanel(id)`
> closes a particular notification; use the ID returned from `add(...)`

## Custom Properties
  * --animation-time: [0.75s, but 1.5s for slide/fade modes]
  * --error-background-color: [255 255 255]
  * --info-background-color: [255 255 255]
  * --notification-font-size [1rem]
  * --notification-margin [20px]
  * --panel-color: [white]
  * --success-background-color: [255 255 255]
  * --warn-background-color: [255 255 255]
