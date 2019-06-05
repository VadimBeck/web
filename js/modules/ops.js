let OnePageScroll = function(){
  const d = document;
  const wrapper = d.querySelector('.wrapper');
  const content = d.querySelector('#content');
  const sections = d.querySelectorAll('.section');
  let menuLinks = d.querySelectorAll('.nav__link');  
  let points = d.querySelectorAll('.listing__item');
  let pause = false;
  
  function moveContent(index) {
    if (!pause) {
      pause = true;
    let pos = index * -100 + '%';
    content.style.top = pos;

    let active = d.querySelector('.listing__item.is-active');
    active.classList.remove('is-active');
    points[index].classList.add('is-active');

      setTimeout(function() {        
        pause = false;
      },700)
    }   
  }

  function scroll(way) {
    let currentPos = (!content.style.top ? 0 : -(parseInt(content.style.top, 10)/100));
    if (way == 'up' && currentPos > 0) {
      currentPos--;
      moveContent(currentPos);
    }
    if(way == 'down' && currentPos < sections.length-1) {
      currentPos++;
      moveContent(currentPos);
    } 
  }

  d.addEventListener('keyup', function(e) {
    let currentPos = (!content.style.top ? 0 : -(parseInt(content.style.top, 10)/100)); 
    if (e.keyCode == 38 && currentPos > 0) {      
      currentPos--;
      moveContent(currentPos);
    }
    if (e.keyCode == 40 && currentPos < sections.length-1) {      
      currentPos++;
      moveContent(currentPos);
     }
  })
  
  wrapper.addEventListener('wheel', function(e) {
    let way = e.deltaY < 0 ? 'up' : 'down';
    scroll(way);
  })
  wrapper.addEventListener('touchmove', function(e) {
    e.preventDefault();
  })

  let clientX;
  let clientY;
  wrapper.addEventListener('touchstart', function(e) {  
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  }, false);

  wrapper.addEventListener('touchend', function(e) {
    let currentPos = (!content.style.top ? 0 : -(parseInt(content.style.top, 10)/100));
    let deltaX = e.changedTouches[0].clientX - clientX;
    let deltaY = e.changedTouches[0].clientY - clientY;
    let mod = Math.abs(deltaY) - Math.abs(deltaX);

    if (mod > 0) {
      if (deltaY > 0 && currentPos > 0) {      
        currentPos--;
        moveContent(currentPos);
      }
      if (deltaY < 0 && currentPos < sections.length-1) {      
        currentPos++;
        moveContent(currentPos);
       }
    }    
  }, false);

  menuLinks.forEach(function(elem) {    
    elem.addEventListener('click', function(e){
      e.preventDefault();
      let index = this.dataset.index;        
      moveContent(index);
    })      
  })

  points.forEach(function(elem) {
    elem.addEventListener('click', function(e){
      e.preventDefault();
      link = e.target;
      let index = link.dataset.index;
      moveContent(index);
    })
  })
  let button = d.querySelector('.intro-button');
  button.addEventListener('click', function(e) {
    e.preventDefault();
    moveContent(7);
  })
}
OnePageScroll();