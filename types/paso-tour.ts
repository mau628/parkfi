class PasoTour {
  Selector: string
  Mensaje: string
  constructor(Selector: string, Mensaje: string) {
    this.Selector = Selector
    this.Mensaje = Mensaje
  }
  ToComponentItem() {
    return {
      target: this.Selector,
      content: this.Mensaje
    }
  }
  Translate = (t: any): PasoTour => new PasoTour(this.Selector, t(this.Mensaje))
}

export { PasoTour }
