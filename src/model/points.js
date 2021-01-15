import Observer from '../utils/observer';
import {updateItem, addItem, deleteItem} from '../utils/common';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    this._points = updateItem(this._points, update);
    this.notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = addItem(this._points, update);
    this.notify(updateType, update);
  }

  deletePoint(updateType, update) {
    this._points = deleteItem(this._points, update);
    this.notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign({}, point, {
      cost: point.base_price,
      isFavorite: point.is_favorite,
      date: {
        start: new Date(point.date_from),
        end: new Date(point.date_to),
      }
    });
    delete adaptedPoint.base_price;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    return adaptedPoint;
  }
}
