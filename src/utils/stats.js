import {getUniqueItems} from './common';
import dayjs from 'dayjs';

const getLabels = (items) => items.sort((first, second) => first.length - second.length);

export const getTypeLabels = (items) => getLabels(getUniqueItems(items.map((point) => point.type.toUpperCase())));

export const getData = (labels, points) => {
  return labels.map((label) => {
    return points.filter((point) => point.type === label.toLowerCase()).reduce((sum, {cost, date: {start, end}}) => Object.assign({}, sum, {
      money: sum.money + cost,
      type: sum.type + 1,
      time: sum.time + dayjs(end).diff(dayjs(start), `d`),
    }), {money: 0, type: 0, time: 0});
  }).reduce((acum, current) => {
    return {
      money: [...acum.money, current.money],
      type: [...acum.type, current.type],
      time: [...acum.time, current.time],
    };
  }, {money: [], type: [], time: []});
};
