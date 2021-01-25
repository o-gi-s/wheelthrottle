"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher_1 = __importDefault(require("./lib/EventDispatcher"));
var name_1 = __importDefault(require("./constants/name"));
var WheelThrottle = (function () {
    function WheelThrottle(el) {
        this.el = el;
        if (el) {
            var eventDispatcher = new EventDispatcher_1.default();
            eventDispatcher.dispatch(el);
        }
        else {
            console.warn("Undefined dom.");
        }
    }
    WheelThrottle.prototype.addWheelThrottle = function (listener) {
        if (this.el) {
            this.el.addEventListener(name_1.default.evName, listener);
        }
    };
    WheelThrottle.prototype.removeWheelThrottle = function (listener) {
        if (this.el) {
            this.el.removeEventListener(name_1.default.evName, listener);
        }
    };
    return WheelThrottle;
}());
exports.default = WheelThrottle;
