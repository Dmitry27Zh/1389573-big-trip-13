import PointsModel from '../model/points';
import {isOnline} from '../utils/common';

const createStoreStructure = (items) => {
  return items.reduce((accum, current) => {
    return Object.assign({}, accum, {
      [current.id]: current,
    });
  }, {});
};

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
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
        return points;
      });
    }
    const storePoints = Object.values(this._store.getItems());
    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    if (isOnline()) {
      return this._api.updatePoint(point).then((updatedPoint) => {
        this._store.updateItem(point.id, updatedPoint);
        return updatedPoint;
      });
    }
    this._store.updateItem(point.id, PointsModel.adaptToServer(Object.assign({}, point)));
    return Promise.resolve(point);
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point).then(() => this._store.removeItem(point.id));
    }
    return Promise.reject(new Error(`Delete task failed`));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());
      return this._api.sync(storePoints).then((response) => {
        const createdPoints = getSyncedPoints(response.created);
        const updatedPoints = getSyncedPoints(response.updated);
        const formattedPoints = createStoreStructure([...createdPoints, ...updatedPoints]);
        this._store.setItems(formattedPoints);
      });
    }
    return Promise.reject(new Error(`Sync data failed`));
  }
}
