import dayjs from "dayjs";

export const sortByDay = (pointA, pointB) => {
  return dayjs(pointA.date.start).diff(dayjs(pointB.date.start));
};

export const sortByTime = (pointA, pointB) => {
  const getDuration = (start, end) => {
    return dayjs(end).diff(dayjs(start));
  };
  return getDuration(pointA.date.end, pointA.date.start) - getDuration(pointB.date.end, pointB.date.start);
};

export const sortByPrice = (pointA, pointB) => {
  return pointB.cost - pointA.cost;
};
