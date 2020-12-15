import TripInfoView from './view/trip-info';
import TripTitleView from './view/trip-title';
import TripDatesView from './view/trip-dates';
import TripCostView from './view/trip-cost';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import SortView from './view/sort';
import EventsListView from './view/events-list';
import NoPointsMessage from './view/no-points-message';
import PointPresenter from './presenter/point';
import {generatePoint} from './mock/point';
import {generateOffersToTypes} from './mock/offers-to-types';
import {generateInfoToDestinations} from './mock/info-to-destinations';
import {render} from './utils/render';
import {RenderPositions} from './const';

const POINTS_QUANTITY = 15;

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
  render(tripControlsContainer, new FiltersView());
};

const renderEventsList = (eventsContainer, eventPoints) => {
  render(eventsContainer, new SortView());
  const eventsListComponent = new EventsListView();
  render(eventsContainer, eventsListComponent);

  eventPoints.forEach((eventPoint) => {
    const pointPresenter = new PointPresenter(eventsListComponent, offersToTypes);
    pointPresenter.init(eventPoint, offersToTypes[eventPoint.type], infoToDestinations[eventPoint.destination]);
  });
};


const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

renderTripInfo(tripMainElement);
renderTripControls(tripControlsElement);

if (points.length === 0) {
  render(tripEventsElement, new NoPointsMessage());
} else {
  renderEventsList(tripEventsElement, points);
}
