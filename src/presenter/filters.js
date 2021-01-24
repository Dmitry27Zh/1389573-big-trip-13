import FiltersView from '../view/filters';
import {render, replaceElements, removeElement} from '../utils/render';
import filter from '../utils/filter';
import {UpdateType, FilterType} from '../const';

export default class Filters {
  constructor(container, filtersModel, pointsModel) {
    this._container = container;
    this._filtersComponent = null;
    this._filtersModel = filtersModel;
    this._pointsModel = pointsModel;
    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleViewChange = this._handleViewChange.bind(this);
    this._pointsModel.addObserver(this._handleViewChange);
    this._filtersModel.addObserver(this._handleViewChange);
  }

  init() {
    this._currentFilter = this._filtersModel.getFilter();
    const prevFiltersComponent = this._filtersComponent;
    this._filtersComponent = new FiltersView(this._currentFilter, this._getFilters());
    this._filtersComponent.setFilterChangeHandler(this._handleFilterChange);

    if (prevFiltersComponent === null) {
      render(this._container, this._filtersComponent);
      return;
    }

    replaceElements(this._filtersComponent, prevFiltersComponent);
    removeElement(prevFiltersComponent);
  }

  _getFilters() {
    const points = this._pointsModel.getPoints();
    return Object.values(FilterType).map((type) => ({name: type, count: filter[type](points).length}));
  }

  _handleFilterChange(evt) {
    this._filtersModel.changeFilter(UpdateType.MAJOR, evt.target.value);
  }

  _handleViewChange() {
    this.init();
  }
}
