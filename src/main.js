import InfoPresenter from './presenter/info';
import FiltersPresenter from './presenter/filters';
import TripPresenter from './presenter/trip';
import FiltersModel from './model/filters';
import PointsModel from './model/points';
import TripMenuView from './view/menu';
import {generatePoint} from './mock/point';
import {generateOffersToTypes} from './mock/offers-to-types';
import {generateInfoToDestinations} from './mock/info-to-destinations';
import {render} from './utils/render';
import {RenderPositions, FilterType} from './const';

const POINTS_QUANTITY = 25;

const offersToTypes = generateOffersToTypes();
const infoToDestinations = generateInfoToDestinations();
const points = new Array(POINTS_QUANTITY).fill().map(() => generatePoint(offersToTypes));


const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const infoPresenter = new InfoPresenter(tripMainElement, pointsModel);
infoPresenter.init();

const filtersModel = new FiltersModel();
filtersModel.setFilter(FilterType.EVERYTHING);

render(tripControlsElement, new TripMenuView());
const filtersPresenter = new FiltersPresenter(tripControlsElement, filtersModel);
filtersPresenter.init();

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, filtersModel);
tripPresenter.init(offersToTypes, infoToDestinations);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripPresenter.createNewPoint();
});
