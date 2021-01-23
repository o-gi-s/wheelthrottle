
export default class EventDispatcher {
  private tmpArray: number[] = [];
  private initTime = this.getTime();
  private scrollPossible = true;

  /**
   * Dispatch custom event on window.
   */
  public dispatch(el: HTMLElement): void {
    el.addEventListener("wheel", (e) => {
      e = e || window.event;
      let value = -e.deltaY || -e.detail;
      value = Math.abs(value);
      if(this.tmpArray.length > 149){
        this.tmpArray.shift();
      }
      this.tmpArray.push(Math.abs(value));
      const TIME_CURRENT = this.getTime();
      const TIME_DIFFERENCE = TIME_CURRENT - this.initTime;
      this.initTime = TIME_CURRENT;
      if(TIME_DIFFERENCE > 200){
        this.tmpArray = [];
      }
      const BALANCE_END = this.calcBalance(this.tmpArray, 10);
      const BALANCE_MIDDLE = this.calcBalance(this.tmpArray, 70);
      if(this.scrollPossible){
        if(BALANCE_END >= BALANCE_MIDDLE){
          this.scrollThrottle();
          const event = new CustomEvent("wheelthrottle", {
            bubbles: true,
            detail: {
              direction: Math.sign(e.deltaY) as 1 | -1}
            }
          );
          el.dispatchEvent(event);
        }
      }
    }, false);
  };

  /**
   * Calc balance.
   * @param elements 
   * @param number 
   */
  private calcBalance(elements: number[], number: number): number {
    const LAST_ELEMENTS = elements.slice(Math.max(elements.length - number, 1));
    let sum = 0;
    for(let i = 0; i < LAST_ELEMENTS.length; i++){
      sum = sum + LAST_ELEMENTS[i];
    }
    return Math.ceil( sum / number );
  }

  /**
   * Switch the scroll status.
   */
  private scrollThrottle(): void {
    this.scrollPossible = false;
    setTimeout(() => {
      this.scrollPossible = true;
    }, 700);
  }

  /**
   * Get current time.
   */
  private getTime(): number {
    return new Date().getTime();
  }
}
