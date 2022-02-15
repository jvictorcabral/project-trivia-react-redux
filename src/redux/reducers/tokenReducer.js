import { GET_TOKEN } from '../actions/actionsType';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_TOKEN:
    return payload;
  default:
    return state;
  }
};

export default token;
