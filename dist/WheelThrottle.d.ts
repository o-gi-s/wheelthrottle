export default class WheelThrottle {
    private el;
    constructor(el: HTMLElement | null);
    addWheelThrottle(listener: (e: Event) => any): void;
    removeWheelThrottle(listener: (e: Event) => any): void;
}
