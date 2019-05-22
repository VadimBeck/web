const header = document.querySelector('.header');

document.querySelector('.menu-btn').addEventListener('click', function(e) {
  e.preventDefault();
  header.classList.toggle('is-active');
  this.classList.toggle('is-active');
})