import InfoPresenter from './presenter/info';
import FiltersPresenter from './presenter/filters';
import TripPresenter from './presenter/trip';
import FiltersModel from './model/filters';
import DestinationsModel from './model/destinations';
import PointsModel from './model/points';
import TripMenuView from './view/menu';
import {render} from './utils/render';
import {FilterType} from './const';
import Api from './api';

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();
filtersModel.setFilter(FilterType.EVERYTHING);

const destinationsModel = new DestinationsModel();

const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic skvsakscsndkkdA`;
const api = new Api(END_POINT, AUTHORIZATION);
api.getPoints().then((points) => {
  pointsModel.setPoints(points);
});

const infoPresenter = new InfoPresenter(tripMainElement, pointsModel);
infoPresenter.init();

render(tripControlsElement, new TripMenuView());

const filtersPresenter = new FiltersPresenter(tripControlsElement, filtersModel);
filtersPresenter.init();

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, filtersModel);

Promise.all([api.getOffers, api.getDestinations]).then(([offersToTypes, infoToDestinations]) => tripPresenter.init(offersToTypes, infoToDestinations));

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripPresenter.createNewPoint();
});
