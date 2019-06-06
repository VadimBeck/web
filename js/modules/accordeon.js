(function(){

  function widthCalc() {
    let width = document.documentElement.clientWidth;
    let links = document.querySelectorAll('.menu__block');
    let linkWidth = parseFloat(getComputedStyle(links[0]).width);

    let reqWidth = width - linkWidth * links.length;
    return reqWidth > 550 ? 550 : reqWidth;
  }
  
  function activateTeam() {
    let team = document.querySelector('.team__list');   
    team.addEventListener('click', function(e){
        e.preventDefault();
        if(e.target.classList.contains('member__link')){
        let link = e.target;

        let active = team.querySelector('.member.is-active');

        if(active) {
          let activeText = active.querySelector('.member__text');          
          activeText.style.height = '0px';
          active.classList.remove('is-active');
        }
        if(!active || active.querySelector('.member__link') != link) {
          let current  = link.closest('.member');
          current.classList.add('is-active');

          let currentText = current.querySelector('.member__text');
          currentText.style.height = currentText.scrollHeight + 'px';
        }
      }
    })    
  }
  activateTeam()

  function activateMenu() {
    let links = document.querySelectorAll('.menu__block');
    let body = document.querySelector('body');  
    links.forEach(function(elem){
      elem.addEventListener('click', function(e){
        e.preventDefault();
        let link = this;        
        let active = document.querySelector('.menu__item.is-active');

        if(active) {
          let activeText = active.querySelector('.menu__desc');          
          activeText.style.width = '0px';
          active.classList.remove('is-active');
        }

        if(!active || active.querySelector('.menu__block') != link) {
          let current  = link.closest('.menu__item');
          current.classList.add('is-active');

          let currentText = current.querySelector('.menu__desc');
          if (body.offsetWidth > 480) {
          currentText.style.width = widthCalc() + 'px';
          } else {
            currentText.style.width = 'auto';
          }
        }      
      })
    })
  }
  activateMenu();  
}());


  