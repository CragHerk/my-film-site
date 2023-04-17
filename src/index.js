import { fetchFilms } from './js/fetchFilms.js';
import { displayItems } from './js/displayItems.js';

const searchForm = document.querySelector('.header__form');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const query = document.querySelector('.search__film').value;
  const films = await fetchFilms(query);
  displayItems(films);
});
