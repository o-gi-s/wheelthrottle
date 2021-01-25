import WindowColor from "./WindowColor";
import Dots from "./Dots";
import WheelThrottle from "../src/WheelThrottle";

$(() => {
  const windowColor = new WindowColor($(".wrapper"));
  windowColor.setColor();

  const moveDots = (e: Event, dots: Dots, func: (e: any) => number) => {
    windowColor.setColor();
    const direction = func(e);
    if (direction === 1) {
      dots.next();
    } else if (direction === -1) {
      dots.prev();
    }
  }

  // WHEEL THROTTLE
  const dotsWheelThrottle = new Dots($("#wheelthrottle .dots"));
  const getDirection1 = (e: Event) => { return e.detail.direction };
  const wheelThrottle = new WheelThrottle(document.getElementById("wheelthrottle"));
  wheelThrottle.addWheelThrottle((e: Event) => moveDots(e, dotsWheelThrottle, getDirection1));

  // WHEEL
  const dotsWheel = new Dots($("#wheel .dots"));
  const getDirection2 = (e: WheelEvent) => { return Math.sign(e.deltaY || e.detail) };
  const wheel = document.getElementById("wheel");
  if (wheel) wheel.addEventListener("wheel", (e: Event) => moveDots(e, dotsWheel, getDirection2));
});
