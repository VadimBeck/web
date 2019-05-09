let slides = document.getElementsByClassName('candy-bar__item');
let back = document.getElementById('back');
let forward = document.getElementById('forward');

let i=0;
back.onclick = function() { 
  if (i+1 == slides.length) {
    slides[i].classList.remove('candy-bar__item--active');
    i=0;
  } else {
  slides[i].classList.toggle('candy-bar__item--active');
  i++;
  }  
  slides[i].classList.toggle('candy-bar__item--active');
}

forward.onclick = function() { 
  if (i == 0) {
    slides[i].classList.remove('candy-bar__item--active');
    i=slides.length-1;
  } else {
  slides[i].classList.toggle('candy-bar__item--active');
  i--;
  }  
  slides[i].classList.toggle('candy-bar__item--active');
}


