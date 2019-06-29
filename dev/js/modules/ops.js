let OnePageScroll = function(){
  const d = document;
  const wrapper = d.querySelector('.wrapper');
  const content = d.querySelector('#content');
  const sections = d.querySelectorAll('.section');
  const menuLinks = d.querySelectorAll('.nav__link');  
  const points = d.querySelectorAll('.listing__item');
  const listing = d.querySelector('.listing');
  let pause = false;
  let clientY;
  const isMobile = /Android|AppleWebKit|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  function moveContent(index) {
    if (!pause) {
      pause = true;
      let pos = index * -100 + '%';
      content.style.top = pos;    

      // смена цвета points
      let currentSection = sections[index];
      if (!currentSection.classList.contains('white')) {
        listing.classList.add('grey');
      } else {
        listing.classList.remove('grey');
      }
    
      let active = d.querySelector('.listing__item.is-active');
      active.classList.remove('is-active');
      points[index].classList.add('is-active');

      setTimeout(function() {         
        pause = false;
      }, 900)
    }   
  }

  function scrollTo(way) {
    let currentIndex = !content.style.top ? 0 : -parseInt(content.style.top)/100;
    if (way == 'up' && currentIndex > 0) {      
      moveContent(currentIndex-1);
    }
    if(way == 'down' && currentIndex < sections.length-1) {
      moveContent(currentIndex+1);
    } 
  }

  wrapper.addEventListener('wheel', function(e) {
    let way = e.deltaY < 0 ? 'up' : 'down';
    scrollTo(way);
  })
  wrapper.addEventListener('touchmove', function(e) {
    e.preventDefault();
  })

  wrapper.addEventListener('touchstart', function(e) {
    if (isMobile) {
      clientY = e.touches[0].clientY;
    }
  }, false);

  wrapper.addEventListener('touchend', function(e) {      
      let deltaY = e.changedTouches[0].clientY - clientY;
      if (Math.abs(deltaY)>50){
        let way = deltaY > 0 ? 'up' : 'down';
        scrollTo(way);
      }
  }, false);

  menuLinks.forEach(function(elem) {    
    elem.addEventListener('click', function(e){
      e.preventDefault();
      let index = this.dataset.index;  
      moveContent(index);
    })      
  })

  listing.addEventListener('click', function(e) {
    let link = e.target;
    if(link.classList.contains('listing__link')) {
      e.preventDefault();      
      let index = link.dataset.index;
      moveContent(index);
    }
  })

  let buttons = d.querySelectorAll('.button-link');
  buttons.forEach(function(elem) {
    elem.addEventListener('click', function(e) {
    e.preventDefault();
    let index = this.dataset.index;
    moveContent(index);
    })
  })

  d.addEventListener('keyup', function(e) {
    let way;
    if (e.keyCode === 38) {
      way = 'up';
    }
    if (e.keyCode === 40) {
      way = 'down';
     }
     scrollTo(way);
  })
}
OnePageScroll();