import Observer from '../utils/observer';

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = null;
  }

  setOffers(offers) {
    this._offers = offers;
    console.log(offers)
  }

  getOffers() {
    return this._offers;
  }

  static adaptToClient(offers) {
    const entries = offers.map((offer) => {
      return [offer.type, offer.offers.map((availableOffer) => {
        const adaptedOffer = Object.assign({}, availableOffer, {name: availableOffer.title});
        delete adaptedOffer.title;
        return adaptedOffer;
      })];
    });
    return Object.fromEntries(entries);
  }
}
