/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventDispatcher_1 = __webpack_require__(/*! ./src/lib/EventDispatcher */ "./src/lib/EventDispatcher.ts");
const name_1 = __webpack_require__(/*! ./src/constants/name */ "./src/constants/name.ts");
class WheelThrottle {
    constructor(el) {
        this.el = el;
        if (el) {
            const eventDispatcher = new EventDispatcher_1.default();
            eventDispatcher.dispatch(el);
        }
        else {
            console.warn(`Undefined dom.`);
        }
    }
    /**
     * Add event listener.
     * @param type
     * @param listener
     * @param options
     */
    addWheelThrottle(listener) {
        if (this.el) {
            this.el.addEventListener(name_1.default.evName, listener);
        }
    }
    /**
     * Remove event listener.
     * @param type
     * @param listener
     * @param options
     */
    removeWheelThrottle(listener) {
        if (this.el) {
            this.el.removeEventListener(name_1.default.evName, listener);
        }
    }
}
exports.default = WheelThrottle;


/***/ }),

/***/ "./src/constants/name.ts":
/*!*******************************!*\
  !*** ./src/constants/name.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    evName: "wheelthrottle"
};


/***/ }),

/***/ "./src/lib/EventDispatcher.ts":
/*!************************************!*\
  !*** ./src/lib/EventDispatcher.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const name_1 = __webpack_require__(/*! ../constants/name */ "./src/constants/name.ts");
class EventDispatcher {
    constructor() {
        this.tmpArray = [];
        this.initTime = this.getTime();
        this.scrollPossible = true;
    }
    /**
     * Dispatch custom event on window.
     */
    dispatch(el) {
        el.addEventListener("wheel", (e) => {
            e = e || window.event;
            let value = -e.deltaY || -e.detail;
            value = Math.abs(value);
            if (this.tmpArray.length > 149) {
                this.tmpArray.shift();
            }
            this.tmpArray.push(Math.abs(value));
            const TIME_CURRENT = this.getTime();
            const TIME_DIFFERENCE = TIME_CURRENT - this.initTime;
            this.initTime = TIME_CURRENT;
            if (TIME_DIFFERENCE > 200) {
                this.tmpArray = [];
            }
            const BALANCE_END = this.calcBalance(this.tmpArray, 10);
            const BALANCE_MIDDLE = this.calcBalance(this.tmpArray, 70);
            if (this.scrollPossible) {
                if (BALANCE_END >= BALANCE_MIDDLE) {
                    this.scrollThrottle();
                    const event = new CustomEvent(name_1.default.evName, {
                        bubbles: true,
                        detail: {
                            direction: Math.sign(e.deltaY)
                        }
                    });
                    el.dispatchEvent(event);
                }
            }
        }, false);
    }
    ;
    /**
     * Calc balance.
     * @param elements
     * @param number
     */
    calcBalance(elements, number) {
        const LAST_ELEMENTS = elements.slice(Math.max(elements.length - number, 1));
        let sum = 0;
        for (let i = 0; i < LAST_ELEMENTS.length; i++) {
            sum = sum + LAST_ELEMENTS[i];
        }
        return Math.ceil(sum / number);
    }
    /**
     * Switch the scroll status.
     */
    scrollThrottle() {
        this.scrollPossible = false;
        setTimeout(() => {
            this.scrollPossible = true;
        }, 700);
    }
    /**
     * Get current time.
     */
    getTime() {
        return new Date().getTime();
    }
}
exports.default = EventDispatcher;


/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\drbob\repos\private\wheelthrottle\index.ts */"./index.ts");


/***/ })

/******/ });