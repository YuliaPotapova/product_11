// =============================== Класс для работы с данными пользователя ===================================
export class UserInfo {
  constructor(nameElementHTML, aboutElementHTML, avatarElementHTML, form, api) {
    this.nameElementHTML = nameElementHTML;
    this.aboutElementHTML = aboutElementHTML;
    this.avatarElementHTML = avatarElementHTML;
    this.form = form;
    this.username = '';
    this.about = '';
    this.avatar = '';
    this.api = api;
  }

  // Обновляет данные внутри экземпляра класса
  setUserInfo(username, about) {
    this.username = username;
    this.about = about;
  }

  // Обновляет аватар внутри экземпляра класса
  setAvatar(avatar) {
    this.avatar = avatar;
  }

  // Отправляет имя пользователя и "о себе" на сервер
  async sendUserInfoToServer() {
    const result = await this.api.sendUserInfo(this.username, this.about);
    this.setUserInfo(result.name, result.about);
  }

  // Отправляет аватар пользователя на сервер
  async sendAvatarToServer() {
    const result = await this.api.sendAvatar(this.avatar);
    this.setAvatar(result.avatar);
  }

  // Отображает имя пользователя и "о себе" на странице
  updateUserInfo() {
    this.nameElementHTML.textContent = this.username;
    this.aboutElementHTML.textContent = this.about;
  }

  // Отображает аватар на странице
  updateAvatar() {
    this.avatarElementHTML.style.backgroundImage = `url(${this.avatar})`;
  }

  // Передаёт данные из разметки в форму
  sendUserInfoToForm() {
    this.form.elements.username.value = this.username;
    this.form.elements.about.value = this.about;
  }  
}