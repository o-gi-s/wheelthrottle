export default class EventDispatcher {
    private tmpArray;
    private initTime;
    private scrollPossible;
    /**
     * Dispatch custom event on window.
     */
    dispatch(el: HTMLElement): void;
    /**
     * Calc balance.
     * @param elements
     * @param number
     */
    private calcBalance;
    /**
     * Switch the scroll status.
     */
    private scrollThrottle;
    /**
     * Get current time.
     */
    private getTime;
}
