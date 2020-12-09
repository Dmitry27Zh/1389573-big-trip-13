import {RenderPositions} from './const';

export const getRandomInteger = (start = 0, end = 1) => {
  const min = Math.ceil(Math.min(end, start));
  const max = Math.floor(Math.max(end, start));
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const getRandomItem = (collection) => {
  return collection[getRandomInteger(collection.length - 1)];
};

export const getRandomArray = (array) => {
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

export const render = (container, element, place) => {
  switch (place) {
    case RenderPositions.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPositions.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const node = document.createElement(`div`);
  node.innerHTML = template;
  return node.firstElementChild;
};
