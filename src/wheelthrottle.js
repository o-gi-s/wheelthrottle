let tmpArray = [];
let getTime = new Date().getTime();
let scrollPossible = true;

const calcBalance = (elements, number) => {
  const LAST_ELEMENTS = elements.slice(Math.max(elements.length - number, 1));
  let sum = 0;
  for(let i = 0; i < LAST_ELEMENTS.length; i++){
    sum = sum + LAST_ELEMENTS[i];
  }
  return Math.ceil( sum / number );
}

const scrollPage = (e) => {
  scrollPossible = false;
  setTimeout(() => {
    scrollPossible = true;
  }, 700);
}

document.addEventListener('wheel', function(e) {
  e = e || window.event;
  let value = e.wheelDelta || -e.deltaY || -e.detail;
  value = Math.abs(value);
  if(tmpArray.length > 149){
    tmpArray.shift();
  }
  tmpArray.push(Math.abs(value));
  const TIME_CURRENT = new Date().getTime();
  const TIME_DIFFERENCE = TIME_CURRENT - getTime;
  getTime = TIME_CURRENT;
  if(TIME_DIFFERENCE > 200){
    tmpArray = [];
  }
  const BALANCE_END = calcBalance(tmpArray, 10);
  const BALANCE_MIDDLE = calcBalance(tmpArray, 70);
  if(scrollPossible){
    if(BALANCE_END >= BALANCE_MIDDLE){
      scrollPage();
      var event = document.createEvent('MouseEvents');
      event.initEvent('wheelthrottle', true, false);
      this.dispatchEvent(event);
    }
  }
}, false);