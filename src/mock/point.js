import dayjs from 'dayjs';
import {TYPES, NAMES} from '../const';
import {getRandomInteger, getRandomItem} from '../utils';

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

const getOfferAndTypePairs = TYPES.map((type) => {
  return [type, generateOffer(type)];
});

const offerToType = Object.fromEntries(getOfferAndTypePairs);

const generateInfo = () => {
  const DESCRIPTION_TEMPLATE = (`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`).split(`. `);
  return {
    description: new Array(getRandomInteger(1, 5)).fill().map(() => getRandomItem(DESCRIPTION_TEMPLATE)).join(`. `),
    src: new Array(getRandomInteger(1, 5)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`),
  };
};

export const generatePoint = () => {
  const startDate = generateDate();
  return {
    type: getRandomItem(TYPES),
    destination: getRandomItem(NAMES),
    date: {
      start: startDate,
      end: generateDate(startDate),
    },
    cost: getRandomInteger(100, 300),
    offers: new Array(getRandomInteger(1, 4)).fill().map(generateOffer),
    info: generateInfo(),
    isFavorite: Boolean(getRandomInteger(1)),
  };
};
