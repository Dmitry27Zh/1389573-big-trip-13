const getRandomInteger = (a = 1, b = 0) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(min + Math.random() * (max - min + 1));
};

const getRandomItem = (array) => {
  return array[getRandomInteger(array.length - 1)];
};

export {getRandomInteger, getRandomItem};
