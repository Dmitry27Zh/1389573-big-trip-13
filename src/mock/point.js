import dayjs from 'dayjs';
import {TYPES, DESTINATIONS} from '../const';
import {getRandomInteger, getRandomItem, getRandomArray} from '../utils';

const generateDate = (date = dayjs()) => {
  const maxHoursGap = 24;
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(maxDaysGap);
  const hoursGap = getRandomInteger(maxHoursGap);
  return dayjs(date).add(daysGap, `day`).add(hoursGap, `hour`).toDate();
};

const generateOffer = (type = `loaded`) => {
  return {
    name: `AnotherOptionFor${type}`,
    price: getRandomInteger(5, 30),
  };
};

const generateOfferAndTypePairs = TYPES.map((type) => {
  return [type, new Array(getRandomInteger(4, 6)).fill().map(() => generateOffer(type))];
});

const generateOffersToTypes = () => Object.fromEntries(generateOfferAndTypePairs);

const generateInfo = () => {
  const DESCRIPTION_TEMPLATE = (`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`).split(`. `);
  return {
    description: new Array(getRandomInteger(1, 5)).fill().map(() => getRandomItem(DESCRIPTION_TEMPLATE)).join(`. `),
    src: new Array(getRandomInteger(1, 5)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`),
  };
};

const generateInfoAndDestinationPairs = DESTINATIONS.map((destination) => {
  return [destination, generateInfo()];
});

const generateInfoToDestinations = () => Object.fromEntries(generateInfoAndDestinationPairs);

const generatePoint = (offersToTypes) => {
  const startDate = generateDate();
  const type = getRandomItem(TYPES);
  const destination = getRandomItem(DESTINATIONS);
  return {
    type,
    destination,
    date: {
      start: startDate,
      end: generateDate(startDate),
    },
    cost: getRandomInteger(100, 300),
    offers: getRandomArray(offersToTypes[type].map((el, index) => index)),
    isFavorite: Boolean(getRandomInteger(1)),
  };
};

export {generatePoint, generateOffersToTypes, generateInfoToDestinations};
