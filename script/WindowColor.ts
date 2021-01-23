
export default class WindowColor {
  constructor(private dom: JQuery) {
  }

  public setColor(): void {
    this.dom.css({ backgroundColor: this.generateColor() });
  }

  /**
   * Generate random color as hexadecimal.
   */
  private generateColor(): string {
    const randomColor = "#" + ("000000" + (Math.random() * 0xFFFFFF | 0).toString(16)).slice(-6);
    return randomColor;
  }
}