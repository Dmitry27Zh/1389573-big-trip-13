import Absract from './abstract';

const createMenuTemplate = () => {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>
  `;
};

export default class Menu extends Absract {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
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
    this._activeItem.classList.remove(`trip-tabs__btn--active`);
    selectedMenuItem.classList.add(`trip-tabs__btn--active`);
    this._activeItem = selectedMenuItem;
  }
}
