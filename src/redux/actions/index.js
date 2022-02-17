import { fetchToken } from '../../services/api';
import { saveTokenLocalStorage } from '../../services/token';
import { ADD_LOGIN, SET_TOKEN } from './actionsType';

export const addLogin = (payload) => ({
  type: ADD_LOGIN,
  payload,
});

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const getNewTokenAndSave = () => async (dispatch) => {
  const { token } = await fetchToken();
  dispatch(setToken(token));
  saveTokenLocalStorage(token);
};
