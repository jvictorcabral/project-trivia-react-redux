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
  console.log('token no getToken', token);
  if (token) {
    return token;
  }
  token = getTokenLocalStorage();
  console.log('token no localStorage', token);
  if (token) {
    dispatch(setToken(token));
    return token;
  }
  return null;
};

export const teste = () => {
  // const storeSubs = store.subscribe(() => {
  //   console.log(store.getState());
  // });
  // console.log(store.getState(), store, storeSubs);
};
