import Observer from '../utils/observer';

export default class Filters extends Observer {
  constructor(currentFilter) {
    super();
    this._currentFilter = currentFilter;
  }

  setFilter(newFilter) {
    this._currentFilter = newFilter;
  }

  getFilter() {
    return this._currentFilter;
  }
}
