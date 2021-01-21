import Abstract from './abstract';

const createTripTitleTemplate = (destinations) => {
  const getTitleTemplate = () => `${destinations[0]} &mdash; ${destinations.length === 3 ? destinations[2] : `...`} &mdash; ${destinations[destinations.length - 1]}`;
  return `
    <h1 class="trip-info__title">${destinations.length > 1 ? getTitleTemplate() : ``}${destinations.length === 1 ? `${destinations[0]} &mdash; ${destinations[0]}` : ``}${destinations.length === 0 ? `... &mdash; ...` : ``}</h1?`;
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
