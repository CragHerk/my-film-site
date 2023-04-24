import { fetchFilms } from './js/fetchFilms.js';
import { displayItems } from './js/displayItems.js';
import { generatePagination } from './js/pagination.js';

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
  displayItems(films);
  await generatePagination(totalResults, perPage);
});
