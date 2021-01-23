
export default class Dots {

  private readonly uniqueClass = "enable";
  private maxLen: number;

  constructor(private dom: JQuery) {
    this.maxLen = this.dom.children().length - 1;
    // Init dot.
    this.setUniqueClass(0);
  }

  /**
   * Move to next dot.
   */
  public next(): void {
    const currentDot = this.getCurrentDot();
    this.removeDots();
    if (currentDot === this.maxLen) {
      this.setUniqueClass(0);
    } else {
      this.setUniqueClass(currentDot + 1);
    }
  }

  /**
   * Move to prev dot.
   */
  public prev(): void {
    const currentDot = this.getCurrentDot();
    this.removeDots();

    if (currentDot === 0) {
      this.setUniqueClass(this.maxLen);
    } else {
      this.setUniqueClass(currentDot - 1);
    }
  }

  /**
   * Get current dot index.
   */
  public getCurrentDot(): number {
    return this.dom.children(`.${ this.uniqueClass }`).index();
  }

  /**
   * Set class on dot.
   * @param index 
   */
  private setUniqueClass(index: number): void {
    this.dom.children().eq(index).addClass(this.uniqueClass);
  }

  /**
   * Remove class from dot.
   */
  private removeDots(): void {
    this.dom.children().removeClass(this.uniqueClass);
  }
}