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
  previousButton.classList.add('pagination__button');
  previousButton.addEventListener('click', () =>
    switchPage(currentPage - 1, query, buttons)
  );

  const nextButton = document.createElement('button');
  nextButton.innerHTML = '&raquo;';
  nextButton.classList.add('pagination__button');
  nextButton.addEventListener('click', () =>
    switchPage(currentPage + 1, query, buttons)
  );

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
      buttons.forEach(btn => {
        if (btn.textContent === currentPage.toString()) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    });
    return button;
  });

  buttons.unshift(previousButton);
  buttons.push(nextButton);

  buttons.forEach(button => paginationContainer.appendChild(button));
}
