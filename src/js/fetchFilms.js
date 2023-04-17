export const API_KEY = '9c2047c90d98ec66c1e34a0e397d29c4';

import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFilms(query) {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });

  const { data } = response;
  const films = data.results;

  return films;
}

export { fetchFilms };
