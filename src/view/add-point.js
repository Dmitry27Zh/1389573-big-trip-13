import EditPointView from './edit-point';

export default class AddPoint extends EditPointView {
  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._closeClickHandler);
  }
}
