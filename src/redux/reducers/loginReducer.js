import { ADD_LOGIN } from '../actions/actionsType';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const loginReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case ADD_LOGIN:
    return {
      ...state,
      player: {
        name: payload.valueName,
        gravatarEmail: payload.valueEmail,
      },
    };
  default:
    return state;
  }
};

export default loginReducer;
