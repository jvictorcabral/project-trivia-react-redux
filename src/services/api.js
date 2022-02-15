const REQUEST_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  const fetchAPI = await fetch(REQUEST_TOKEN);
  const response = await fetchAPI.json();
  return response;
};

export default fetchToken;
