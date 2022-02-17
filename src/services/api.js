const REQUEST_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = async () => {
  const fetchAPI = await fetch(REQUEST_TOKEN);
  const response = await fetchAPI.json();
  return response;
};

export const fetchQuestions = async (token) => {
  const REQUEST_QUESTION = `https://opentdb.com/api.php?amount=5&token=${token}`;

  const fetchAPI = await fetch(REQUEST_QUESTION);
  const response = await fetchAPI.json();
  return response;
};
