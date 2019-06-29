$(function () {
    let slider = $('.candy-bar__slider');
    
  let moveSlide = function(num) {
    let items = slider.find('.candy-bar__item');
    let activeItem = items.filter('.active');
    let reqItem = items.eq(num);
    let reqIndex = reqItem.index();
    let list = slider.find('.candy-bar__list');
    let duration = 500;
    if (reqItem.length) {
      list.animate({
        'left': -reqIndex * 100 +'%'
      }, duration, function() {
        activeItem.removeClass('active');
        reqItem.addClass('active');
      })
    }
  }
  
  $('.scroll-btn').on('click', function(e) {
    e.preventDefault();
    let $this = $(this);
    let items = slider.find('.candy-bar__item');
    let activeItem = items.filter('.active');
    let existedItem;
    let edgeItem;

    if ($this.hasClass('scroll-btn--forward')) {
      existedItem = activeItem.next();
      edgeItem = items.first();     
    } 
    if ($this.hasClass('scroll-btn--back')) {
      existedItem = activeItem.prev();
      edgeItem = items.last();      
    }

    let reqItem = existedItem.length ? existedItem.index() : edgeItem.index();
    moveSlide(reqItem);
    })
})