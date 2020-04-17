// ============================= Класс для хранения и отрисовки карточек =====================================
class CardList {
  constructor(container, cardCreator, api) {
    this.container = container;
    this.cardCreator = cardCreator;
    this.api = api;
  }

  // Отрисовка карточек при загрузке страницы
  render(cardsArray) {
    for (let i = 0; i < cardsArray.length; i++) {
      let withDel = (cardsArray[i].owner._id === '9d1d4e6a840df7d232afab9f') ? true: false;
      let cardElement = this.cardCreator(cardsArray[i].name, cardsArray[i].link, cardsArray[i]._id, cardsArray[i].likes.length, withDel);
      let isLiked = cardsArray[i].likes.some((item) => item._id === '9d1d4e6a840df7d232afab9f');
      if (isLiked) cardElement.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
      this.container.appendChild(cardElement);
    }
  }

  // Добавляет элемент карточки
  async addCard(name, link) {
    const cardElement = this.cardCreator(name, link, '', 0, true);
    const result = await this.api.sendCard(name, link);
    cardElement.id = result._id;
    this.container.appendChild(cardElement);
  }
}