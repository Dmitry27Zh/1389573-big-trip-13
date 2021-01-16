import dayjs from 'dayjs';
import Abstract from './abstract';

const createOfferTemplate = ({name, price}) => {
  return `
    <li class="event__offer">
      <span class="event__offer-title">${name}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
  `;
};

const createTimeTemplate = (start, end) => {
  const diff = dayjs(end).diff(dayjs(start), `m`);
  const getDuration = () => {
    const days = Math.trunc(diff / (60 * 24));
    const hours = days ? (diff % (60 * 24)) / 60 : Math.trunc(diff / 60);
    const minutes = hours ? diff % 60 : diff % (60 * 24);
    const formatNumber = (number) => {
      return number < 10 ? `0${number}` : number;
    };
    return `${days ? `${formatNumber(days)}D` : ``} ${!days && !hours ? `` : `${formatNumber(hours)}H`} ${formatNumber(minutes)}M`;
  };

  return `
    <p class="event__time">
      <time class="event__start-time" datetime="${dayjs(start).format(`YYYY-MM-DDTHH:mm`)}">${dayjs(start).format(`HH:mm`)}</time>
      &mdash;
      <time class="event__end-time" datetime="${dayjs(end).format(`YYYY-MM-DDTHH:mm`)}">${dayjs(end).format(`HH:mm`)}</time>
    </p>
    <p class="event__duration">${getDuration()}</p>
  `;
};

const createPointTemplate = (point) => {
  const {type, destination, date: {start, end}, cost, offers, isFavorite} = point;
  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dayjs(start).format(`YYYY-MM-DD`)}">${dayjs(start).format(`MMMD`)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          ${createTimeTemplate(start, end)}
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${cost}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
            ${offers.map((offer) => createOfferTemplate(offer)).join(``)}
        </ul>
        <button class="event__favorite-btn ${isFavorite ? `event__favorite-btn--active` : ``}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export default class Point extends Abstract {
  constructor(point) {
    super();
    this._point = point;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
