import FiltersView from '../view/filters';
import {render} from '../utils/render';

export default class Filters {
  constructor(container, filtersModel) {
    this._container = container;
    this._filtersModel = filtersModel;
  }

  init() {
    this._filtersComponent = new FiltersView(this.getCurrentFilter());
    render(this._container, this._filtersComponent);
  }

  getCurrentFilter() {
    return this._filtersModel.getFilter();
  }
}
