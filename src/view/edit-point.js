import dayjs from 'dayjs';
import {DEFAULT_POINT} from '../const';
import {capitalizeFirstLetter, compareObjects} from '../utils/common';
import Smart from '../view/smart';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createEditEventTypesTemplate = (types, currentType) => {
  return types.map((type) => `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
      value="${type}" ${currentType === type ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
    </div>
  `).join(``);
};

const isOfferApplied = (appliedOffers, offer) => {
  return appliedOffers.some((appliedOffer) => compareObjects(appliedOffer, offer));
};

const createOffersTemplate = (allOffers, appliedOffers) => {
  return `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${allOffers.map((offer, index) => {
    const {name, price} = offer;
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}-${name}" type="checkbox" name="event-offer-${name}"
      ${isOfferApplied(appliedOffers, offer) ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${index}-${name}">
        <span class="event__offer-title">${name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
      </div>`;
  }).join(``)}
    </div>
  </section>`;
};

const createDestinationInfoTemplate = (info) => {
  const {description, pictures} = info;
  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map(({src, description: alt}) => `<img class="event__photo" src="${src}" alt="${alt}">`).join(``)}
      </div>
    </div>
  </section>
  `;
};

const createEditPointTemplate = (offersToTypes, infoToDestinations, info, point, isNewPointMode) => {
  const {type, destination, date: {start, end}, cost, offers} = point;
  const availableOffers = offersToTypes[type];
  const availableDestinations = Object.keys(infoToDestinations);
  const allTypes = Object.keys(offersToTypes);
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEditEventTypesTemplate(allTypes, type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${availableDestinations.map((availableDestination) => `<option value="${availableDestination}"></option>`).join(``)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${start ? dayjs(start).format(`DD/MM/YY HH:mm`) : `19/03/19 00:00`}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${end ? dayjs(end).format(`DD/MM/YY HH:mm`) : `19/03/19 00:00`}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${isNewPointMode ? `Cancel` : `Delete`}</button>
          ${!isNewPointMode ? `<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>` : ``}
        </header>
        <section class="event__details">
            ${availableOffers ? createOffersTemplate(availableOffers, offers) : ``}
            ${info ? createDestinationInfoTemplate(info) : ``}
        </section>
      </form>
    </li>
  `;
};

export default class EditPoint extends Smart {
  constructor(offersToTypes, infoToDestinations, point = new DEFAULT_POINT(Object.keys(offersToTypes)[0], Object.keys(infoToDestinations)[0], Object.values(offersToTypes)[0])) {
    super();
    this._offersToTypes = offersToTypes;
    this._infoToDestinations = infoToDestinations;
    this._isNewPointMode = point instanceof DEFAULT_POINT;
    this._data = EditPoint.parsePointToData(point);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._typeToggleClickHandler = this._typeToggleClickHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._setInnerHandlers();
    this._startDatePicker = null;
    this._endDatePicker = null;
    this._setDatePickers();
  }

  getTemplate() {
    return createEditPointTemplate(this._offersToTypes, this._infoToDestinations, this._infoToDestinations[this._data.destination], this._data, this._isNewPointMode);
  }

  static parsePointToData(point) {
    return Object.assign({}, point);
  }

  static parseDataToPoint(data) {
    let point = Object.assign({}, data);
    return point;
  }

  _setDatePickers() {
    if (this._startDatePicker) {
      this._startDatePicker.destroy();
      this._startDatePicker = null;
    }
    if (this._endDatePicker) {
      this._endDatePicker.destroy();
      this._endDatePicker = null;
    }
    this._startDatePicker = flatpickr(this.getElement().querySelector(`#event-start-time-1`), {dateFormat: `d/m/y H:i`, enableTime: true, onChange: this._startDateChangeHandler});
    this._endDatePicker = flatpickr(this.getElement().querySelector(`#event-end-time-1`), {dateFormat: `d/m/y H:i`, enableTime: true, onChange: this._endDateChangeHandler});
  }

  _startDateChangeHandler([startDate]) {
    this._updateData({date: Object.assign({}, this._data.date, {start: startDate})});
  }

  _endDateChangeHandler([endDate]) {
    this._updateData({date: Object.assign({}, this._data.date, {end: endDate})});
  }

  removeElement() {
    super.removeElement();
    if (this._startDatePicker) {
      this._startDatePicker.destroy();
      this._startDatePicker = null;
    }
    if (this._endDatePicker) {
      this._endDatePicker.destroy();
      this._endDatePicker = null;
    }
  }

  reset(point) {
    this._updateData(EditPoint.parsePointToData(point));
    this._updateElement();
  }

  _restoreHandlers() {
    this._setInnerHandlers();
    this._setDatePickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseClickHandler(this._callback.closeClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _typeToggleClickHandler({target}) {
    this._updateData({
      type: target.value,
      offers: [],
    });
    this._updateElement();
  }

  _destinationToggleHandler({target}) {
    if (Object.keys(this._infoToDestinations).some((destination) => destination === target.value)) {
      this._updateData({destination: target.value});
      this._updateElement();
      target.setCustomValidity(``);
    } else {
      target.setCustomValidity(`Wrong destination`);
    }
    target.reportValidity();
  }

  _priceChangeHandler({target}) {
    if (isNaN(target.value)) {
      target.setCustomValidity(`Enter the number`);
    } else {
      this._updateData({cost: +target.value});
      target.setCustomValidity(``);
    }
    target.reportValidity();
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-group`).addEventListener(`change`, this._typeToggleClickHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationToggleHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._priceChangeHandler);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditPoint.parseDataToPoint(this._data));
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseDataToPoint(this._data));
  }

  _closeClickHandler() {
    this._callback.closeClick();
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeClickHandler);
  }
}
