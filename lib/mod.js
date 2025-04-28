const test = {
  overflowblock: (container, track) => track.scrollHeight > container.clientHeight,
  overflowinline: (container, track) => track.scrollWidth > container.clientWidth,
}
const testKeys = Object.keys(test);

class OverflowObserver extends HTMLElement {
  #internals = this.attachInternals();
  #before = "";
  #observer = new ResizeObserver(() =>
    requestAnimationFrame(() => this.#checkOverflow())
  );

  #state(ident, value) {
    if (!value) return;
    this.#internals.states.add(ident);
    this.#internals.states.add("overflow");
  }

  #checkOverflow() {
    this.#internals.states.clear()

    for (const key of testKeys) {
      this.#state(key, test[key](this, this.firstElementChild));
    }

    const states = [...this.#internals.states.values()]
    const statestr = states.join(", ");

    if (this.#before !== statestr) {
      this.#before = statestr;
      this.dispatchEvent(
        new CustomEvent("overflow:changed", {
          detail: states
        })
      );
    }
  }

  connectedCallback() { this.#observer.observe(this); }
  disconnectedCallback() { this.#observer.disconnect(); }
}

customElements.define("overflow-observer", OverflowObserver);
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(`
  @layer overflow-observer {
    overflow-observer {
      display: block;
    }
  }
`);
document.adoptedStyleSheets.push(stylesheet);

customElements.define("overflow-observer-states", class extends HTMLElement {
  handleEvent(event) {
    if (event.type === "overflow:changed")  {
      this.innerHTML = Array.from(event.detail).join(", ");
    }
  }
  get target() {
    return document.getElementById(this.getAttribute("for"))
  }
  connectedCallback() { 
    this.target.addEventListener("overflow:changed", this);
  }
  disconnectedCallback() {
    this.target.removeEventListener("overflow:changed", this);
  }
});
