import {createElement} from '../utils';

const createTripInfoTemplate = () => {
  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main"></div>
    </section>
  `;
};

export class TripInfoView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate();
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
