import { fetchFilms } from './fetchFilms.js';
import { displayItems } from './displayItems.js';

export async function switchPage(page) {
  const query = getSearchQuery(); // pobierz aktualne zapytanie wyszukiwania
  const results = await fetchFilms(query, page); // pobierz wyniki dla nowej strony
  displayItems(results.Search); // utwórz karty filmów na podstawie wyników
}
