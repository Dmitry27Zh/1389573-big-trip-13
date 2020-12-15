import Abstract from './abstract';

const createTripTitleTemplate = () => {
  return `
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
  `;
};

export default class TripTitle extends Abstract {
  getTemplate() {
    return createTripTitleTemplate();
  }
}
