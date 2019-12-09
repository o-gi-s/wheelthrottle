let num = 5;

document.addEventListener("wheelthrottle", (e) => {
  
  const WHEEL_DIRECTION = e.direction;
  const $CARD = $(".card");
  
  $CARD.attr("data-action", "true");
  if(WHEEL_DIRECTION < 0){
    num += 1;
    $CARD.find("span").attr("data-direction", "true");
  }else{
    num -= 1;
    $CARD.find("span").attr("data-direction", "false");
  }
  
  setTimeout(() => {
    $CARD.attr("data-action", "false");
    $CARD.find("span").attr("data-direction", "null");
  }, (Number($CARD.css("animation-duration").split("s")[0]) * 1000) - 10);
  
  if(num < 1){
    num = 1;
  }else if(num >= 10){
    num = 10;
  }
  
  $("#count").text(num);
});