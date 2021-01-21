import TripInfoView from '../view/trip-info';
import TripTitleView from '../view/trip-title';
import TripDatesView from '../view/trip-dates';
import TripCostView from '../view/trip-cost';
import {RenderPositions} from '../const';
import {render, removeElement} from '../utils/render';
import {sortByDay} from '../utils/sort';
import {getUniqueItems} from '../utils/common';

export default class Info {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._infoComponent = null;
    this._titleComponent = null;
    this._datesComponent = null;
    this._costComponent = null;
    this._handleViewChange = this._handleViewChange.bind(this);
    this._pointsModel.addObserver(this._handleViewChange);
  }

  init() {
    if (this._infoComponent !== null) {
      removeElement(this._infoComponent);
      removeElement(this._titleComponent);
      removeElement(this._datesComponent);
      removeElement(this._costComponent);
    }
    this._infoComponent = new TripInfoView();
    this._titleComponent = new TripTitleView(this._getDestinations());
    this._datesComponent = new TripDatesView(this._getDates());
    this._costComponent = new TripCostView(this._getTotalCost());
    render(this._container, this._infoComponent, RenderPositions.AFTERBEGIN);
    this._innerContainerElement = this._infoComponent.getElement().querySelector(`.trip-info__main`);
    render(this._innerContainerElement, this._titleComponent, RenderPositions.AFTERBEGIN);
    render(this._innerContainerElement, this._datesComponent);
    render(this._infoComponent, this._costComponent);
  }

  _getPoints() {
    return this._pointsModel.getPoints().sort(sortByDay);
  }

  _getTotalCost() {
    return this._getPoints().reduce((totalCost, point) => {
      return totalCost + point.cost + point.offers.reduce((offersCost, offer) => offersCost + offer.price, 0);
    }, 0);
  }

  _getDestinations() {
    const allDestinations = this._getPoints().map(({destination: {name}}) => name);
    return getUniqueItems(allDestinations);
  }

  _getDates() {
    const points = this._getPoints();
    return [points[0].date.start, points[points.length - 1].date.end];
  }

  _handleViewChange() {
    this.init();
  }
}
