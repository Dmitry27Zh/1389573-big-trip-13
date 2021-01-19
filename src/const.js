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

const State = {
  SAVING: `saving`,
  DELETING: `deleting`,
  ABORTING: `aborting`,
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

const DEFAULT_POINT = {
  type: `taxi`,
  destination: {
    description: `Chamonix, is a beautiful city.`,
    name: `Chamonix`,
    pictures: [
      {src: `http://picsum.photos/300/200?r=0.6236451224538337`, description: `Chamonix street market`},
      {src: `http://picsum.photos/300/200?r=0.44702327769855543`, description: `Chamonix zoo`},
      {src: `http://picsum.photos/300/200?r=0.08618063505863716`, description: `Chamonix embankment`},
      {src: `http://picsum.photos/300/200?r=0.9821085408447474`, description: `Chamonix kindergarten`},
      {src: `http://picsum.photos/300/200?r=0.8236975339768073`, description: `Chamonix street market`},
      {src: `http://picsum.photos/300/200?r=0.3302599132705648`, description: `Chamonix zoo`},
    ],
  },
  date: {
    start: new Date(`2019-07-10T22:55:56.845Z`),
    end: new Date(`2019-07-11T11:22:13.375Z`),
  },
  cost: 222,
  offers: [
    {
      name: `Choose meal`,
      price: 180,
    },
    {
      name: `Upgrade to comfort class`,
      price: 50,
    }
  ],
  isFavorite: false,
};

const AUTHORIZATION = `Basic skvaakscsndkskdA`;

const Url = {
  END_POINT: `https://13.ecmascript.pages.academy/big-trip`,
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`,
};

const SHAKE_ANIMATION_TIMEOUT = 600;

export {MaxTimeGap, RenderPositions, Mode, State, SortType, FilterType, UserAction, UpdateType, DEFAULT_POINT, Url, AUTHORIZATION, SHAKE_ANIMATION_TIMEOUT};
