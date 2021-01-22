import Abstract from './abstract';
import dayjs from 'dayjs';

const createTripDatesTemplate = ([start, end]) => {
  const getStartDateTemplate = () => dayjs(start).format(`MMM DD`);
  const getEndDateTemplate = () => start.getMonth() === end.getMonth() ? dayjs(end).format(`DD`) : dayjs(end).format(`MMM DD`);
  return `
    <p class="trip-info__dates">${start ? `${getStartDateTemplate()}&nbsp;&mdash;&nbsp;${getEndDateTemplate()}` : `...&nbsp;&mdash;&nbsp;...`}</p>
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
