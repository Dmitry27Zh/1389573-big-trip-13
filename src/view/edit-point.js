import dayjs from 'dayjs';
import {DEFAULT_POINT} from '../const';
import {capitalizeFirstLetter, compareObjects, addItem} from '../utils/common';
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

const createEditPointTemplate = (offersToTypes, infoToDestinations, point, isNewPointMode) => {
  const {type, destination, date: {start, end}, cost, offers, isDisabled, isSaving, isDeleting} = point;
  const {name: destinationName} = destination;
  const availableOffers = offersToTypes[type];
  const availableDestinations = Object.keys(infoToDestinations);
  const allTypes = Object.keys(offersToTypes);
  const info = infoToDestinations[destinationName];
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled || !allTypes.length ? `disabled` : ``}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEditEventTypesTemplate(allTypes, type, isDisabled)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1" ${isDisabled || !availableDestinations.length ? `disabled` : ``}>
            <datalist id="destination-list-1">
              ${availableDestinations.map((availableDestination) => `<option value="${availableDestination}"></option>`).join(``)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${start ? dayjs(start).format(`DD/MM/YY HH:mm`) : `19/03/19 00:00`}" ${isDisabled ? `disabled` : ``}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${end ? dayjs(end).format(`DD/MM/YY HH:mm`) : `19/03/19 00:00`}" ${isDisabled ? `disabled` : ``}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}" ${isDisabled ? `disabled` : ``}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>${isSaving ? `Saving...` : `Save`}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>${isNewPointMode ? `Cancel` : `Delet${isDeleting ? `ing...` : `e`}`}</button>
          ${!isNewPointMode ? `<button class="event__rollup-btn" type="button" ${isDisabled ? `disabled` : ``}><span class="visually-hidden">Open event</span></button>` : ``}
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
  constructor(offersToTypes, infoToDestinations, point) {
    super();
    this._offersToTypes = offersToTypes;
    this._infoToDestinations = infoToDestinations;
    this._point = point ? point : DEFAULT_POINT;
    this._isNewPointMode = point ? false : true;
    this._data = EditPoint.parsePointToData(this._point);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._typeToggleClickHandler = this._typeToggleClickHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this.resetViewState = this.resetViewState.bind(this);
    this._setInnerHandlers();
    this._startDatePicker = null;
    this._endDatePicker = null;
    this._setDatePickers();
  }

  getTemplate() {
    return createEditPointTemplate(this._offersToTypes, this._infoToDestinations, this._data, this._isNewPointMode);
  }

  static parsePointToData(point) {
    return Object.assign({}, point, {isDisabled: false, isSaving: false, isDeleting: false});
  }

  static parseDataToPoint(data) {
    let point = Object.assign({}, data);
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  }

  resetViewState() {
    this.updateData({isDisabled: false, isSaving: false, isDeleting: false});
    this.updateElement();
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
    this._endDatePicker = flatpickr(this.getElement().querySelector(`#event-end-time-1`), {dateFormat: `d/m/y H:i`, minDate: this._startDatePicker.input.value, enableTime: true, onChange: this._endDateChangeHandler});
  }

  _startDateChangeHandler([startDate]) {
    this._endDatePicker.config.minDate = startDate;
    this.updateData({date: Object.assign({}, this._data.date, {start: startDate, end: startDate})});
  }

  _endDateChangeHandler([endDate]) {
    this.updateData({date: Object.assign({}, this._data.date, {end: endDate})});
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
    this.updateData(EditPoint.parsePointToData(point));
    this.updateElement();
  }

  _restoreHandlers() {
    this._setInnerHandlers();
    this._setDatePickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseClickHandler(this._callback.closeClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _typeToggleClickHandler({target}) {
    this.updateData({
      type: target.value,
      offers: [],
    });
    this.updateElement();
  }

  _destinationToggleHandler({target}) {
    const newDestination = Object.keys(this._infoToDestinations).some((destination) => destination === target.value);
    if (newDestination) {
      this.updateData({destination: Object.assign({}, this._infoToDestinations[target.value], {name: target.value})});
      this.updateElement();
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
      this.updateData({cost: +target.value});
      target.setCustomValidity(``);
    }
    target.reportValidity();
  }

  _offersChangeHandler({target}) {
    const changedOffer = this._offersToTypes[this._data.type].find((offer) => offer.name === target.name.replace(`event-offer-`, ``));
    const isOfferChecked = target.checked;
    if (isOfferChecked) {
      this.updateData({offers: addItem(this._data.offers, changedOffer)});
    } else {
      this.updateData({offers: this._data.offers.filter((offer) => offer.name !== changedOffer.name)});
    }
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-group`).addEventListener(`change`, this._typeToggleClickHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._priceChangeHandler);
    if (Object.keys(this._infoToDestinations).length) {
      this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationToggleHandler);
    }
    if (Object.keys(this._offersToTypes).length) {
      this.getElement().querySelector(`.event__available-offers`).addEventListener(`change`, this._offersChangeHandler);
    }
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
