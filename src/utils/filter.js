import {FilterType} from '../const';
import {isPointPassed} from '../utils/point';

export default {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => !isPointPassed(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPassed(point)),
};
