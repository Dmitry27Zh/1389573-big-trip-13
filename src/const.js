import {getRandomArray} from './utils/common';

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
  INIT: `init`,
};

class DEFAULT_POINT {
  constructor(type, destination, allOffers) {
    this.type = type;
    this.destination = destination;
    this.date = {
      start: new Date(`2019-07-10T22:55:56.845Z`),
      end: new Date(`2019-07-11T11:22:13.375Z`),
    };
    this.cost = 222;
    this.offers = getRandomArray(allOffers);
    this.isFavorite = false;
  }
}

const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic skvsakscsndkkdA`;

export {TYPES, DESTINATIONS, MaxTimeGap, RenderPositions, Mode, SortType, FilterType, UserAction, UpdateType, END_POINT, AUTHORIZATION, DEFAULT_POINT};
