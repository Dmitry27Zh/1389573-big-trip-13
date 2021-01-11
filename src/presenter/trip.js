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
  constructor(eventsContainer) {
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

  init(eventPoints, offersToTypes, infoToDestinations) {
    this._eventPoints = eventPoints.slice().sort(sortByDay);
    this._sourcedPoints = this._eventPoints.slice();
    this._offersToTypes = offersToTypes;
    this._infoToDestinations = infoToDestinations;
    render(this._eventsContainer, this._eventsListComponent);
    if (this._eventPoints.length === 0) {
      this._renderNoPoint();
    } else {
      this._renderSort();
      this._renderPoints();
    }
  }

  _renderSort() {
    render(this._eventsContainer, this._sortComponent, RenderPositions.AFTERBEGIN);
    this._sortComponent.setSortClickHandler(this._handleSortChange);
  }

  _renderPoint(eventPoint, availableOffers, info) {
    const pointPresenter = new PointPresenter(this._eventsListComponent, this._offersToTypes, availableOffers, info, this._handlePointChange, this._handleModeChange);
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
    this._pointPresenters[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object.values(this._pointPresenters).forEach((presenter) => presenter.resetView());
  }

  _handleSortChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }
    this._sortPoints(sortType);
    this._currentSortType = sortType;
    this._clearPointsList();
    this._renderPoints();
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._eventPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._eventPoints.sort(sortByPrice);
        break;
      default:
        this._eventPoints = this._sourcedPoints.slice();
    }
  }

  _clearPointsList() {
    Object.values(this._pointPresenters).forEach((presenter) => presenter.destroy());
    this._pointPresenters = {};
  }
}
