import {Card} from './js/Card.js';
import {CardList} from './js/CardList.js';
import {PopupAdd} from './js/PopupAdd.js';
import {PopupEdit} from './js/PopupEdit.js';
import {PopupAvatar} from './js/PopupAvatar.js';
import {PopupImg} from './js/PopupImg.js';
import {UserInfo} from './js/UserInfo.js';
import {FormValidator} from './js/FormValidator.js';
import {Api} from './js/Api.js';
import {config} from './js/config.js';
import './style.css';

/* Переменные */
const placesContainer = document.querySelector('.places-list');
const addButton = document.querySelector('.user-info__button-add');
const editButton = document.querySelector('.user-info__button-edit');
const avatar = document.querySelector('.user-info__photo');
const errorObj = {
  mandatoryField: 'Это обязательное поле',
  validationLenght: 'Должно быть от 2 до 30 символов',
  mustBeLink: 'Здесь должна быть ссылка'
}


/* Функции */

// Функция создает и возвращает элемент карточки
const cardCreator = (name, link, cardId, likesCount, withDel) => {
  const newCard = new Card(api);
  const cardElement = newCard.create(formValidator.escapeHtml(name), formValidator.escapeHtml(link), cardId, likesCount, withDel);
  newCard.addEventListeners(cardElement);
  return cardElement;
}

// Функция, отображающая процесс загрузки на кнопке
const renderLoading = (ButtonElement, staticButtonText, loadingButtonText, isLoading) => {
  if (isLoading) {
    ButtonElement.textContent = loadingButtonText;
  } else {
    ButtonElement.textContent = staticButtonText;
  }
}

// Функция для создания принудительной задержки выполнения программы
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


/* Создание экземпляров классов */

const api = new Api(config);
const cardList = new CardList(placesContainer, cardCreator, api);
const userInfo = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'), document.querySelector('.user-info__photo'), document.forms.edit, api);
const formValidator = new FormValidator(errorObj);
const popupAdd = new PopupAdd(document.querySelector('#popup-add'), formValidator, document.forms.add, cardList, renderLoading, sleep);
const popupEdit = new PopupEdit(document.querySelector('#popup-edit'), formValidator, document.forms.edit, userInfo, renderLoading, sleep);
const popupAvatar = new PopupAvatar(document.querySelector('#popup-avatar'), formValidator, document.forms.avatar, userInfo, renderLoading, sleep);
const popupImg = new PopupImg(document.querySelector('#popup-img'), formValidator);


/* Слушатели событий */

addButton.addEventListener('click', (e) => { e.preventDefault(); popupAdd.open(); });
editButton.addEventListener('click', (e) => { e.preventDefault(); popupEdit.open(); });
placesContainer.addEventListener('click', (e) => { if (e.target.classList.contains('place-card__image')) popupImg.open(e); });
avatar.addEventListener('click', (e) => { e.preventDefault(); popupAvatar.open(); });

formValidator.setEventListeners(popupAdd);
formValidator.setEventListeners(popupEdit);
formValidator.setEventListeners(popupAvatar);
formValidator.setEventListeners(popupImg);


/* Вызовы функций */

// Загрузка данных профиля с сервера
api.requestGet('profile')
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    userInfo.updateUserInfo();
    userInfo.updateAvatar();
  });

// Загрузка первоначального набора карточек с сервера
api.requestGet('cards')
  .then((initialCards) => {cardList.render(initialCards);});