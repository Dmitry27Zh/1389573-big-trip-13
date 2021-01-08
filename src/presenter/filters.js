import FiltersView from '../view/filters';
import {render} from '../utils/render';

export default class Filters {
  constructor(container, filtersModel) {
    this._container = container;
    this._filtersModel = filtersModel;
    this._handleFilterChange = this._handleFilterChange.bind(this);
  }

  init() {
    this._filtersComponent = new FiltersView(this.getCurrentFilter());
    this._filtersComponent.setFilterChangeHandler(this._handleFilterChange);
    render(this._container, this._filtersComponent);
  }

  getCurrentFilter() {
    return this._filtersModel.getFilter();
  }

  _handleFilterChange(evt) {
    this._filtersModel.setFilter(evt.target.value);
    console.log(this.getCurrentFilter());
  }
}
