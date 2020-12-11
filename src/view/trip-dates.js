import Abstract from './abstract';

const createTripDatesTemplate = () => {
  return `
    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  `;
};

export default class TripDates extends Abstract {
  getTemplate() {
    return createTripDatesTemplate();
  }
}
