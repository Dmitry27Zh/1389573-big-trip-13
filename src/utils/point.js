import dayjs from 'dayjs';

export const isPointPassed = (point) => dayjs().isAfter(dayjs(point.date.start));
