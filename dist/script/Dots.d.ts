/// <reference types="jquery" />
export default class Dots {
    private dom;
    private readonly uniqueClass;
    private maxLen;
    constructor(dom: JQuery);
    /**
     * Move to next dot.
     */
    next(): void;
    /**
     * Move to prev dot.
     */
    prev(): void;
    /**
     * Get current dot index.
     */
    getCurrentDot(): number;
    /**
     * Set class on dot.
     * @param index
     */
    private setUniqueClass;
    /**
     * Remove class from dot.
     */
    private removeDots;
}
