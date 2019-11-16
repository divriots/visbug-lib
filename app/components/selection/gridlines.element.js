import { GridlineStyles } from '../styles.store'

export class Gridlines extends HTMLElement {

  constructor() {
    super()
    this.$shadow = this.attachShadow({mode: 'closed'})
  }

  connectedCallback() {
    this.$shadow.adoptedStyleSheets = [GridlineStyles]
  }
  
  disconnectedCallback() {}

  set position(boundingRect) {
    this.$shadow.innerHTML  = this.render(boundingRect)
  }

  set update({ width, height, top, left, x, y }) {
    const winHeight = window.innerHeight, winWidth = window.innerWidth
    const calced_y = y + window.scrollY
    const calced_x = x + window.scrollX
    const svg = this.$shadow.children[this.$shadow.children.length-1] // hack for Firefox, first element is adopted style injected
    const [rect,line1,line2,line3,line4] = svg.children

    this.$shadow.host.style.display = 'block'

    rect.setAttribute('width', width + 'px')
    rect.setAttribute('x', calced_x)
    rect.setAttribute('y', calced_y)
    line1.setAttribute('x1', calced_x)
    line1.setAttribute('x2', calced_x)
    line1.setAttribute('y2', winHeight)
    line2.setAttribute('x1', calced_x + width)
    line2.setAttribute('x2', calced_x + width)
    line2.setAttribute('y2', winHeight)
    line3.setAttribute('y1', calced_y)
    line3.setAttribute('y2', calced_y)
    line3.setAttribute('x2', winWidth)
    line4.setAttribute('y1', calced_y + height)
    line4.setAttribute('y2', calced_y + height)
    line4.setAttribute('x2', winWidth)
  }

  render({ x, y, width, height, top, left }) {
    const winHeight = window.innerHeight, winWidth = window.innerWidth
    const calced_y = y + window.scrollY
    const calced_x = x + window.scrollX

    return `
      <svg
        width="100%"
        version="1.1" xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          fill="none"
          width="${width}" height="${height}"
          x="${calced_x}" y="${calced_y}"
        ></rect>
        <line x1="${calced_x}" y1="0" x2="${calced_x}" y2="${winHeight}"></line>
        <line x1="${calced_x + width}" y1="0" x2="${calced_x + width}" y2="${winHeight}"></line>
        <line x1="0" y1="${calced_y}" x2="${winWidth}" y2="${calced_y}"></line>
        <line x1="0" y1="${calced_y + height}" x2="${winWidth}" y2="${calced_y + height}"></line>
      </svg>
    `
  }
}

customElements.define('visbug-gridlines', Gridlines)
