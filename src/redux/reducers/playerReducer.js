import { ADD_LOGIN, ADD_RANKING, SET_URL_PICTURE } from '../actions/actionsType';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  picture: '',
};

const playerReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case ADD_LOGIN:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
    };
  case ADD_RANKING:
    return {
      ...state,
      assertions: payload.assertions,
      score: payload.scorePlayer,
    };
  case SET_URL_PICTURE:
    return {
      ...state,
      picture: payload,
    };
  default:
    return state;
  }
};

export default playerReducer;
