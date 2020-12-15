import PointView from '../view/point';
import EditPointView from '../view/edit-point';
import {render, replaceElements} from '../utils/render';

export default class Point {
  constructor(pointContainer, offersToTypes) {
    this._pointContainer = pointContainer;
    this._offersToTypes = offersToTypes;
    this._pointComponent = null;
    this._editPointComponent = null;
    this._handleCloseFormCLick = this._handleCloseFormCLick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
  }

  init(point, availableOffers, info) {
    this._pointComponent = new PointView(point, availableOffers);
    this._editPointComponent = new EditPointView(point, this._offersToTypes, info);
    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._editPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    render(this._pointContainer, this._pointComponent);
  }

  _replacePointToForm() {
    replaceElements(this._editPointComponent, this._pointComponent);
  }

  _replaceFormToPoint() {
    replaceElements(this._pointComponent, this._editPointComponent);
  }

  _escKeydownHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._escKeydownHandler);
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
    document.addEventListener(`keydown`, this._escKeydownHandler);
    this._editPointComponent.setCloseClickHandler(this._handleCloseFormCLick);
  }

  _handleCloseFormCLick() {
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._escKeydownHandler);
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._escKeydownHandler);
  }
}
