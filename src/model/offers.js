import Observer from '../utils/observer';

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = null;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  static adaptToClient(offers) {
    const entries = offers.map((offer) => {
      return [offer.type, offer.offers];
    });
    return Object.fromEntries(entries);
  }
}
