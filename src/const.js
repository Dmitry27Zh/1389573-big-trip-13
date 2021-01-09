const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const DESTINATIONS = [`Amsterdam`, `Geneva`, `Chamonix`];
const MaxTimeGap = {
  DAYS: 7,
  HOURS: 24,
};
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

const UserAction = {
  UPDATE_POINT: `update point`,
  ADD_POINT: `add point`,
  DELETE_POINT: `delete point`,
};

const UpdateType = {
  PATCH: `patch`,
  MINOR: `minor`,
  MAJOR: `major`,
};

export {TYPES, DESTINATIONS, MaxTimeGap, RenderPositions, Mode, SortType, FilterType, UserAction, UpdateType};
