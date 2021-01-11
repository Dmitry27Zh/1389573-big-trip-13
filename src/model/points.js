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
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = addItem(this._points, update);
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    this._points = deleteItem(this._points, update);
    this._notify(updateType);
  }
}
