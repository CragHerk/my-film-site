import { fetchFilms } from './js/fetchFilms.js';
import { displayItems } from './js/displayItems.js';
import { generatePagination } from './js/pagination.js';
import { fetchFilmGenres } from './js/fetchFilmGenres.js';

const searchForm = document.querySelector('.header__form');
let perPage = 20;
let totalResults = 0;

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const query = document.querySelector('.search__film').value;

  const { films, totalResults: fetchedTotalResults } = await fetchFilms(
    query,
    1
  );
  totalResults = fetchedTotalResults;

  const genres = await fetchFilmGenres(); // pobierz gatunki filmów

  displayItems(films, genres); // przekaż gatunki jako argument

  await generatePagination(totalResults, perPage);
});
