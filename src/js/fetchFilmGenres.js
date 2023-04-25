import axios from 'axios';

import { API_KEY } from './fetchFilms';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFilmGenres() {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.genres;
}

export { fetchFilmGenres };
