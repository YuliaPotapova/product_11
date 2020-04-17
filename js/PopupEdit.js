// ========================== Расширенный класс для всплывающего окна #popup-edit ============================
class PopupEdit extends Popup {
  constructor(popup, validator, form, userInfo, renderLoading, sleep) {
    super(popup, validator);
    this.form = form;
    this.userInfo = userInfo;
    this.renderLoading = renderLoading;
    this.sleep = sleep;
  }

  open() {
    this.userInfo.sendUserInfoToForm();
    this.formValidator.setSubmitButtonState(this.form);
    super.open();
  }

  async submit() {
    if (this.formValidator.checkFormValidity(this.form)) {
      this.userInfo.setUserInfo(this.form.elements.username.value, this.form.elements.about.value);
      this.renderLoading(this.form.elements.submit, 'Сохранить', 'Загрузка...', true);
      await this.userInfo.sendUserInfoToServer();
      //await this.sleep (2000);
      this.userInfo.updateUserInfo();
      this.renderLoading(this.form.elements.submit, 'Сохранить', 'Загрузка...', false);
      super.close();
    }
  }
}