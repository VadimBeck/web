var d = document;
var list = d.querySelector('.candy-bar__list');
var items = d.getElementsByClassName('candy-bar__item');
var itemCount = d.querySelectorAll('.candy-bar__item').length;
var scroll = d.querySelector('.candy-bar__scroll');
var back = d.querySelector('#back');
var forward = d.querySelector('#forward');
var pos = 0;
var clientX;

//Слайдер

function setTransform() {
  list.style.transform = 'translateX(' + (-pos * scroll.offsetWidth) + 'px)';
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

//Обработка события Swipe

scroll.addEventListener('touchstart', function(e) {  
  clientX = e.touches[0].clientX;  
}, false);

scroll.addEventListener('touchend', function(e) {
  let deltaX;

  deltaX = e.changedTouches[0].clientX - clientX;  

  if (deltaX <0) { next();
  } else { prev();
  }   
}, false);