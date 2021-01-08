import SortView from '../view/sort';
import EventsListView from '../view/events-list';
import NoPointsMessage from '../view/no-points-message';
import PointPresenter from '../presenter/point';
import {render, removeElement} from '../utils/render';
import {sortByDay, sortByTime, sortByPrice} from '../utils/sort';
import {RenderPositions} from '../const';
import {SortType, FilterType, UserAction, UpdateType} from '../const';
import dayjs from 'dayjs';

export default class Trip {
  constructor(eventsContainer, pointsModel, filtersModel) {
    this._pointsModel = pointsModel;
    this._filtersModel = filtersModel;
    this._eventsContainer = eventsContainer;
    this._sortComponent = null;
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
    this._filtersModel.addObserver(this._handleViewChange);
    render(this._eventsContainer, this._eventsListComponent);
    this._renderEventsList();
  }

  _getPoints() {
    return this._filterPoints(this._sortPoints());
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

  _sortPoints() {
    switch (this._currentSortType) {
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortByPrice);
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortByTime);
    }
    return this._pointsModel.getPoints().slice().sort(sortByDay);
  }

  _filterPoints(points) {
    switch (this._filtersModel.getFilter()) {
      case FilterType.FUTURE:
        return points.filter((point) => dayjs(dayjs(point.date.start)).diff(dayjs()) >= 0);
      case FilterType.PAST:
        return points.filter((point) => dayjs(dayjs(point.date.start)).diff(dayjs()) <= 0);
    }
    return points;
  }

  _handlePointChange(userAction, updateType, updatedPoint) {
    switch (userAction) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoints(updateType, updatedPoint);
        break;
    }
  }

  _handleViewChange(updateType, updatedPoint) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._pointPresenters[updatedPoint.id].init(updatedPoint);
        break;
      case UpdateType.MAJOR:
        this._currentSortType = SortType.DAY;
        this._renderSort();
        this._clearPointsList();
        this._renderPoints();
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
    this._renderPoints();
  }

  _clearPointsList() {
    Object.values(this._pointPresenters).forEach((presenter) => presenter.destroy());
    this._pointPresenters = {};
  }
}
