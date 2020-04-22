// =========================== Расширенный класс для всплывающего окна #popup-img ============================
import {Popup} from './Popup.js';

export class PopupImg extends Popup {
  open(e) {
    const bgImg = e.target.style.backgroundImage;
    const imgUrl = bgImg.substring(5, bgImg.length - 2);
    this.popupElement.querySelector('.popup__img').src = imgUrl;
    super.open();
  }
}