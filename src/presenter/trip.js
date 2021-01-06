import SortView from '../view/sort';
import EventsListView from '../view/events-list';
import NoPointsMessage from '../view/no-points-message';
import PointPresenter from '../presenter/point';
import {render} from '../utils/render';
import {updateItem} from '../utils/common';
import {sortByDay, sortByTime, sortByPrice} from '../utils/sort';
import {RenderPositions} from '../const';
import {SortType} from '../const';

export default class Trip {
  constructor(eventsContainer, pointModel) {
    this._pointModel = pointModel;
    this._eventsContainer = eventsContainer;
    this._sortComponent = new SortView();
    this._eventsListComponent = new EventsListView();
    this._noPointsMessageComponent = new NoPointsMessage();
    this._currentSortType = SortType.DAY;
    this._pointPresenters = {};
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortChange = this._handleSortChange.bind(this);
  }

  init(offersToTypes, infoToDestinations) {
    this._offersToTypes = offersToTypes;
    this._infoToDestinations = infoToDestinations;
    render(this._eventsContainer, this._eventsListComponent);
    this._renderEventsList();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.PRICE:
        return this._pointModel.getPoints().slice().sort(sortByPrice);
      case SortType.TIME:
        return this._pointModel.getPoints().slice().sort(sortByTime);
    }
    return this._pointModel.getPoints().slice().sort(sortByDay);
  }

  _renderSort() {
    render(this._eventsContainer, this._sortComponent, RenderPositions.AFTERBEGIN);
    this._sortComponent.setSortClickHandler(this._handleSortChange);
  }

  _renderPoint(eventPoint) {
    const pointPresenter = new PointPresenter(this._eventsListComponent, this._offersToTypes, this._infoToDestinations, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(eventPoint);
    this._pointPresenters[eventPoint.id] = pointPresenter;
  }

  _renderPoints() {
    const points = this._getPoints();
    points.forEach((point) => {
      this._renderPoint(point, this._infoToDestinations[point.destination]);
    });
  }

  _renderNoPoint() {
    render(this._eventsListComponent, this._noPointsMessageComponent);
  }

  _renderEventsList() {
    if (this._getPoints().length === 0) {
      this._renderNoPoint();
    } else {
      this._renderSort();
      this._renderPoints();
    }
  }

  _handlePointChange(updatedPoint) {
    this._eventPoints = updateItem(this._eventPoints, updatedPoint);
    this._pointPresenters[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object.values(this._pointPresenters).forEach((presenter) => presenter.resetView());
  }

  _handleSortChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearPointsList();
    this._renderPoints();
  }

  _clearPointsList() {
    Object.values(this._pointPresenters).forEach((presenter) => presenter.destroy());
    this._pointPresenters = {};
  }
}
