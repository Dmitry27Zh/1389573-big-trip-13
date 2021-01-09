import {TYPES, DESTINATIONS} from '../const';
import {getRandomInteger, getRandomItem, getRandomArray} from '../utils/common';
import generateDate from '../utils/date';
import {nanoid} from 'nanoid';

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
