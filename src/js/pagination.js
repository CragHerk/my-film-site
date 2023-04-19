import { fetchFilms } from './fetchFilms.js';
const resultsPerPage = 20;
const paginationContainer = document.querySelector('.pagination');

async function fetchTotalResults(query) {
  const response = await fetchFilms(query);
  return response.totalResults;
}
export async function createPaginationButtons(query) {
  const totalResults = await fetchTotalResults(query);
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.classList.add('pagination__button');
    paginationContainer.appendChild(button);
  }
}
