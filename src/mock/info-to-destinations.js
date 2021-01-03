import {getRandomInteger, getRandomItem} from '../utils/common';
import {DESTINATIONS} from '../const';

const generateInfo = (destination) => {
  const DESCRIPTION_TEMPLATE = (`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`).split(`. `);
  return {
    description: `for ${destination} ${new Array(getRandomInteger(1, 5)).fill().map(() => getRandomItem(DESCRIPTION_TEMPLATE)).join(`. `)}`,
    src: new Array(getRandomInteger(1, 5)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`),
  };
};

const generateInfoAndDestinationPairs = DESTINATIONS.map((destination) => {
  return [destination, generateInfo(destination)];
});

export const generateInfoToDestinations = () => Object.fromEntries(generateInfoAndDestinationPairs);
