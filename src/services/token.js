import store from '../redux/store';
import { setToken } from '../redux/actions';

const CHAVE = 'token';

export const saveTokenLocalStorage = (token) => localStorage
  .setItem(CHAVE, token);

export const getTokenLocalStorage = () => {
  const token = localStorage.getItem(CHAVE);
  if (token === null) return '';
  return token;
};

export const getToken = () => {
  const { getState, dispatch } = store;
  let { token } = getState();
  if (token) {
    return token;
  }
  token = getTokenLocalStorage();
  if (token) {
    dispatch(setToken(token));
    return token;
  }
  return null;
};
