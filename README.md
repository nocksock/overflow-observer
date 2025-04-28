# overflow-observer

A tiny web component to determine if an element is overflowing its container.

[See example on codepen](https://codepen.io/nocksock/pen/PwwjNbK?editors=1111)

## Usage

```html
<script src="https://esm.sh/overflow-observer" type="module"></script>
<overflow-observer>
    <ul>
        <li>
            <a href="#">some item</a>
        </li><li>
            <a href="#">some other item</a>
        </li>
    </ul>
</overflow-observer>
```

Style it using CSS:

```css
overflow-observer:state(overflow) {
    /** is overflowing **/
}
overflow-observer:state(overflowblock) {
    /** is overflowing in block direction **/
}
overflow-observer:state(overflowblockstart) {
    /** is overflowing in block start direction **/
}
overflow-observer:state(overflowblockend) {
    /** is overflowing in block end direction **/
}
overflow-observer:state(overflowinline) {
    /** is overflowing in inline direction **/
}
overflow-observer:state(overflowinlinestart) {
    /** is overflowing in inline start direction **/
}
overflow-observer:state(overflowinlineend) {
    /** is overflowing in inline end direction **/
}
```

Listen to events

```js
document
    .querySelector('overflow-observer')
    .addEventListener('overflow:changed', ({detail}) => {
        console.log(detail)
    })
```

Where detail is an array of all states it has, eg: `["overflow", "overflowinline", "overflowinlineend]` when overflowing on the inline axis.
