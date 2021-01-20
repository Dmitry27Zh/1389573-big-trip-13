import {getUniqueItems} from './common';

const getLabels = (items) => items.sort((first, second) => first.length - second.length);

export const getTypeLabels = (items) => getLabels(getUniqueItems(items.map((point) => point.type.toUpperCase())));
