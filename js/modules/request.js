const overlay = (function(){
  let body = document.querySelector('body');
  let modal = document.querySelector('.modal');
  let modalInner = document.querySelector('.modal__inner');

  let modalText = document.createElement('div');
  modalText.classList.add('modal__text');
  let button = document.createElement('button');

  let openOverlay = function(content, reply) {
    modalText.textContent = content;
    if(reply) {
      button.classList.add('order-button');
      button.textContent = 'Закрыть';
    } else {
      button.classList.add('modal__close');
    }
    modalInner.appendChild(modalText);
    modalInner.appendChild(button);

    modal.classList.add('is-active');
    body.classList.add('locked');

    button.addEventListener('click', (e) => {
      e.preventDefault();
      closeOverlay();
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeOverlay();
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) 
        closeOverlay();
    });
  }

  let closeOverlay = function() {
    modal.classList.remove('is-active');
    body.classList.remove('locked');
  }

  return {
    open: openOverlay,
    close: closeOverlay
  };
}());

const ajaxForm = function(form) {
  let data = new FormData();
    data.append("name", form.elements.name.value);
    data.append("phone", form.elements.phone.value);
    data.append("comment", form.elements.textarea.value);
    data.append("to", "client@mail.ru");
  
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST','https://webdev-api.loftschool.com/sendmail');
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(data);

    return xhr;
}

const submitForm = function(e) {
  e.preventDefault();
  let form = document.querySelector('#order-form');
  let request = ajaxForm(form);  

  request.addEventListener('load', ()=> {
    let reply = false;
    if (request.status >=400) {
      let content = 'Ошибка соединения с сервером, попробуйте позже';
      overlay.open(`${content}. Ошибка ${request.status}`, reply);
    } else if (request.response.status == 0) {
      content = request.response.message;
      overlay.open(content, reply);
    } else {
      content = 'Сообщение отправлено';
      reply = true;
      overlay.open(content, reply);
    }
  })
}

const form = document.querySelector('#order-form');
form.addEventListener('submit', submitForm);