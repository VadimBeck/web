const menu = (function() {
  let button = document.querySelector('.menu-btn');
  let header = document.querySelector('.header');
  let body = document.querySelector('body');
  let nav = document.querySelector('.nav__list');
  let act = false;

  function toggleMenu() {
      button.classList.toggle('is-active');
      header.classList.toggle('is-active');
      body.classList.toggle('locked');

      act ? act = false : act = true;
  }

  let addListeners = function() {
        button.addEventListener('click', toggleMenu);

        nav.addEventListener('click', function(e){
          let target = e.target;
          if (target.classList.contains('nav__link') && body.offsetWidth <= 768) {
            toggleMenu();
          }
        });
      }
      document.addEventListener('keydown', function(e){
        if (e.keyCode == 27 && act) {
          toggleMenu();
        }
      })

  return {
    menuOver: addListeners  
  }

}());

menu.menuOver();