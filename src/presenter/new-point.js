import EditPointView from '../view/edit-point';
import {render, removeElement} from '../utils/render';
import {RenderPositions, UserAction, UpdateType} from '../const';
import {nanoid} from 'nanoid';

export default class NewPoint {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;
    this._newPointComponent = null;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(offersToTypes, infoToDestinations) {
    this._newPointComponent = new EditPointView(offersToTypes, infoToDestinations);
    this._newPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    render(this._container, this._newPointComponent, RenderPositions.AFTERBEGIN);
  }

  _handleFormSubmit(addedPoint) {
    this._changeData(UserAction.ADD_POINT, UpdateType.MAJOR, Object.assign({id: nanoid()}, addedPoint));
    this.destroy();
  }

  destroy() {
    if (this._newPointComponent === null) {
      return;
    }
    removeElement(this._newPointComponent);
  }
}
