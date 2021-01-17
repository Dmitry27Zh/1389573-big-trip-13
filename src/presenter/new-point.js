import AddPointView from '../view/add-point';
import {render, removeElement} from '../utils/render';
import {RenderPositions, UserAction, UpdateType} from '../const';

export default class NewPoint {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;
    this._newPointComponent = null;
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(offersToTypes, infoToDestinations) {
    if (this._newPointComponent !== null) {
      return;
    }
    this._newPointComponent = new AddPointView(offersToTypes, infoToDestinations);
    document.addEventListener(`keydown`, this._escKeydownHandler);
    this._newPointComponent.setCloseClickHandler(this._handleCloseClick);
    this._newPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    render(this._container, this._newPointComponent, RenderPositions.AFTERBEGIN);
  }

  _escKeydownHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleCloseClick() {
    this.destroy();
  }

  _handleFormSubmit(addedPoint) {
    this._changeData(UserAction.ADD_POINT, UpdateType.MAJOR, addedPoint);
    this.destroy();
  }

  destroy() {
    if (this._newPointComponent === null) {
      return;
    }
    removeElement(this._newPointComponent);
    this._newPointComponent = null;
    document.removeEventListener(`keydown`, this._escKeydownHandler);
  }
}
