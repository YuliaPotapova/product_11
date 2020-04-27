// ==================================== Класс для валидации формы ============================================
export class FormValidator {
  constructor(errorObj) {
    this.errors = errorObj;
  }

  // Метод валидации поля
  checkInputValidity(inputElement) {
    const len = inputElement.value.length;
    const errorElement = document.querySelector(`#error-${inputElement.name}`);
    if (len === 0) {
      errorElement.textContent = this.errors.mandatoryField;
      errorElement.classList.add('popup__input_invalid');
      return false;
    }
    if ((inputElement.name !== 'link') && (inputElement.name !=='avatar') && (len === 1 || len > 30)) {
      errorElement.textContent = this.errors.validationLenght;
      errorElement.classList.add('popup__input_invalid');
      return false;

    }
    if (((inputElement.name === 'link') || (inputElement.name ==='avatar')) && (inputElement.validity.typeMismatch)) {
      errorElement.textContent = this.errors.mustBeLink;
      errorElement.classList.add('popup__input_invalid');
      return false;
    }
    errorElement.classList.remove('popup__input_invalid');
    return true;
  }

  // Метод валидации формы
  checkFormValidity(form) {
    const inputs = Array.from(form.querySelectorAll('.popup__input'));
    let isValid = true;
    inputs.forEach(elem => {
      if (!this.checkInputValidity(elem)) isValid = false;
    })
    return isValid;
  }

  // Метод экранирования данных, вводимых пользователем (для insertAdjacentHTML)
  escapeHtml(string) {
    const entityMap = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
      '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
    };
    return String(string).replace(/[&<>"'`=/]/g, (s) => entityMap[s]);
  }


  // Метод, меняющий состояние кнопки сабмита
  setSubmitButtonState(form) {
    const formValid = this.checkFormValidity(form);
    const btn = form.querySelector('.popup__button');
    const btnClassArr = Array.from(btn.classList);
    if (formValid && !btnClassArr.includes('popup__button_is-activ')) {
      btn.classList.add('popup__button_is-activ');
    } else if (!formValid && btnClassArr.includes('popup__button_is-activ')) {
      btn.classList.remove('popup__button_is-activ');
    }
  }

  // Метод добавления обработчиков
  setEventListeners(popup) {
    const popupClose = popup.popupElement.querySelector('.popup__close');
    popupClose.addEventListener('click', popup.close.bind(popup));
    if (popup.id !== 'popup-img') {
      const form = popup.popupElement.querySelector('.popup__form');
      form.addEventListener('input', (e) => { e.preventDefault(); this.setSubmitButtonState(form); });
      form.addEventListener('submit', (e) => { e.preventDefault(); popup.submit.call(popup); });
    }
  }
}
