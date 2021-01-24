export default class WheelThrottle {
    private el;
    constructor(el: HTMLElement | null);
    /**
     * Add event listener.
     * @param type
     * @param listener
     * @param options
     */
    addWheelThrottle(listener: (e: Event) => any): void;
    /**
     * Remove event listener.
     * @param type
     * @param listener
     * @param options
     */
    removeWheelThrottle(listener: (e: Event) => any): void;
}
