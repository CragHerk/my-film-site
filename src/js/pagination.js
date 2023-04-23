import { fetchFilms } from './fetchFilms.js';
import { fetchPageNumbers } from './fetchPageNumers.js';
import { switchPage } from './switchpages.js';

const resultsPerPage = 20;
const paginationContainer = document.querySelector('.pagination');

async function fetchTotalResults(query) {
  const response = await fetchFilms(query);
  return response.totalResults;
}

export async function createPaginationButtons() {
  const query = document.querySelector('.search__film').value;
  const totalResults = await fetchTotalResults(query);
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  paginationContainer.innerHTML = '';
  let currentPage = 1;

  const pageNumbers = fetchPageNumbers(totalPages, 1);

  const previousButton = document.createElement('button');
  previousButton.innerHTML = '&laquo;';
  previousButton.classList.add('pagination__button--prev');
  previousButton.addEventListener('click', () => {
    currentPage = Math.max(currentPage - 1, 1);
    switchPage(currentPage, query, buttons);
  });

  const nextButton = document.createElement('button');
  nextButton.innerHTML = '&raquo;';
  nextButton.classList.add('pagination__button--next');
  nextButton.addEventListener('click', () => {
    currentPage = Math.min(currentPage + 1, totalPages);
    switchPage(currentPage, query, buttons);
  });

  const buttons = pageNumbers.map(number => {
    const button = document.createElement('button');
    button.textContent = number;
    button.classList.add('pagination__button');
    if (number === '...') {
      button.disabled = true;
    } else if (number === currentPage) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      currentPage = number;
      switchPage(currentPage, query, buttons);
    });
    return button;
  });

  buttons.unshift(previousButton);
  buttons.push(nextButton);

  buttons.forEach(button => paginationContainer.appendChild(button));
  previousButton.addEventListener('click', () => {
    if (!previousButton.disabled) {
      currentPage = Math.max(currentPage - 1, 1);
      switchPage(currentPage, query, buttons);
    }
  });

  nextButton.addEventListener('click', () => {
    if (!nextButton.disabled) {
      currentPage = Math.min(currentPage + 1, totalPages);
      switchPage(currentPage, query, buttons);
    }
  });
}
