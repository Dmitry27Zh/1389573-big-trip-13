import {Url} from './const';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers';
import PointsModel from './model/points';

const Method = {
  GET: `GET`,
  PUT: `PUT`,
};

const successHttpStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getDestinations() {
    return this._load({url: Url.DESTINATIONS}).then(Api.toJSON).then(DestinationsModel.adaptToClient);
  }

  getOffers() {
    return this._load({url: Url.OFFERS}).then(Api.toJSON).then(OffersModel.adaptToClient);
  }

  getPoints() {
    return this._load({url: Url.POINTS}).then(Api.toJSON).then((points) => points.map(PointsModel.adaptToClient));
  }

  updatePoint(point, infoToDestinations) {
    return this._load({url: `${Url.POINTS}/${point.id}`, method: Method.PUT, body: JSON.stringify(PointsModel.adaptToServer(point, infoToDestinations)), headers: new Headers({"Content-Type": `application/json`})}).then(Api.toJSON).then(PointsModel.adaptToClient);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers}).then(Api.checkStatus).catch(Api.catchError);
  }

  static toJSON(response) {
    return response.json();
  }

  static checkStatus(response) {
    if (response.status < successHttpStatusRange.MIN || response.status > successHttpStatusRange.MAX) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  }

  static catchError(err) {
    throw err;
  }
}
