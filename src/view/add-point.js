import EditPointView from './edit-point';

export default class AddPoint extends EditPointView {
  _restoreHandlers() {
    this._setInnerHandlers();
    this._setDatePickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseClickHandler(this._callback.closeClick);
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._closeClickHandler);
  }
}
