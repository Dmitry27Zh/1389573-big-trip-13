import PointsModel from '../model/points';

const createStoreStructure = (items) => {
  return items.reduce((accum, current) => {
    return Object.assign({}, accum, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getDestinations() {
    return this._api.getDestinations();
  }

  getOffers() {
    return this._api.getOffers();
  }

  getPoints() {
    return this._api.getPoints();
    /* if (this._isOnline()) {
      return this._api.getPoints().then((points) => {
        const formattedPoints = createStoreStructure(points.map(PointsModel.adaptToServer));
        this._store.setItems(formattedPoints);
        return points;
      });
    }
    const storePoints = Object.values(this._store.getItems());
    return Promise.resolve(storePoints, PointsModel.adaptToClient); */
  }

  updatePoint(point, infoToDestinations) {
    return this._api(point, infoToDestinations);
  }

  deletePoint(point) {
    return this._api.deletePoint(point);
  }

  sync() {
    return this._api.sync(data);
  }

  _isOnline() {
    return navigator.onLine;
  }
}
