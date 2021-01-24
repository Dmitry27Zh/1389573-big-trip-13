import InfoPresenter from './presenter/info';
import FiltersPresenter from './presenter/filters';
import TripPresenter from './presenter/trip';
import FiltersModel from './model/filters';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers';
import PointsModel from './model/points';
import TripMenuView from './view/menu';
import StatsView from './view/stats';
import {render, removeElement} from './utils/render';
import {isOnline} from './utils/common';
import {toast} from './utils/toast/toast';
import {UpdateType, FilterType, Url, AUTHORIZATION, MenuItem} from './const';
import Api from './api/api';
import Store from './api/store';
import Provider from './api/provider';

const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v9`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();

const api = new Api(Url.END_POINT, AUTHORIZATION);

const store = new Store(STORE_NAME, window.localStorage);

const apiWithProvider = new Provider(api, store);

filtersModel.setFilter(FilterType.EVERYTHING);

const infoPresenter = new InfoPresenter(tripMainElement, pointsModel);
infoPresenter.init();

const menuComponent = new TripMenuView();

render(tripControlsElement, menuComponent);

const filtersPresenter = new FiltersPresenter(tripControlsElement, filtersModel, pointsModel);
filtersPresenter.init();

const tripPresenter = new TripPresenter(tripEventsElement, destinationsModel, offersModel, pointsModel, filtersModel, apiWithProvider);
tripPresenter.init();

let statsComponent = null;

const handleMenuClick = (menuItem) => {
  if (menuItem.classList.contains(`trip-tabs__btn--active`)) {
    return;
  }
  menuComponent.setActiveItem(menuItem);
  switch (menuItem.textContent) {
    case MenuItem.TABLE:
      removeElement(statsComponent);
      tripPresenter.init();
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statsComponent = new StatsView(pointsModel.getPoints());
      render(tripEventsElement.parentElement, statsComponent);
      break;
  }
};

menuComponent.setMenuClickHandler(handleMenuClick);

const loadDestinations = () => api.getDestinations().then((destinations) => destinationsModel.setDestinations(destinations)).catch(() => destinationsModel.setDestinations({}));
const loadOffers = () => api.getOffers().then((offers) => offersModel.setOffers(offers)).catch(() => offersModel.setOffers({}));
const loadPoints = () => apiWithProvider.getPoints().then((points) => pointsModel.setPoints(UpdateType.INIT, points)).catch(() => pointsModel.setPoints(UpdateType.INIT, []));

loadDestinations().then(loadOffers).then(loadPoints);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, ({target}) => {
  if (!isOnline()) {
    toast(`You can't create new point offline`);
    return;
  }
  if (statsComponent) {
    removeElement(statsComponent);
    menuComponent.setActiveItem(MenuItem.TABLE);
    tripPresenter.init();
  }
  target.disabled = true;
  tripPresenter.createNewPoint(target);
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
  toast(`Lost connection to server`);
});
