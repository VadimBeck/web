let slides = document.getElementsByClassName('candy-bar__slide');
let back = document.getElementById('back');
let forward = document.getElementById('forward');

let i=0;
back.onclick = function() { 
  if (i+1 == slides.length) {
    slides[i].classList.remove('is-active');
    i=0;
  } else {
  slides[i].classList.toggle('is-active');
  i++;
  }  
  slides[i].classList.toggle('is-active');
}

forward.onclick = function() { 
  if (i == 0) {
    slides[i].classList.remove('is-active');
    i=slides.length-1;
  } else {
  slides[i].classList.toggle('is-active');
  i--;
  }  
  slides[i].classList.toggle('is-active');
}


