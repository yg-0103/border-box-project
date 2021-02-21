import axios from 'axios';

const container = document.querySelector('.container') as HTMLElement;

interface Movies {
  boxOfficeMovie: [];
  movieNameAndRank: [];
}

let movies: Movies;
const isLoading = false;

const render = ({ boxOfficeMovie }: Movies) => {
  container.innerHTML = boxOfficeMovie
    .map(({ title, image }) => `<div>${title}</div> <img src="${image}"/>`)
    .join('');
};

const getMovies = async () => {
  try {
    container.innerHTML = 'loading......';

    const moviesData = await axios.get(`/movielist/20210211`);
    movies = moviesData.data;
    render(movies);
  } catch (e) {
    throw new Error('get moives failed');
  }
};

window.addEventListener('load', getMovies);
