import { Handles } from './handles.element'
import { HandleStyles, CornersStyles, handle_css, corners_css, supportsAdoptedStyleSheets } from '../styles.store'

export class Corners extends Handles {

  constructor() {
    super()
    this.styles = supportsAdoptedStyleSheets ? [HandleStyles, CornersStyles] : [handle_css, corners_css];
  }

  render({ width, height, top, left }) {
    this.style.setProperty('--top', `${top + window.scrollY}px`)
    this.style.setProperty('--left', `${left}px`)

    return `
      ${this.renderStyles()}
      <svg width="${width}" height="${height}">
        <rect></rect>
        <rect></rect>
        <rect></rect>
        <rect></rect>
      </svg>
    `
  }
}

customElements.define('visbug-corners', Corners)
