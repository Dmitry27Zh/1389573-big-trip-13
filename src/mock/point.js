import dayjs from 'dayjs';

const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeng`, `Restaurant`];
const NAMES = [`Amsterdam`, `Geneva`, `Chamonix`];
const OFFERS = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`];

const getRandomInteger = (a = 1, b = 0) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(min + Math.random() * (max - min + 1));
};

const getRandomItem = (array) => {
  return array[getRandomInteger(array.length - 1)];
};

const generateDate = (date = dayjs()) => {
  const maxHoursGap = 24;
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(maxDaysGap);
  const hoursGap = getRandomInteger(maxHoursGap);
  return dayjs(date).add(daysGap, `day`).add(hoursGap, `hour`).toDate();
};

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
    offers: new Array(getRandomInteger(1, OFFERS.length)).fill().map(() => getRandomItem(OFFERS)),
    info: generateInfo(),
  };
};
