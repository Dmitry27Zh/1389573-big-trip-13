import TripInfoView from './view/trip-info';
import TripTitleView from './view/trip-title';
import TripDatesView from './view/trip-dates';
import TripCostView from './view/trip-cost';
import MenuView from './view/menu';
import FiltersPresenter from './presenter/filters';
import TripPresenter from './presenter/trip';
import FiltersModel from './model/filters';
import PointsModel from './model/points';
import {generatePoint} from './mock/point';
import {generateOffersToTypes} from './mock/offers-to-types';
import {generateInfoToDestinations} from './mock/info-to-destinations';
import {render} from './utils/render';
import {RenderPositions, FilterType} from './const';

const POINTS_QUANTITY = 25;

const offersToTypes = generateOffersToTypes();
const infoToDestinations = generateInfoToDestinations();
const points = new Array(POINTS_QUANTITY).fill().map(() => generatePoint(offersToTypes));

const renderTripInfo = (tripInfoContainer) => {
  const tripInfoComponent = new TripInfoView();
  render(tripInfoContainer, tripInfoComponent, RenderPositions.AFTERBEGIN);
  const tripInfoMainElement = tripInfoComponent.getElement().querySelector(`.trip-info__main`);
  render(tripInfoMainElement, new TripTitleView(), RenderPositions.AFTERBEGIN);
  render(tripInfoMainElement, new TripDatesView());
  render(tripInfoComponent, new TripCostView());
};

const renderTripControls = (tripControlsContainer) => {
  render(tripControlsContainer, new MenuView(), RenderPositions.AFTERBEGIN);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

renderTripInfo(tripMainElement);
renderTripControls(tripControlsElement);

const filtersModel = new FiltersModel(FilterType.EVERYTHING);

const pointModel = new PointsModel();
pointModel.setPoints(points);

const filtersPresenter = new FiltersPresenter(tripControlsElement, filtersModel);
filtersPresenter.init();

const tripPresenter = new TripPresenter(tripEventsElement, pointModel);
tripPresenter.init(offersToTypes, infoToDestinations);
