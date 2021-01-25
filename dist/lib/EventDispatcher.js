"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var name_1 = __importDefault(require("../constants/name"));
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.tmpArray = [];
        this.initTime = this.getTime();
        this.scrollPossible = true;
    }
    EventDispatcher.prototype.dispatch = function (el) {
        var _this = this;
        el.addEventListener("wheel", function (e) {
            e = e || window.event;
            var value = -e.deltaY || -e.detail;
            value = Math.abs(value);
            if (_this.tmpArray.length > 149) {
                _this.tmpArray.shift();
            }
            _this.tmpArray.push(Math.abs(value));
            var TIME_CURRENT = _this.getTime();
            var TIME_DIFFERENCE = TIME_CURRENT - _this.initTime;
            _this.initTime = TIME_CURRENT;
            if (TIME_DIFFERENCE > 200) {
                _this.tmpArray = [];
            }
            var BALANCE_END = _this.calcBalance(_this.tmpArray, 10);
            var BALANCE_MIDDLE = _this.calcBalance(_this.tmpArray, 70);
            if (_this.scrollPossible) {
                if (BALANCE_END >= BALANCE_MIDDLE) {
                    _this.scrollThrottle();
                    var event_1 = new CustomEvent(name_1.default.evName, {
                        bubbles: true,
                        detail: {
                            direction: Math.sign(e.deltaY)
                        }
                    });
                    el.dispatchEvent(event_1);
                }
            }
        }, false);
    };
    ;
    EventDispatcher.prototype.calcBalance = function (elements, number) {
        var LAST_ELEMENTS = elements.slice(Math.max(elements.length - number, 1));
        var sum = 0;
        for (var i = 0; i < LAST_ELEMENTS.length; i++) {
            sum = sum + LAST_ELEMENTS[i];
        }
        return Math.ceil(sum / number);
    };
    EventDispatcher.prototype.scrollThrottle = function () {
        var _this = this;
        this.scrollPossible = false;
        setTimeout(function () {
            _this.scrollPossible = true;
        }, 700);
    };
    EventDispatcher.prototype.getTime = function () {
        return new Date().getTime();
    };
    return EventDispatcher;
}());
exports.default = EventDispatcher;
