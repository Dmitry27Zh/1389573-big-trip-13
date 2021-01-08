import TripInfoView from '../view/trip-info';
import TripTitleView from '../view/trip-title';
import TripDatesView from '../view/trip-dates';
import TripCostView from '../view/trip-cost';
import {RenderPositions} from '../const';
import {render, removeElement} from '../utils/render';

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
    this._titleComponent = new TripTitleView();
    this._datesComponent = new TripDatesView();
    this._costComponent = new TripCostView(this._getTotalCost());
    render(this._container, this._infoComponent, RenderPositions.AFTERBEGIN);
    this._innerContainerElement = this._infoComponent.getElement().querySelector(`.trip-info__main`);
    render(this._innerContainerElement, this._titleComponent, RenderPositions.AFTERBEGIN);
    render(this._innerContainerElement, this._datesComponent);
    render(this._infoComponent, this._costComponent);
  }

  _getTotalCost() {
    return this._pointsModel.getPoints().reduce((totalCost, point) => {
      return totalCost + point.cost;
    }, 0);
  }

  _handleViewChange() {
    this.init();
  }
}
