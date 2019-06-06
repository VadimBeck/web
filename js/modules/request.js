const overlay = (function(){
  let body = document.querySelector('body');
  let modal = document.querySelector('.modal');
  let modalInner = document.querySelector('.modal__inner');  

  let modalText = document.createElement('div');
  modalText.classList.add('modal__text');  

  let openOverlay = function(content, reply) {
    let button = document.createElement('button');
    modalText.textContent = content;
    modalInner.innerHTML = "";
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

const submitForm = function() {  
  let form = document.querySelector('#order-form');
  if (validateForm(form)) {
    
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
}

function validateForm(form) {
  let valid = true;
  if(!validateField(form.elements.name)) {
    valid = false;
  }
  if(!validateField(form.elements.phone)) {
    valid = false;
  }
  if(!validateField(form.elements.textarea)) {
    valid = false;
  }
  return valid;
}
function validateField(field) {
  field.nextElementSibling.textContent = field.validationMessage;
  return field.checkValidity();
}

let orderBtn = document.querySelector('#send');
orderBtn.addEventListener('click', e => {
  e.preventDefault();
  submitForm();
});