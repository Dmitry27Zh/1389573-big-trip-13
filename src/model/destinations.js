import Observer from '../utils/observer';

export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = null;
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  getDestinations() {
    return this._destinations;
  }

  static adaptToClient(destinations) {
    const entries = destinations.map((destination) => {
      return [destination.name, {description: destination.description, pictures: destination.pictures}];
    });
    return Object.fromEntries(entries);
  }
}
