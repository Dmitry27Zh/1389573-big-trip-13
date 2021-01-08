import SortView from '../view/sort';
import EventsListView from '../view/events-list';
import NoPointsMessage from '../view/no-points-message';
import PointPresenter from '../presenter/point';
import {render} from '../utils/render';
import {sortByDay, sortByTime, sortByPrice} from '../utils/sort';
import {RenderPositions} from '../const';
import {SortType} from '../const';

export default class Trip {
  constructor(eventsContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._eventsContainer = eventsContainer;
    this._sortComponent = new SortView();
    this._eventsListComponent = new EventsListView();
    this._noPointsMessageComponent = new NoPointsMessage();
    this._currentSortType = SortType.DAY;
    this._pointPresenters = {};
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortChange = this._handleSortChange.bind(this);
    this._handleViewChange = this._handleViewChange.bind(this);
  }

  init(offersToTypes, infoToDestinations) {
    this._offersToTypes = offersToTypes;
    this._infoToDestinations = infoToDestinations;
    this._pointsModel.addObserver(this._handleViewChange);
    render(this._eventsContainer, this._eventsListComponent);
    this._renderEventsList();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortByPrice);
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortByTime);
    }
    return this._pointsModel.getPoints().slice().sort(sortByDay);
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
    this._pointsModel.updatePoints(updatedPoint);
  }

  _handleViewChange(updatedPoint) {
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
