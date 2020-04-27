import {Popup} from './Popup.js';

export class PopupAvatar extends Popup {
    constructor(popup, validator, form, userInfo, renderLoading, sleep) {
      super(popup, validator);
      this.form = form;
      this.userInfo = userInfo;
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
        this.userInfo.setAvatar(this.form.elements.avatar.value);
        this.renderLoading(this.form.elements.submit, 'Сохранить', 'Загрузка...', true);
        await this.userInfo.sendAvatarToServer();
        //await this.sleep(2000);
        this.userInfo.updateAvatar();
        this.renderLoading(this.form.elements.submit, 'Сохранить', 'Загрузка...', false);
        super.close();
      }
    }
  }