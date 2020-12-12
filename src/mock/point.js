import dayjs from 'dayjs';
import {TYPES, DESTINATIONS} from '../const';
import {getRandomInteger, getRandomItem, getRandomArray} from '../utils/common';

const generateDate = (date = dayjs()) => {
  const maxHoursGap = 24;
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(maxDaysGap);
  const hoursGap = getRandomInteger(maxHoursGap);
  return dayjs(date).add(daysGap, `day`).add(hoursGap, `hour`).toDate();
};

export const generatePoint = (offersToTypes) => {
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
