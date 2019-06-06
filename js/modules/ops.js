let OnePageScroll = function(){
  const d = document;
  const wrapper = d.querySelector('.wrapper');
  const content = d.querySelector('#content');
  const sections = d.querySelectorAll('.section');
  let menuLinks = d.querySelectorAll('.nav__link');  
  let points = d.querySelectorAll('.listing__item');
  let pause = false;
  let clientY;
  
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
      }, 900)
    }   
  }

  function scroll(way) {
    let currentPos = !content.style.top ? 0 : -parseInt(content.style.top, 10)/100;
    if (way == 'up' && currentPos > 0) {      
      moveContent(currentPos-1);
    }
    if(way == 'down' && currentPos < sections.length-1) {
      moveContent(currentPos+1);
    } 
  }

  wrapper.addEventListener('wheel', function(e) {
    let way = e.deltaY < 0 ? 'up' : 'down';
    scroll(way);
  })
  wrapper.addEventListener('touchmove', function(e) {
    e.preventDefault();
  })

  wrapper.addEventListener('touchstart', function(e) {
    if (/Android|AppleWebKit|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      clientY = e.touches[0].clientY;
    }
  }, false);

  wrapper.addEventListener('touchend', function(e) {      
      let deltaY = e.changedTouches[0].clientY - clientY;
      if (Math.abs(deltaY)>50){
        let way = deltaY > 0 ? 'up' : 'down';
        scroll(way);
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

  d.addEventListener('keyup', function(e) {
    let way;
    if (e.keyCode == 38) {
      way = 'up';
    }
    if (e.keyCode == 40) {
      way = 'down';
     }
     scroll(way);
  })
}
OnePageScroll();