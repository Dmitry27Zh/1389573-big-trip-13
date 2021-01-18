import SortView from '../view/sort';
import EventsListView from '../view/events-list';
import NoPointsMessage from '../view/no-points-message';
import LoadingView from '../view/loading';
import PointPresenter from '../presenter/point';
import NewPointPresenter from '../presenter/new-point';
import {render, removeElement} from '../utils/render';
import {sortByDay, sortByTime, sortByPrice} from '../utils/sort';
import filter from '../utils/filter';
import {RenderPositions, SortType, FilterType, UserAction, UpdateType} from '../const';

export default class Trip {
  constructor(eventsContainer, destinationsModel, offersModel, pointsModel, filtersModel, api) {
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._pointsModel = pointsModel;
    this._filtersModel = filtersModel;
    this._api = api;
    this._eventsContainer = eventsContainer;
    this._sortComponent = null;
    this._eventsListComponent = new EventsListView();
    this._noPointsMessageComponent = null;
    this._loadingComponent = new LoadingView();
    this._isLoading = true;
    this._currentSortType = SortType.DAY;
    this._pointPresenters = {};
    this._handleUserAction = this._handleUserAction.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortChange = this._handleSortChange.bind(this);
    this._handleViewChange = this._handleViewChange.bind(this);
    this._newPointPresenter = new NewPointPresenter(this._eventsListComponent, this._handleUserAction);
  }

  init() {
    this._pointsModel.addObserver(this._handleViewChange);
    this._filtersModel.addObserver(this._handleViewChange);
    render(this._eventsContainer, this._eventsListComponent);
    this._renderEventsList();
  }

  _getOffersToType() {
    this._offersToTypes = this._offersModel.getOffers();
  }

  _getInfoToDestinations() {
    this._infoToDestinations = this._destinationsModel.getDestinations();
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
    const pointPresenter = new PointPresenter(this._eventsListComponent, this._handleUserAction, this._handleModeChange);
    pointPresenter.init(eventPoint, this._offersToTypes, this._infoToDestinations);
    this._pointPresenters[eventPoint.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => {
      this._renderPoint(point);
    });
  }

  _renderLoading() {
    render(this._eventsContainer, this._loadingComponent);
  }

  _renderNoPoint() {
    this._noPointsMessageComponent = new NoPointsMessage();
    render(this._eventsListComponent, this._noPointsMessageComponent);
  }

  createNewPoint() {
    this._currentSortType = SortType.DAY;
    this._filtersModel.changeFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newPointPresenter.init(this._offersToTypes, this._infoToDestinations);
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
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
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
        this._api.updatePoint(update, this._infoToDestinations).then((response) => this._pointsModel.updatePoint(updateType, response));
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
    }
  }

  _handleViewChange(updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenters[update.id].init(update, this._offersToTypes, this._infoToDestinations);
        break;
      case UpdateType.MINOR:
        this._clearPointsList();
        this._renderEventsList();
        break;
      case UpdateType.MAJOR:
        this._clearPointsList({resetCurrentSort: true});
        this._renderEventsList();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        removeElement(this._loadingComponent);
        this._getInfoToDestinations();
        this._getOffersToType();
        this._renderEventsList();
        break;
    }
  }

  _handleModeChange() {
    this._newPointPresenter.destroy();
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
