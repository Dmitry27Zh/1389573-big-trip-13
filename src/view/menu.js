import Absract from './abstract';
import {MenuItem} from '../const';

const createMenuTemplate = () => {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${Object.values(MenuItem).map((item) => `<a class="trip-tabs__btn  ${item === MenuItem.TABLE ? `trip-tabs__btn--active` : ``}" href="#" data="${item}">${item}</a>`).join(``)}
    </nav>
  `;
};

export default class Menu extends Absract {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._tableItem = this.getElement().querySelector(`[data="${MenuItem.TABLE}"]`);
    this._activeItem = this.getElement().querySelector(`.trip-tabs__btn--active`);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setActiveItem(selectedMenuItem) {
    if (selectedMenuItem === MenuItem.TABLE) {
      if (this._activeItem === this._tableItem) {
        return;
      }
      selectedMenuItem = this._tableItem;
    }
    this._activeItem.classList.remove(`trip-tabs__btn--active`);
    selectedMenuItem.classList.add(`trip-tabs__btn--active`);
    this._activeItem = selectedMenuItem;
  }
}
