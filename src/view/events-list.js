import Abstract from './abstract';

const createEventsListTemplate = () => {
  return `
    <ul class="trip-events__list"></ul>
  `;
};

export default class EventsListView extends Abstract {
  getTemplate() {
    return createEventsListTemplate();
  }
}
