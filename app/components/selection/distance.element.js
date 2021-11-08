import { DistanceStyles, distance_css, supportsAdoptedStyleSheets } from '../styles.store'

export class Distance extends HTMLElement {

  constructor() {
    super()
    this.$shadow = this.attachShadow({mode: 'open'})
    this.styles = supportsAdoptedStyleSheets ? [DistanceStyles] : [distance_css]
  }

  connectedCallback() {
    if (supportsAdoptedStyleSheets) this.$shadow.adoptedStyleSheets = this.styles
  }
  
  disconnectedCallback() {}

  set position({line_model, node_label_id}) {
    this.styleProps = line_model
    this.$shadow.innerHTML  = this.render(line_model, node_label_id)
  }

  set styleProps({y,x,d,q,v = false, color}) {
    this.style.setProperty('--top', `${y + window.scrollY}px`)
    this.style.setProperty('--right', q === 'left' ? `${x + window.scrollX}px` : 'auto')
    this.style.setProperty('--left', q !== 'left' ? `${x + window.scrollX}px` : 'auto')
    this.style.setProperty('--direction', v ? 'column' : 'row')
    this.style.setProperty('--quadrant', q)

    v
      ? this.style.setProperty('--distance-h', `${d}px`)
      : this.style.setProperty('--distance-w', `${d}px`)

     v
      ? this.style.setProperty('--line-h', `var(--line-w)`)
      : this.style.setProperty('--line-w', `var(--line-w)`)

    if (color) {
      this.style.setProperty('--line-color', color === 'pink'
        ? 'hotpink'
        : 'hsl(267, 100%, 58%)')
      this.style.setProperty('--line-base', color === 'pink'
        ? 'hotpink'
        : 'hsl(267, 100%, 58%)')
    }
  }

  render({q,d}, node_label_id) {
    this.$shadow.host.setAttribute('data-label-id', node_label_id)

    return `
      ${this.renderStyles()}
      <figure quadrant="${q}">
        <div></div>
        <figcaption><b>${d}</b>px</figcaption>
        <div></div>
      </figure>
    `
  }

  renderStyles() {
    return supportsAdoptedStyleSheets ? '' : `<style>${this.styles.join('\n')}</style>`;
  }
}

customElements.define('visbug-distance', Distance)
