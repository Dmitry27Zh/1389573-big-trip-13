import Abstract from './abstract';
import {capitalizeFirstLetter} from '../utils/common';

const createFilterTemplate = (currentFilter, {name, count}) => {
  return `
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${currentFilter === name ? `checked` : ``} ${count === 0 ? `disabled` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${capitalizeFirstLetter(name)}</label>
    </div>
  `;
};

const createFiltersTemplate = (currentFilter, filters) => {
  return `
    <form class="trip-filters" action="#" method="get">
      ${filters.map((filter) => createFilterTemplate(currentFilter, filter)).join(``)}
    </form>
  `;
};

export default class Filters extends Abstract {
  constructor(currentFilter, filters) {
    super();
    this._currentFilter = currentFilter;
    this._filters = filters;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._currentFilter, this._filters);
  }

  _filterChangeHandler(evt) {
    evt.preventDefault();
    this._callback.changeFilter(evt);
  }

  setFilterChangeHandler(callback) {
    this._callback.changeFilter = callback;
    this.getElement().addEventListener(`change`, this._filterChangeHandler);
  }
}
