import {TripInfoView} from './view/trip-info';
import {TripTitleView} from './view/trip-title';
import {TripDatesView} from './view/trip-dates';
import {TripCostView} from './view/trip-cost';
import {MenuView} from './view/menu';
import {FiltersView} from './view/filters';
import {SortView} from './view/sort';
import {EventsListView} from './view/events-list';
import {PointView} from './view/point';
import {createEditPointTemplate} from './view/edit-point';
import {generatePoint} from './mock/point';
import {generateOffersToTypes} from './mock/point';
import {generateInfoToDestinations} from './mock/point';
import {render} from './utils';
import {RenderPositions} from './const';

const POINTS_QUANTITY = 15;

const offersToTypes = generateOffersToTypes();
const infoToDestinations = generateInfoToDestinations();
const points = new Array(POINTS_QUANTITY).fill().map(() => generatePoint(offersToTypes));


const tripMainElement = document.querySelector(`.trip-main`);

const tripInfoComponent = new TripInfoView();
render(tripMainElement, tripInfoComponent.getElement(), RenderPositions.AFTERBEGIN);

const tripInfoMainElement = tripInfoComponent.getElement().querySelector(`.trip-info__main`);

render(tripInfoMainElement, new TripTitleView().getElement(), RenderPositions.AFTERBEGIN);
render(tripInfoMainElement, new TripDatesView().getElement(), RenderPositions.BEFOREEND);
render(tripInfoComponent.getElement(), new TripCostView().getElement(), RenderPositions.BEFOREEND);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

render(tripControlsElement, new MenuView().getElement(), RenderPositions.AFTERBEGIN);
render(tripControlsElement, new FiltersView().getElement(), RenderPositions.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, new SortView().getElement(), RenderPositions.BEFOREEND);
const eventsListComponent = new EventsListView();
render(tripEventsElement, eventsListComponent.getElement(), RenderPositions.BEFOREEND);

points.forEach((point) => render(eventsListComponent.getElement(), new PointView(point, offersToTypes[point.type]).getElement(), RenderPositions.BEFOREEND));
