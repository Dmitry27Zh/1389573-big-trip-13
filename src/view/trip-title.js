import Abstract from './abstract';

const createTripTitleTemplate = (destinations) => {
  return `
    <h1 class="trip-info__title">${destinations[0]} &mdash; ${destinations.length === 3 ? destinations[2] : `...`} &mdash; ${destinations[destinations.length - 1]}</h1>
  `;
};

export default class TripTitle extends Abstract {
  constructor(destinations) {
    super();
    this._destinations = destinations;
  }
  getTemplate() {
    return createTripTitleTemplate(this._destinations);
  }
}
