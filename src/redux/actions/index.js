import fetchToken from '../../services/api';
import { saveTokenLocalStorage } from '../../services/token';
import { ADD_LOGIN, GET_TOKEN } from './actionsType';

export const addLogin = (payload) => ({
  type: ADD_LOGIN,
  payload,
});

const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const fetchTokenApi = () => async (dispatch) => {
  const fetchAPI = await fetchToken();
  dispatch(getToken(fetchAPI.token));
  saveTokenLocalStorage(fetchAPI);
};
