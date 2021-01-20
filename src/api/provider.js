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
    this._isStoreUpdated = false;
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
        this._store.setItem(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
        return updatedPoint;
      });
    }
    this._store.setItem(point.id, PointsModel.adaptToServer(Object.assign({}, point)));
    this._syncNeeded = true;
    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point).then((newPoint) => {
        this._store.setItem(newPoint.id, PointsModel.adaptToServer(newPoint));
        return newPoint;
      });
    }
    return Promise.reject(`Add task failed`);
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point).then(() => this._store.removeItem(point.id));
    }
    return Promise.reject(new Error(`Delete task failed`));
  }

  sync() {
    if (isOnline() && this._syncNeeded) {
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
