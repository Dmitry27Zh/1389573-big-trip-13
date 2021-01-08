const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const DESTINATIONS = [`Amsterdam`, `Geneva`, `Chamonix`];
const RenderPositions = {
  AFTERBEGIN: `afterBegin`,
  BEFOREEND: `beforeEnd`,
};

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

const SortType = {
  DAY: `day`,
  TIME: `time`,
  PRICE: `price`,
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export {TYPES, DESTINATIONS, RenderPositions, Mode, SortType, FilterType};
