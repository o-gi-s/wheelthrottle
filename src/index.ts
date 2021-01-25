import EventDispatcher from "./lib/EventDispatcher";
import constants from "./constants/name";

export default class WheelThrottle {

  constructor (private el: HTMLElement | null) {
    if (el) {
      const eventDispatcher = new EventDispatcher();
      eventDispatcher.dispatch(el);
    } else {
      console.warn(`Undefined dom.`);
    }
  }

  /**
   * Add event listener.
   * @param type 
   * @param listener 
   * @param options 
   */
  public addWheelThrottle(listener: (e: Event) => any): void {
    if (this.el) {
      this.el.addEventListener(constants.evName, listener);
    }
  }

  /**
   * Remove event listener.
   * @param type 
   * @param listener 
   * @param options 
   */
  public removeWheelThrottle(listener: (e: Event) => any): void {
    if (this.el) {
      this.el.removeEventListener(constants.evName, listener);
    }
  }
}
