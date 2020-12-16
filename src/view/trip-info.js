import Abstract from './abstract';

const createTripInfoTemplate = () => {
  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main"></div>
    </section>
  `;
};

export default class TripInfo extends Abstract {
  getTemplate() {
    return createTripInfoTemplate();
  }
}

