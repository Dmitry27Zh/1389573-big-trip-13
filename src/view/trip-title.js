import {createElement} from '../utils';

const createTripTitleTemplate = () => {
  return `
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
  `;
};

export class TripTitleView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripTitleTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
