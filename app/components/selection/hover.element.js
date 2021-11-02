import { Handles } from './handles.element'
import { HandleStyles, HoverStyles, handle_css, hover_css, supportsAdoptedStyleSheets } from '../styles.store'

export class Hover extends Handles {

  constructor() {
    super()
    this.styles = supportsAdoptedStyleSheets ? [HandleStyles, HoverStyles] : [handle_css, hover_css];
  }

  render({ width, height, top, left }) {
    this.style.setProperty('--top', `${top + window.scrollY}px`)
    this.style.setProperty('--left', `${left + window.scrollX}px`)

    return `
      ${this.renderStyles()}
      <svg width="${width}" height="${height}">
        <rect></rect>
      </svg>
    `
  }
}

customElements.define('visbug-hover', Hover)
