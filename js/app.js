const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=114d2496fece78a34687ca32ab825bda&page=1';
const ImgSrc = 'https://image.tmdb.org/t/p/w1280';
const SearchAPI =
  'https://api.themoviedb.org/3/search/movie?api_key=114d2496fece78a34687ca32ab825bda&query="';

// =========== getting the value from the dom ===========

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

// =========== get initial movies ===========

// eslint no-use-before-define

getMovies(API_URL);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
}

function displayMovies(movie) {
  main.innerHTML = '';
  movie.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieData = document.createElement('div');
    movieData.classList.add('movie');
    movieData.innerHTML = `
    <img src="${ImgSrc + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${classRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>overview</h3>
          ${overview}
        </div>
        `;
    main.appendChild(movieData);
  });
}

function classRate(vote) {
  if (vote >= 8) {
    return 'green';
  }
  if (vote >= 5) {
    return 'orange';
  }
  return 'red';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchList = search.value;
  if (searchList && searchList !== '') {
    getMovies(SearchAPI + searchList);
    search.value = '';
  } else {
    window.location.reload();
  }
});
