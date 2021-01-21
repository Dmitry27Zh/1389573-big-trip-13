import Abstract from './abstract';
import dayjs from 'dayjs';

const createTripDatesTemplate = ([start, end]) => {
  return `
    <p class="trip-info__dates">${dayjs(start).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${start.getMonth() === end.getMonth() ? dayjs(end).format(`DD`) : dayjs(end).format(`MMM DD`)}</p>
  `;
};

export default class TripDates extends Abstract {
  constructor(dates) {
    super();
    this._dates = dates;
  }
  getTemplate() {
    return createTripDatesTemplate(this._dates);
  }
}
