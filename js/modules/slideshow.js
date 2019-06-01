(function(){
  const items = document.querySelectorAll('.reviews__item');
  const pix = document.querySelectorAll('.reviews__pix-item');
  let active = 0;

  for (let i = 0; i < items.length; i++) {
    pix[i].addEventListener('click', function(e) {
      e.preventDefault();
      items[i].classList.toggle('is-active');
      pix[i].classList.toggle('is-active');
     
      pix[active].classList.toggle('is-active');
      items[active].classList.toggle('is-active');
      active = i;
    })
  }
}());