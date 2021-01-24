/// <reference types="jquery" />
export default class Dots {
    private dom;
    private readonly uniqueClass;
    private maxLen;
    constructor(dom: JQuery);
    next(): void;
    prev(): void;
    getCurrentDot(): number;
    private setUniqueClass;
    private removeDots;
}
