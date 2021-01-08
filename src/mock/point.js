import dayjs from 'dayjs';
import {TYPES, DESTINATIONS, MaxTimeGap} from '../const';
import {getRandomInteger, getRandomItem, getRandomArray} from '../utils/common';
import {nanoid} from 'nanoid';

const generateDate = (date = getRandomInteger(0, 1) ? dayjs().subtract(getRandomInteger(MaxTimeGap.DAYS), `day`) : dayjs()) => {
  const daysGap = getRandomInteger(MaxTimeGap.DAYS);
  const hoursGap = getRandomInteger(MaxTimeGap.HOURS);
  return dayjs(date).add(daysGap, `day`).add(hoursGap, `hour`).toDate();
};

export const generatePoint = (offersToTypes) => {
  const startDate = generateDate();
  const type = getRandomItem(TYPES);
  const destination = getRandomItem(DESTINATIONS);
  return {
    id: nanoid(),
    type,
    destination,
    date: {
      start: startDate,
      end: generateDate(startDate),
    },
    cost: getRandomInteger(100, 300),
    offers: getRandomArray(offersToTypes[type].map((el, index) => index)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
