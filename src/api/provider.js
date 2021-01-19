import PointsModel from '../model/points';
import {isOnline} from '../utils/common';

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
    if (isOnline()) {
      return this._api.getPoints().then((points) => {
        const formattedPoints = createStoreStructure(points.map(PointsModel.adaptToServer));
        this._store.setItems(formattedPoints);
        console.log(formattedPoints)
        return points;
      });
    }
    const storePoints = Object.values(this._store.getItems());
    console.log(storePoints);
    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
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
}
