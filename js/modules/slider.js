var d = document;
var list = d.querySelector('.candy-bar__list');
var itemCount = d.querySelectorAll('.candy-bar__item').length;
var slider = d.querySelector('.candy-bar__slider');
var back = d.querySelector('#back');
var forward = d.querySelector('#forward');
var pos = 0;
var clientX, clientY;

//Слайдер

function setTransform() {
  list.style.transform = 'translateX(' + (-pos * slider.offsetWidth) + 'px)';
}

function prev() {
  pos = Math.max(pos - 1, 0);
  setTransform();
}
function next() {
  pos = Math.min(pos + 1, itemCount - 1);
  setTransform();
}

back.addEventListener('click', prev);
forward.addEventListener('click', next);
window.addEventListener('resize', setTransform);

//Обработка события

slider.addEventListener('touchstart', function(e) {  
  clientX = e.touches[0].clientX;
  clientY = e.touches[0].clientY;
}, false);

slider.addEventListener('touchend', function(e) {
  var deltaX, deltaY;
  
  deltaX = e.changedTouches[0].clientX - clientX;
  deltaY = e.changedTouches[0].clientY - clientY;
  var mod = Math.abs(deltaX) - Math.abs(deltaY);

  if (deltaX < 0 && mod > 0) {
    next();
  } else if (deltaX > 0 && mod > 0) {
    prev();
  }   
}, false);