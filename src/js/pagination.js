import Pagination from '/node_modules/tui-pagination';
import { fetchFilms } from './fetchFilms';
import { displayItems } from './displayItems';

export const generatePagination = async (totalResults, perPage) => {
  const pagination = new Pagination('pagination', {
    totalItems: totalResults,
    itemsPerPage: perPage,
    visiblePages: 5,
    centerAlign: true,

    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  });

  pagination.on('beforeMove', async event => {
    const query = document.querySelector('.search__film').value;
    const page = event.page;
    const { films } = await fetchFilms(query, page);
    displayItems(films);
  });
};
