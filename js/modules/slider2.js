(function(){
  const list = document.querySelector('.reviews__list');
  const items = document.querySelectorAll('.reviews__pix-item');
  let active = 0;

  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function() {
      list.style.left = -(i*100)+'%';
      items[i].classList.toggle('is-active');
      items[active].classList.toggle('is-active');
      active = i;
    })    
  }

}());