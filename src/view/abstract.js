import {createElement} from '../utils';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract`);
    }
    this._element = null;
  }
  getTemplate() {
    throw new Error(`Method not implemented`);
  }

  getELement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
