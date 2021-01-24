export const getRandomInteger = (start = 0, end = 1) => {
  const min = Math.ceil(Math.min(end, start));
  const max = Math.floor(Math.max(end, start));
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const updateItem = (items, updatedItem) => {
  const index = items.findIndex((item) => item.id === updatedItem.id);
  return [...items.slice(0, index), updatedItem, ...items.slice(index + 1)];
};

export const addItem = (items, addedItem) => {
  return [addedItem, ...items];
};

export const deleteItem = (items, deletedItem) => {
  const index = items.findIndex((item) => item.id === deletedItem.id);
  return [...items.slice(0, index), ...items.slice(index + 1)];
};

export const getUniqueItems = (items) => Array.from(new Set(items));

export const capitalizeFirstLetter = (word) => {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
};

export const compareObjects = (first, second) => {
  return Object.keys(first).every((key) => first[key] === second[key]);
};

export const isOnline = () => {
  return window.navigator.onLine;
};
