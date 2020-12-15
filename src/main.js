import TripInfoView from './views/trip-info';
import TripTitleView from './views/trip-title';
import TripDatesView from './views/trip-dates';
import TripCostView from './views/trip-cost';
import MenuView from './views/menu';
import FiltersView from './views/filters';
import SortView from './views/sort';
import EventsListView from './views/events-list';
import PointView from './views/point';
import EditPointView from './views/edit-point';
import NoPointsMessage from './views/no-points-message';
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

  const escKeydownHandler = (evt) => {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, escKeydownHandler);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener(`keydown`, escKeydownHandler);
    editPointComponent.setCloseClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, escKeydownHandler);
    });
  });

  editPointComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, escKeydownHandler);
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

if (points.length === 0) {
  render(tripEventsElement, new NoPointsMessage());
} else {
  renderEventsList(tripEventsElement, points);
}
