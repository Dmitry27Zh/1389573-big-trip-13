import Observer from '../utils/observer';
import {updateItem} from '../utils/common';

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

  updatePoints(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._notify(updatedPoint);
  }
}
