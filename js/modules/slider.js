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

  function prev() {
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
    setTransform();
  }

  back.addEventListener('click', prev);
  forward.addEventListener('click', next);
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
      next();
    } else if (deltaX > 0 && mod > 0) {
      prev();
    }   
  }, false);

}());