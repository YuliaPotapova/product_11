// =================================== Класс для всплывающего окна ===========================================
class Popup {
  constructor(popup, validator) {
    this.popupElement = popup;
    this.classList = this.popupElement.classList;
    this.id = popup.id;
    this.formValidator = validator;
  }

  open() {
    this.classList.add('popup_is-opened');
  }

  close() {
    this.classList.remove('popup_is-opened');
  }
}