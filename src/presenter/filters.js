import FiltersView from '../view/filters';
import {render, replaceElements, removeElement} from '../utils/render';
import {UpdateType} from '../const';

export default class Filters {
  constructor(container, filtersModel) {
    this._container = container;
    this._filtersComponent = null;
    this._filtersModel = filtersModel;
    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleViewChange = this._handleViewChange.bind(this);
    this._filtersModel.addObserver(this._handleViewChange);
  }

  init() {
    this._currentFilter = this._filtersModel.getFilter();
    const prevFiltersComponent = this._filtersComponent;
    this._filtersComponent = new FiltersView(this._currentFilter);
    this._filtersComponent.setFilterChangeHandler(this._handleFilterChange);

    if (prevFiltersComponent === null) {
      render(this._container, this._filtersComponent);
      return;
    }

    replaceElements(this._filtersComponent, prevFiltersComponent);
    removeElement(prevFiltersComponent);
  }

  _handleFilterChange(evt) {
    this._filtersModel.changeFilter(UpdateType.MAJOR, evt.target.value);
  }

  _handleViewChange() {
    this.init();
  }
}
