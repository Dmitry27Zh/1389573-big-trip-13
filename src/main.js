import TripInfoView from './view/trip-info';
import TripTitleView from './view/trip-title';
import TripDatesView from './view/trip-dates';
import TripCostView from './view/trip-cost';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import SortView from './view/sort';
import EventsListView from './view/events-list';
import PointView from './view/point';
import EditPointView from './view/edit-point';
import {generatePoint} from './mock/point';
import {generateOffersToTypes} from './mock/offers-to-types';
import {generateInfoToDestinations} from './mock/info-to-destinations';
import {render, replaceElements} from './utils/render';
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

const renderPoint = (pointsListElement, point, availableOffers, info) => {
  const pointComponent = new PointView(point, availableOffers);
  const editPointComponent = new EditPointView(point, offersToTypes, info);

  const replacePointToForm = () => replaceElements(editPointComponent, pointComponent);

  const replaceFormToPoint = () => replaceElements(pointComponent, editPointComponent);

  pointComponent.setEditClickHandler(replacePointToForm);
  editPointComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
  });
  render(pointsListElement, pointComponent);
};

const renderEventsList = (eventsContainer, eventPoints) => {
  render(eventsContainer, new SortView());
  const eventsListComponent = new EventsListView();
  render(eventsContainer, eventsListComponent);

  eventPoints.forEach((eventPoint) => renderPoint(eventsListComponent.getElement(), eventPoint, offersToTypes[eventPoint.type], infoToDestinations[eventPoint.destination]));
};


const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

renderTripInfo(tripMainElement);
renderTripControls(tripControlsElement);
renderEventsList(tripEventsElement, points);
