const CHAVE = 'token';

export const saveTokenLocalStorage = (token) => localStorage
  .setItem(CHAVE, JSON.stringify(token));

export const getTokenLocalStorage = () => {
  const getToken = localStorage.getItem(CHAVE);
  if (getToken === null) return {};
  return JSON.parse(getToken);
};
