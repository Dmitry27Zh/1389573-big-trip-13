import SortView from '../view/sort';
import EventsListView from '../view/events-list';
import NoPointsMessage from '../view/no-points-message';
import PointPresenter from '../presenter/point';
import {render, removeElement} from '../utils/render';
import {sortByDay, sortByTime, sortByPrice} from '../utils/sort';
import filter from '../utils/filter';
import {RenderPositions} from '../const';
import {SortType, UserAction, UpdateType} from '../const';

export default class Trip {
  constructor(eventsContainer, pointsModel, filtersModel) {
    this._pointsModel = pointsModel;
    this._filtersModel = filtersModel;
    this._eventsContainer = eventsContainer;
    this._sortComponent = null;
    this._eventsListComponent = new EventsListView();
    this._noPointsMessageComponent = null;
    this._currentSortType = SortType.DAY;
    this._pointPresenters = {};
    this._handleUserAction = this._handleUserAction.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortChange = this._handleSortChange.bind(this);
    this._handleViewChange = this._handleViewChange.bind(this);
  }

  init(offersToTypes, infoToDestinations) {
    this._offersToTypes = offersToTypes;
    this._infoToDestinations = infoToDestinations;
    this._pointsModel.addObserver(this._handleViewChange);
    this._filtersModel.addObserver(this._handleViewChange);
    render(this._eventsContainer, this._eventsListComponent);
    this._renderEventsList();
  }

  _getPoints() {
    const currentFilter = this._filtersModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[currentFilter](points);
    return this._sortPoints(filteredPoints);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      removeElement(this._sortComponent);
    }
    this._sortComponent = new SortView();
    render(this._eventsContainer, this._sortComponent, RenderPositions.AFTERBEGIN);
    this._sortComponent.setSortClickHandler(this._handleSortChange);
  }

  _renderPoint(eventPoint) {
    const pointPresenter = new PointPresenter(this._eventsListComponent, this._offersToTypes, this._infoToDestinations, this._handleUserAction, this._handleModeChange);
    pointPresenter.init(eventPoint);
    this._pointPresenters[eventPoint.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => {
      this._renderPoint(point, this._infoToDestinations[point.destination]);
    });
  }

  _renderNoPoint() {
    this._noPointsMessageComponent = new NoPointsMessage();
    render(this._eventsListComponent, this._noPointsMessageComponent);
  }

  _clearPointsList({resetCurrentSort = false} = {}) {
    Object.values(this._pointPresenters).forEach((presenter) => presenter.destroy());
    this._pointPresenters = {};
    if (this._noPointsMessageComponent !== null) {
      removeElement(this._noPointsMessageComponent);
    }
    if (resetCurrentSort) {
      removeElement(this._sortComponent);
      this._currentSortType = SortType.DAY;
    }
  }

  _renderEventsList() {
    const points = this._getPoints();
    if (points.length === 0) {
      this._renderNoPoint();
    } else {
      this._renderSort();
      this._renderPoints(points);
    }
  }

  _sortPoints(points) {
    switch (this._currentSortType) {
      case SortType.PRICE:
        return points.slice().sort(sortByPrice);
      case SortType.TIME:
        return points.slice().sort(sortByTime);
    }
    return points.slice().sort(sortByDay);
  }

  _handleUserAction(userAction, updateType, update) {
    switch (userAction) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleViewChange(updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenters[update.id].init(update);
        break;
      case UpdateType.MINOR:
        this._clearPointsList();
        this._renderPoints(this._getPoints());
        break;
      case UpdateType.MAJOR:
        this._clearPointsList({resetCurrentSort: true});
        this._renderEventsList();
        break;
    }
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
    this._renderPoints(this._getPoints());
  }
}
