import PointView from '../view/point';
import EditPointView from '../view/edit-point';
import {render, replaceElements, removeElement} from '../utils/render';

export default class Point {
  constructor(pointContainer, offersToTypes, availableOffers, info, changeData) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;
    this._offersToTypes = offersToTypes;
    this._availableOffers = availableOffers;
    this._info = info;
    this._pointComponent = null;
    this._editPointComponent = null;
    this._handleCloseFormCLick = this._handleCloseFormCLick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;
    const lastPointComponent = this._pointComponent;
    const lastEditPointComponent = this._editPointComponent;
    this._pointComponent = new PointView(point, this._availableOffers);
    this._editPointComponent = new EditPointView(point, this._offersToTypes, this._info);
    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._editPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    if (lastPointComponent === null || lastEditPointComponent === null) {
      render(this._pointContainer, this._pointComponent);
      return;
    }
    if (this._pointContainer.getElement().contains(lastPointComponent.getElement())) {
      replaceElements(this._pointComponent, lastPointComponent);
    }
    if (this._pointContainer.getElement().contains(lastEditPointComponent.getElement())) {
      replaceElements(this._editPointComponent, lastEditPointComponent);
    }
    removeElement(lastPointComponent);
    removeElement(lastEditPointComponent);
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

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._point, {isFavorite: !this._point.isFavorite}));
  }

  destroy() {
    removeElement(this._pointComponent);
    removeElement(this._editPointComponent);
  }
}
