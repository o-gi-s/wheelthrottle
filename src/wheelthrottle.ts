import EventDispatcher from "./lib/EventDispatcher";

export default class WheelThrottle {

  constructor (private el: HTMLElement | null) {
    if (el) {
      const eventDispatcher = new EventDispatcher();
      window.onload = () => eventDispatcher.dispatch(el);
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
  public addEventListener(type: string, listener: (e: Event) => any, options?: boolean | AddEventListenerOptions | undefined): void {
    if (this.el) {
      this.el.addEventListener(type, listener, options);
    }
  }

  /**
   * Remove event listener.
   * @param type 
   * @param listener 
   * @param options 
   */
  public removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void {
    if (this.el) {
      this.el.removeEventListener(type, listener, options);
    }
  }
}
