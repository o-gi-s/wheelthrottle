"use strict";

var num = 5;
document.addEventListener("wheelthrottle", function (e) {
  var WHEEL_DIRECTION = e.direction;
  var $CARD = $(".card");
  $CARD.attr("data-action", "true");

  if (WHEEL_DIRECTION < 0) {
    num += 1;
    $CARD.find("span").attr("data-direction", "true");
  } else {
    num -= 1;
    $CARD.find("span").attr("data-direction", "false");
  }

  setTimeout(function () {
    $CARD.attr("data-action", "false");
    $CARD.find("span").attr("data-direction", "null");
  }, Number($CARD.css("animation-duration").split("s")[0]) * 1000 - 10);

  if (num < 1) {
    num = 1;
  } else if (num >= 10) {
    num = 10;
  }

  $("#count").text(num);
});
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
      var event = document.createEvent('MouseEvent');
      event.initEvent('wheelthrottle', true, false);
      event["direction"] = Math.sign(e.deltaY);
      this.dispatchEvent(event);
    }
  }
}, false);