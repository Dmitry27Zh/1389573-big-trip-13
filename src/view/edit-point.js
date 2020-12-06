import {TYPES} from '../const';
import dayjs from 'dayjs';

const createEditEventTypesTemplate = (currentType) => {
  return TYPES.map((type) => `
    <div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
      value="${type.toLowerCase()}" ${currentType === type ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>
  `).join(``);
};

const isOfferApplied = (appliedOffers, index) => {
  return appliedOffers.some((appliedOffer) => appliedOffer === index);
};

const createOffersTemplate = (allOffers, appliedOffers) => {
  return `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${allOffers.map(({name, price}, index) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}-${name}" type="checkbox" name="event-offer-${name}"
    ${appliedOffers && isOfferApplied(appliedOffers, index) ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${index}-${name}">
      <span class="event__offer-title">${name}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
    </div>`).join(``)}
    </div>
  </section>
  `;
};

const createDestinationInfoTemplate = (info) => {
  const {description, src} = info;
  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${src.map((source) => `<img class="event__photo" src="${source}" alt="Event photo">`).join(``)}
      </div>
    </div>
  </section>
  `;
};

export const createEditPointTemplate = (offersToTypes, point = {}, info) => {
  const {type = Object.keys(offersToTypes)[0], destination = ``, date = {start: ``, end: ``}, cost = ``, offers = null} = point;
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEditEventTypesTemplate(type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${date.start ? dayjs(date.start).format(`DD/MM/YY HH:mm`) : `19/03/19 00:00`}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${date.end ? dayjs(date.end).format(`DD/MM/YY HH:mm`) : `19/03/19 00:00`}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersToTypes[type] ? createOffersTemplate(offersToTypes[type], offers) : ``}
          ${info ? createDestinationInfoTemplate(info) : ``}
      </form>
    </li>
  `;
};
