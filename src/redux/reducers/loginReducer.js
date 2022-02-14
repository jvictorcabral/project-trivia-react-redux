import { ADD_LOGIN } from '../actions/actionsType';

const INITIAL_STATE = {
  nome: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case ADD_LOGIN:
    return {
      ...state,
      nome: payload.valueName,
      email: payload.valueEmail,
    };
  default:
    return state;
  }
};

export default loginReducer;
