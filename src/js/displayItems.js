function displayItems(items) {
  const container = document.querySelector('.movies-container');
  const screenWidth = window.innerWidth;

  container.innerHTML = '';

  items.forEach(item => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    const moviePoster = document.createElement('div');
    moviePoster.classList.add('movie-item__poster');
    let posterSize = '';
    if (screenWidth <= 768) {
      posterSize = 'w300';
    } else if (screenWidth <= 1200) {
      posterSize = 'w342';
    } else {
      posterSize = 'w400';
    }
    if (item.poster_path) {
      moviePoster.style.backgroundImage = `url(https://image.tmdb.org/t/p/${posterSize}${item.poster_path})`;
    }

    const movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie-item__title');
    movieTitle.textContent = item.title;

    const movieLine = document.createElement('span');
    movieLine.classList.add('movie-item__line');
    movieLine.textContent = '|';

    const movieYear = document.createElement('span');
    movieYear.classList.add('movie-item__year');
    movieYear.textContent = `${item.release_date.slice(0, 4)}`;

    const movieRating = document.createElement('span');
    movieRating.classList.add('movie-item__rating');
    movieRating.textContent = item.vote_average;

    movieItem.appendChild(moviePoster);
    movieItem.appendChild(movieTitle);
    movieItem.appendChild(movieLine);
    movieItem.appendChild(movieYear);
    movieItem.appendChild(movieRating);

    container.appendChild(movieItem);
  });
}

export { displayItems };
