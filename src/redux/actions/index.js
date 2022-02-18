import { fetchToken } from '../../services/api';
import { saveTokenLocalStorage } from '../../services/token';
import { ADD_LOGIN, ADD_RANKING, SET_TOKEN, SET_URL_PICTURE } from './actionsType';

export const addLogin = (payload) => ({
  type: ADD_LOGIN,
  payload,
});

export const setPictureUrl = (payload) => ({
  type: SET_URL_PICTURE,
  payload,
});

export const setScore = (payload) => ({
  type: ADD_RANKING,
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
