const header = document.getElementsByClassName('header')[0];

document.querySelector('.menu-btn').addEventListener('click', function(e) {
  e.preventDefault();
  header.classList.toggle('header--is-active');
  this.classList.toggle('menu-btn--active');
})

