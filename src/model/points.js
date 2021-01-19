import Observer from '../utils/observer';
import {updateItem, addItem, deleteItem} from '../utils/common';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this.notify(updateType);
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
      },
      offers: point.offers.map((offer) => {
        const adaptedOffer = Object.assign({}, offer, {name: offer.title});
        delete adaptedOffer.title;
        return adaptedOffer;
      })
    });
    delete adaptedPoint.base_price;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign({}, point, {
      "base_price": point.cost,
      "is_favorite": point.isFavorite,
      "date_from": point.date.start.toISOString(),
      "date_to": point.date.end.toISOString(),
      "offers": point.offers.map((offer) => {
        const adaptedOffer = Object.assign({}, offer, {title: offer.name});
        delete adaptedOffer.name;
        return adaptedOffer;
      })
    });
    delete adaptedPoint.cost;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.date;
    return adaptedPoint;
  }
}
