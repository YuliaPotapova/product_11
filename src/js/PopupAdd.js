// =========================== Расширенный класс для всплывающего окна #popup-add ============================
import {Popup} from './Popup.js';

export class PopupAdd extends Popup {
  constructor(popup, validator, form, cardList, renderLoading) {
    super(popup, validator);
    this.form = form;
    this.cardList = cardList;
    this.renderLoading = renderLoading;
    //this.sleep = sleep;
  }

  open() {
    this.form.reset();
    this.formValidator.setSubmitButtonState(this.form);
    super.open();
  }

  async submit() {
    if (this.formValidator.checkFormValidity(this.form)) {
      const name = this.form.elements.name.value;
      const link = this.form.elements.link.value;
      this.renderLoading(this.form.elements.submit, '+', '···', true);
      await this.cardList.addCard(name, link);
      //await this.sleep(2000);
      this.renderLoading(this.form.elements.submit, '+', '···', false);
      super.close();
    }
  }
}