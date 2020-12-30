import SortView from '../view/sort';
import EventsListView from '../view/events-list';
import NoPointsMessage from '../view/no-points-message';
import PointPresenter from '../presenter/point';
import {render} from '../utils/render';
import {updateItem} from '../utils/common';

export default class Trip {
  constructor(eventsContainer) {
    this._eventsContainer = eventsContainer;
    this._sortComponent = new SortView();
    this._eventsListComponent = new EventsListView();
    this._noPointsMessageComponent = new NoPointsMessage();
    this._pointPresenters = {};
    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init(eventPoints, offersToTypes, infoToDestinations) {
    this._eventPoints = eventPoints.slice();
    this._offersToTypes = offersToTypes;
    this._infoToDestinations = infoToDestinations;
    render(this._eventsContainer, this._sortComponent);
    render(this._eventsContainer, this._eventsListComponent);
    if (this._eventPoints.length === 0) {
      this._renderNoPoint();
    } else {
      this._renderPoints();
    }
  }

  _renderPoint(eventPoint, availableOffers, info) {
    const pointPresenter = new PointPresenter(this._eventsListComponent, this._offersToTypes, availableOffers, info, this._handlePointChange);
    pointPresenter.init(eventPoint, availableOffers, info);
    this._pointPresenters[eventPoint.id] = pointPresenter;
  }

  _renderPoints() {
    this._eventPoints.forEach((point) => {
      this._renderPoint(point, this._offersToTypes[point.type], this._infoToDestinations[point.destination]);
    });
  }

  _renderNoPoint() {
    render(this._eventsListComponent, this._noPointsMessageComponent);
  }

  _handlePointChange(updatedPoint) {
    this._eventPoints = updateItem(this._eventPoints, updatedPoint);
    console.log(this._eventPoints, updatedPoint)
    this._pointPresenters[updatedPoint.id].init(updatedPoint);
  }

  _clearPointsList() {
    Object.values(this._pointPresenters).forEach((presenter) => presenter.destroy());
    this._pointPresenters = {};
  }
}
