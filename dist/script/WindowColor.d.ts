/// <reference types="jquery" />
export default class WindowColor {
    private dom;
    constructor(dom: JQuery);
    setColor(): void;
    /**
     * Generate random color as hexadecimal.
     */
    private generateColor;
}
