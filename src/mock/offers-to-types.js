import {getRandomInteger} from '../utils';
import {TYPES} from '../const';

const generateOffer = (type = `loaded`) => {
  return {
    name: `AnotherOptionFor${type}`,
    price: getRandomInteger(5, 30),
  };
};

const generateOfferAndTypePairs = TYPES.map((type) => {
  return [type, new Array(getRandomInteger(4, 6)).fill().map(() => generateOffer(type))];
});

export const generateOffersToTypes = () => Object.fromEntries(generateOfferAndTypePairs);
