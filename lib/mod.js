class OverflowObserver extends HTMLElement {
  #observer = new ResizeObserver(() =>
    requestAnimationFrame(() => this.#checkOverflow())
  );
  #internals = this.attachInternals();

  #checkOverflow() {
    const parent = this.parentElement;
    if (!parent) return;

    this.#internals.states.delete("overflow");

    const overflows =
      this.scrollWidth > parent.clientWidth ||
      this.scrollHeight > parent.clientHeight;
    console.log("123", overflows)

    if (overflows) {
      this.#internals.states.add("overflow");
    } else {
      this.#internals.states.delete("overflow");
    }
  }

  constructor() {
    super();
    this.style.display = "block";
  }

  connectedCallback() {
    this.#observer.observe(this);
  }

  disconnectedCallback() {
    this.#observer.disconnect();
  }
}

customElements.define("overflow-observer", OverflowObserver);
