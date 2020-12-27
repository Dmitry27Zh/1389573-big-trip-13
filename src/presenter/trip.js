import SortView from '../view/sort';
import EventsListView from '../view/events-list';
import NoPointsMessage from '../view/no-points-message';
import PointPresenter from '../presenter/point';
import {render} from '../utils/render';

export default class Trip {
  constructor(eventsContainer, eventPoints, offersToTypes, infoToDestinations) {
    this._eventsContainer = eventsContainer;
    this._eventPoints = eventPoints;
    this._offersToTypes = offersToTypes;
    this._infoToDestinations = infoToDestinations;
    this._sortComponent = null;
    this._eventsListComponent = null;
    this._noPointsMessageComponent = new NoPointsMessage();
  }

  init() {
    this._sortComponent = new SortView();
    this._eventsListComponent = new EventsListView();
    render(this._eventsContainer, this._sortComponent);
    render(this._eventsContainer, this._eventsListComponent);
    if (this._eventPoints.length === 0) {
      this._renderNoPoint();
    } else {
      this._renderPoints();
    }
  }

  _renderPoint(eventPoint, availableOffers, info) {
    const pointPresenter = new PointPresenter(this._eventsListComponent, this._offersToTypes);
    pointPresenter.init(eventPoint, availableOffers, info);
  }

  _renderPoints() {
    this._eventPoints.forEach((point) => {
      this._renderPoint(point, this._offersToTypes[point.type], this._infoToDestinations[point.destination]);
    });
  }

  _renderNoPoint() {
    render(this._eventsListComponent, this._noPointsMessageComponent);
  }
}
