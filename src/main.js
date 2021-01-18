import InfoPresenter from './presenter/info';
import FiltersPresenter from './presenter/filters';
import TripPresenter from './presenter/trip';
import FiltersModel from './model/filters';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers';
import PointsModel from './model/points';
import TripMenuView from './view/menu';
import {render} from './utils/render';
import {UpdateType, FilterType, Url, AUTHORIZATION} from './const';
import Api from './api';

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();

const api = new Api(Url.END_POINT, AUTHORIZATION);

filtersModel.setFilter(FilterType.EVERYTHING);

const infoPresenter = new InfoPresenter(tripMainElement, pointsModel);
infoPresenter.init();

render(tripControlsElement, new TripMenuView());

const filtersPresenter = new FiltersPresenter(tripControlsElement, filtersModel);
filtersPresenter.init();

const tripPresenter = new TripPresenter(tripEventsElement, destinationsModel, offersModel, pointsModel, filtersModel, api);
tripPresenter.init();

Promise.all([api.getDestinations(), api.getOffers(), api.getPoints()]).then(([infoToDestinations, offersToTypes, points]) => {

  destinationsModel.setDestinations(infoToDestinations);
  offersModel.setOffers(offersToTypes);
  pointsModel.setPoints(UpdateType.INIT, points);
}).catch(() => {
  pointsModel.setPoints(UpdateType.INIT, []);
});

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripPresenter.createNewPoint();
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`);
});
