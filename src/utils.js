const getRandomInteger = (a = 1, b = 0) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(min + Math.random() * (max - min + 1));
};

const getRandomItem = (array) => {
  return array[getRandomInteger(array.length - 1)];
};

const getRandomArray = (array) => {
  let currentArray = [...array];
  let temporaryValue = null;
  for (let i = currentArray.length - 1; i >= 0; i--) {
    let randomIndex = getRandomInteger(i);
    temporaryValue = currentArray[i];
    currentArray[i] = currentArray[randomIndex];
    currentArray[randomIndex] = temporaryValue;
  }
  return currentArray.slice(0, getRandomInteger(1, 3));
};

export {getRandomInteger, getRandomItem, getRandomArray};
