import DestinationsModel from './model/destinations';
import OffersModel from './model/offers';
import PointsModel from './model/points';

const Method = {
  GET: `GET`,
  PUT: `PUT`,
};

const successHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getDestinations() {
    return this._load({url: `destinations`}).then(Api.toJSON).then(DestinationsModel.adaptToClient);
  }

  getOffers() {
    return this._load({url: `offers`}).then(Api.toJSON).then(OffersModel.adaptToClient);
  }

  getPoints() {
    return this._load({url: `points`}).then(Api.toJSON).then((points) => points.map(PointsModel.adaptToClient));
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers}).then(Api.checkStatus).catch(Api.catchError);
  }

  static toJSON(response) {
    return response.json();
  }

  static checkStatus(response) {
    if (response.status < successHTTPStatusRange.MIN || response.status > successHTTPStatusRange.MAX) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  }

  static catchError(err) {
    throw err;
  }
}
