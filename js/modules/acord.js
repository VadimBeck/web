function activate(arr,str) {
  for (let i = 0; i < arr.length; i++) {
    var active = arr[0];
    arr[i].onclick = function () {
      if (active && active != arr[i]) {
        active.classList.remove(str);
      } arr[i].classList.toggle(str);
        active = arr[i];
    }
  } 
}
let menuList = document.getElementsByClassName('menu__item');
activate(menuList, 'menu__item--active');

let teamList = document.getElementsByClassName('member');
activate(teamList, 'member--active');

let revList = document.getElementsByClassName('reviews__item');
let pixList = document.getElementsByClassName('reviews__pix-item');

 let count = 0;  
  for (let i = 0; i < pixList.length; i++) {          
    pixList[i].onclick = function () {
      if (i!==count){
        pixList[count].classList.remove('reviews__pix-item--active');
        revList[count].classList.remove('reviews__item--active');
        pixList[i].classList.add('reviews__pix-item--active');
        revList[i].classList.add('reviews__item--active');
        count = i;
      }
  }
}
