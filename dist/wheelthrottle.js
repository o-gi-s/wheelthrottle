var tmpArray = [];
var getTime = new Date().getTime();
var scrollPossible = true;

var calcBalance = function calcBalance(elements, number) {
  var LAST_ELEMENTS = elements.slice(Math.max(elements.length - number, 1));
  var sum = 0;
  for (var i = 0; i < LAST_ELEMENTS.length; i++) {
    sum = sum + LAST_ELEMENTS[i];
  }
  return Math.ceil(sum / number);
};

var scrollPage = function scrollPage(e) {
  scrollPossible = false;
  setTimeout(function () {
    scrollPossible = true;
  }, 700);
};

document.addEventListener('wheel', function (e) {
  e = e || window.event;
  var value = e.wheelDelta || -e.deltaY || -e.detail;
  value = Math.abs(value);
  if (tmpArray.length > 149) {
    tmpArray.shift();
  }
  tmpArray.push(Math.abs(value));
  var TIME_CURRENT = new Date().getTime();
  var TIME_DIFFERENCE = TIME_CURRENT - getTime;
  getTime = TIME_CURRENT;
  if (TIME_DIFFERENCE > 200) {
    tmpArray = [];
  }
  var BALANCE_END = calcBalance(tmpArray, 10);
  var BALANCE_MIDDLE = calcBalance(tmpArray, 70);
  if (scrollPossible) {
    if (BALANCE_END >= BALANCE_MIDDLE) {
      scrollPage();
      var event = document.createEvent('MouseEvents');
      event.initEvent('wheelthrottle', true, false);
      this.dispatchEvent(event);
    }
  }
}, false);
