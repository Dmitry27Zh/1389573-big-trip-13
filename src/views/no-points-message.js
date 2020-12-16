import Abstract from './abstract';

const createNoPointsMessageTemplate = () => {
  return `
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `;
};

export default class NoPointsMessage extends Abstract {
  getTemplate() {
    return createNoPointsMessageTemplate();
  }
}
