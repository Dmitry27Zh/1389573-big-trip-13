import {getRandomInteger} from './common';
import {MaxTimeGap} from '../const';
import dayjs from 'dayjs';

export default (date = getRandomInteger(0, 1) ? dayjs().subtract(getRandomInteger(MaxTimeGap.DAYS), `day`) : dayjs()) => {
  const daysGap = getRandomInteger(MaxTimeGap.DAYS);
  const hoursGap = getRandomInteger(MaxTimeGap.HOURS);
  return dayjs(date).add(daysGap, `day`).add(hoursGap, `hour`).toDate();
};
