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





  /** REVIEW Резюме
   *
   *Работа очень хорошая. Выполнены все дополнительные задания.
   Методы класса Api имеют правильную структуру.
   Обработка ответов сервера происходит вне класса Api методами других классов приложения.
   Данные на странице обновляются только после прихода положительного ответа от сервера.
   Использованы async методы ES6.
   *
   *
   * Возможно можно лучше.
   *
   * (+) 1. Мне кажется, метод initUserInfo в классе UserInfo можно не вводить, иначе у Вас получается два метода, которые сохраняют информацию о
   * (+) профиле в свойствах класса this.username, this.about (this.avatar). Только один метод (initUserInfo) занимается этим  при загрузке
   * (+) страницы, а setUserInfo во всех других случаях. Я думаю можно использовать setUserInfo во всех случаях. Для этого ввести у него параметры
   * (+) name, about и avatar и, вызывая setUserInfo при загрузке страницы, передавать в качестве аргументов значения, полученные с сервера по запросу,
   * (+) get, а в остальных случаях (при сабмите формы профиля) при его вызове, он должен получать значения своих аргументов из полей формы, а затем
   * (+) его можно вызывать и в методе sendUserInfoToServer (и даже нужно, чтобы свойства класса всегда обновлялись единственным способом),
   * (+) чтобы в нём он обновил свойства класса значениями полей объекта, который вернул сервер в результате запроса методом PATCH. Таким образом
   * (+) один метод setUserInfo будет всегда поставлять актуальную информацию в свойства класса this.username, this.about, this.avatar.
   *
   *2. Но, зачем мы сохраняем актуальные данные профиля в свойствах класса? Затем, чтобы, когда это будет нужно, куда-нибудь значения этих свойств
   передать. Метод updateUserInfo передаёт их на страницу, а sendUserInfoToForm в поля формы. Может быть из них тоже сделать один метод с параметрами?
   Тогда при сабмите формы профиля в него как аргументы надо будет передавать элементы страницы (прямо их textContent), а при открытии формы профиля -
   свойства value полей формы.

   3. Если пойти дальше, я бы не оборачивала метод api sendUserInfo в асинхронный метод sendUserInfoToServer (вообще бы этот метод не вводила,
    как и метод sendAvatarToServer), а вызывала бы методы api ничем необёрнутые в асинхронном методе submit с инструкцией await.

   4. Если выполнить все 3 предыдущих пункта, класс UserInfo будет соответствовать принципам ООП (принципу независимости от исходных
    данных проекта - его структуры, и принципу единствннной ответственности ) - класс не будет знать откуда он берёт значения
   для своих свойств, куда он их передаёт и будет только этим и заниматься (сохранением и передачей данных пользователя) и не
   будет непосредственно взаимодействовать с сервером.

   Задание принято!
   *
   *
   */