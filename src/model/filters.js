import Observer from '../utils/observer';

export default class Filters extends Observer {
  constructor() {
    super();
    this._currentFilter = null;
  }

  setFilter(filter) {
    this._currentFilter = filter;
  }

  getFilter() {
    return this._currentFilter;
  }

  changeFilter(updateType, newFilter) {
    this._currentFilter = newFilter;
    this.notify(updateType);
  }
}
