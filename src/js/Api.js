// ==================================== Класс запросов к серверу =============================================
export class Api {
  constructor (config) {
    this.config = config;
  }
  
  // Загружает первоначальный набор карточек и данные профиля
  requestGet(what) {
    let url;
    if (what === 'profile') url = 'users/me';
    if (what === 'cards') url = 'cards';
    return this._request (url, 'GET');
  }

  // Отправляет имя пользователя и "о себе" на сервер
  sendUserInfo(name, about) {
    const url = 'users/me';
    return this._request (url, 'PATCH', {name, about});
  }

  // Отправляет аватар на сервер
  sendAvatar(avatarLink) {
    const url = 'users/me/avatar';
    return this._request (url, 'PATCH', {avatar: avatarLink});
  }

  // Отправляет карточку на сервер
  sendCard(name, link) {
    const url = 'cards';
    return this._request (url, 'POST', {name, link});
  }

  // Удаляет карточку/убирает лайк
  requestDelete(what, cardId) {
    let url;
    if (what === 'card') url = `cards/${cardId}`;
    if (what === 'like') url = `cards/like/${cardId}`;
    return this._request (url, 'DELETE');
  }
  
  // Ставит/убирает лайк
  toggleLike(cardId) {
    const url = `cards/like/${cardId}`;
    return this._request (url, 'PUT');
  }

  _request (url, method, bodyDataObj) {
    return fetch(this.config.baseUrl + url, {
      method,
      headers: this.config.headers,
      body: bodyDataObj ? JSON.stringify(bodyDataObj) : undefined
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}