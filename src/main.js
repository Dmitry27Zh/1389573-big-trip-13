import {createTripInfoTemplate} from './view/trip-info';
import {createTripTitleTemplate} from './view/trip-title';
import {createTripDatesTemplate} from './view/trip-dates';
import {createTripCostTemplate} from './view/trip-cost';
import {createMenuTemplate} from './view/menu';
import {createFiltersTemplate} from './view/filters';
import {createSortTemplate} from './view/sort';
import {createEventsListTemplate} from './view/events-list';
import {createPointTemplate} from './view/point';
import {createAddPointTemplate} from './view/add-point';
import {createEditPointTemplate} from './view/edit-point';
import {generatePoint} from './mock/point';

const POINTS_QUANTITY = 3;

const points = generatePoint();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);

render(tripMainElement, createTripInfoTemplate(), `afterBegin`);

const tripInfoELement = tripMainElement.querySelector(`.trip-info`);
const tripInfoMainElement = tripInfoELement.querySelector(`.trip-info__main`);

render(tripInfoMainElement, createTripTitleTemplate(), `afterBegin`);
render(tripInfoMainElement, createTripDatesTemplate(), `beforeEnd`);
render(tripInfoELement, createTripCostTemplate(), `beforeEnd`);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

render(tripControlsElement, createMenuTemplate(), `beforeEnd`);
render(tripControlsElement, createFiltersTemplate(), `beforeEnd`);

const tripEventsElement = document.querySelector(`.trip-events`);

render(tripEventsElement, createSortTemplate(), `beforeEnd`);
render(tripEventsElement, createEventsListTemplate(), `beforeEnd`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

for (let i = 0; i < POINTS_QUANTITY; i++) {
  render(tripEventsListElement, createPointTemplate(), `beforeEnd`);
}

render(tripEventsListElement, createAddPointTemplate(), `afterBegin`);
render(tripEventsListElement, createEditPointTemplate(), `beforeEnd`);
