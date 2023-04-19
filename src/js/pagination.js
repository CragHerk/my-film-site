import { fetchFilms } from './fetchFilms.js';
import { fetchPageNumbers } from './fetchPageNumers.js';
const resultsPerPage = 20;
const paginationContainer = document.querySelector('.pagination');

async function fetchTotalResults(query) {
  const response = await fetchFilms(query);
  return response.totalResults;
}

export async function createPaginationButtons(query) {
  const totalResults = await fetchTotalResults(query);
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  paginationContainer.innerHTML = ''; // usuń wszystkie przyciski paginacji

  const pageNumbers = fetchPageNumbers(totalPages, 1); // 1 to aktualna strona

  const buttons = pageNumbers.map(number => {
    const button = document.createElement('button');
    button.textContent = number;
    button.classList.add('pagination__button');
    if (number === 1) button.classList.add('active'); // dodanie klasy active dla pierwszego przycisku
    return button;
  });

  // strzałki w lewo
  const firstButton = document.createElement('button');
  firstButton.innerHTML = '&laquo;';
  firstButton.classList.add('pagination__button');
  if (pageNumbers[0] === 1) firstButton.disabled = true; // wyłączenie strzałki w lewo dla pierwszej strony
  buttons.unshift(firstButton);

  // strzałki w prawo
  const lastButton = document.createElement('button');
  lastButton.innerHTML = '&raquo;';
  lastButton.classList.add('pagination__button');
  if (pageNumbers[pageNumbers.length - 1] === totalPages)
    lastButton.disabled = true; // wyłączenie strzałki w prawo dla ostatniej strony
  buttons.push(lastButton);

  buttons.forEach(button => paginationContainer.appendChild(button));
}
