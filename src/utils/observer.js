export default class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter((existedObserver) => existedObserver !== observer);
  }

  notify(updateType, updatedPoint) {
    this._observers.forEach((observer) => observer(updateType, updatedPoint));
  }
}
