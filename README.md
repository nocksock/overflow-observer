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
        </li>
        <li>
            <a href="#">some other item</a>
        </li>
        <li>...</li>
        ...
    </ul>
</overflow-observer>
```

Style it using CSS

```css
ul {
    overflow-observer:state(overflow) & {
        /** styles for when overflowing **/
    }
    
    overflow-observer:not(:state(overflow)) & {
        /** styles for when not overflowing **/
    }
}
```

That's it.
