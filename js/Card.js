// ================================== Класс, создающий карточку =============================================
class Card {
  constructor (api) {
    this.api = api;
  }
  // Ставит/убирает лайк (обработчик кликов по сердечку)
  like(event) {
    const likeElement = event.target;
    const cardElement = event.target.closest('.place-card');
    const cardId = cardElement.id;
    const likesCountElement = cardElement.querySelector('.place-card__likes-count')
    const likeClassArr = Array.from(likeElement.classList);
    if (!likeClassArr.includes('place-card__like-icon_liked')) {
      this.api.toggleLike(cardId)
        .then((result) => {
          likesCountElement.textContent = result.likes.length;
          likeElement.classList.add('place-card__like-icon_liked');
        });
    } else {
      this.api.requestDelete('like', cardId)
        .then((result) => {
          likesCountElement.textContent = result.likes.length;
          likeElement.classList.remove('place-card__like-icon_liked');
        });
    }
  }

  // Удаляет карточку (обработчик кликов по корзине)
  remove(event) {
    if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
      this.removeEventListeners();
      const cardElement = event.target.closest('.place-card');
      const cardId = cardElement.id;
      this.api.requestDelete('card', cardId)
        .then(() => cardElement.remove());
    }
  }

  // Создаёт элемент карточки и возвращает его
  create(name, link, cardId, likesCount, withDel) {
    const delElement = withDel ? '<button class="place-card__delete-icon"></button>' : '';
    const tempElement = document.createElement('div');
    const template =
              `<div class="place-card" id="${cardId}">
                 <div class="place-card__image" style="background-image: url(${link})">
                   ${delElement}
                 </div>
                 <div class="place-card__description">
                   <h3 class="place-card__name">${name}</h3>
                   <button class="place-card__like-icon"></button>
                   <span class="place-card__likes-count">${likesCount}</span>
                 </div>
               </div>`
    tempElement.insertAdjacentHTML('beforeend', template);
    this.cardElement = tempElement.firstChild;
    return this.cardElement;
  }

  addEventListeners(cardElement) {
    cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like.bind(this));
    const delElement = cardElement.querySelector('.place-card__delete-icon');
    if (delElement !== null) delElement.addEventListener('click', this.remove.bind(this));
  }

  removeEventListeners () {
    this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.like.bind(this));
    const delElement = this.cardElement.querySelector('.place-card__delete-icon');
    if (delElement !== null) delElement.removeEventListener('click', this.remove.bind(this));
  }
}