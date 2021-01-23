wheelthrottle
====

Wheel event debounce with windows mouse or apple trackpad.

## Description
When we scroll with apple magic mouse and track pad, face a few problem.  
Because that's those have inertia scroll forcibly. Wheelthrottle made possible "one wheel one fire".  
If you keep wheeling it, It will ignite in a certain time. It's work possibility normal mouse also.

## Usage
```
import WheelThrottle from "WheelThrottle";

const targetEl = new WheelThrottle(document.getElementById("id"));

targetEl.addWheelThrottle((e: Event) => {
  const WHEEL_DIRECTION = e.detail.direction; // 1 or -1
  // ...
});
```

## Install

`
npm install --save-dev wheelthrottle
`

## Licence

[MIT](https://opensource.org/licenses/MIT)