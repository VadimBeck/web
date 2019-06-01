(function() {
    let d = document;
    let list = d.querySelector('.candy-bar__list');
    let itemCount = d.querySelectorAll('.candy-bar__item').length;
    let slider = d.querySelector('.candy-bar__slider');
    let back = d.querySelector('#back');
    let forward = d.querySelector('#forward');
    let pos = 0;
    var clientX, clientY;

//Слайдер

  function setTransform() {
    list.style.transform = 'translateX('+(-pos * slider.offsetWidth)+'px)';
  }

  function prev () {
    if (pos == 0){
     pos = itemCount - 1;
    } else {
      pos--;
    }
    setTransform();
  }
  function next() {
    if (pos == itemCount - 1){
      pos = 0;
    } else { 
      pos++;
    }
    setTransform();
  }

  function throttle(func, ms) {
    var stop = false;
  
    function wrap() {  
      if (stop) {
        return;
      }
  
      func.apply(this, arguments);  
      stop = true;  
      setTimeout(function() {
        stop = false;
      }, ms);
    }  
    return wrap;
  }
  let trottlePrev = throttle(prev, 600);
  let trottleNext = throttle(next, 600);

  back.addEventListener('click', trottlePrev);
  forward.addEventListener('click', trottleNext);
  window.addEventListener('resize', setTransform);

//Обработка события touch

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
      trottlenext();
    } else if (deltaX > 0 && mod > 0) {
      trottlePrev();
    }   
  }, false);

}());