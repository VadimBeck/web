(function(){
    function activate(arr,str) {
      for (let i = 0; i < arr.length; i++) {
        var active = arr[0];
        arr[i].onclick = function (e) {
          e.preventDefault();
          if (active && active != arr[i]) {
            active.classList.remove(str);
          } arr[i].classList.toggle(str);
            active = arr[i];
        }
      } 
    }
    let menuList = document.getElementsByClassName('menu__item');
    activate(menuList, 'is-active');

    let teamList = document.getElementsByClassName('member');
    activate(teamList, 'is-active');

}());