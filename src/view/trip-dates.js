import {createElement} from '../utils';

const createTripDatesTemplate = () => {
  return `
    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  `;
};

export class TripDatesView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripDatesTemplate();
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
