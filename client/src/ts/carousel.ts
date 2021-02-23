import axios, { AxiosResponse } from 'axios';
import movieDetail from './detail';

const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;
const todayDate = new Date().getDate();

const today = `${todayYear}${('0' + todayMonth).slice(-2)}${(
  '0' +
  (todayDate - 1)
).slice(-2)}`;
// console.log(today);

const $boxofficeList = document.querySelector('.boxoffice_list') as HTMLElement;
const $prevBtn = document.querySelector('.prev') as HTMLElement;
const $nextBtn = document.querySelector('.next') as HTMLElement;
let movielist: [] = [];

interface Boxoffice {
  title: string;
  image: string;
  director: string;
  rank: number;
}

let delayTime = 500;
let currentSlide = 0;

const boxofficeRender = (movieList: []) => {
  $boxofficeList.innerHTML = movieList
    .map(
      ({ title, image, director, link }: Boxoffice, index: number) => `
    <li class="${
      currentSlide === index ? 'active' : ''
    }"><img src="${image}" alt=""> 
    <div class="movie-info"><p class="movie-title">${title}</p>
    <p class="movie-director">${director}</p></div>
    <button class="movie-details" data-link="${link}">상세정보</button>
    <button class="booking-btn">예매하기</button>
    </li>`
    )
    .join('');

  const $clonedFirst = ($boxofficeList.firstElementChild as HTMLElement).cloneNode(
    true
  );
  const $clonedSecond = ($boxofficeList.querySelector(
    'li:nth-child(2)'
  ) as HTMLElement).cloneNode(true);
  const $clonedLast = ($boxofficeList.lastElementChild as HTMLElement).cloneNode(
    true
  );
  const $clonedSecondLast = ($boxofficeList.querySelector(
    `li:nth-child(${movieList.length - 1})`
  ) as HTMLElement).cloneNode(true);

  $boxofficeList.append($clonedFirst, $clonedSecond);
  $boxofficeList.prepend($clonedLast, $clonedSecondLast);

  // movie detail part
  document.querySelectorAll('.movie-details').forEach((button) => {
    button.addEventListener('click', (e: Event) => {
      const { link } = (e.currentTarget as HTMLButtonElement).dataset;
      movieDetail.show(link);
    });
  });
  (document.querySelector('.detail_overlay') as HTMLElement).addEventListener(
    'click',
    movieDetail.close
  );
};

const getMovieList = async () => {
  const movieList = await (await axios.get(`/movielist/${today}`)).data;
  boxofficeRender(movieList);
  movielist = movieList;
  $boxofficeList.style.width = `${(movieList.length + 4) * 310}px`;
};

const setBoxofficeList = () => {
  $boxofficeList.style.setProperty('--currentSlide', `${currentSlide}`);
  $boxofficeList.style.setProperty('--duration', `${delayTime}`);
};

$boxofficeList.ontransitionend = () => {
  if (currentSlide === movielist.length) {
    currentSlide = 0;
    delayTime = 0;
    setBoxofficeList();
  }
  if (currentSlide === -1) {
    currentSlide = movielist.length - 1;
    delayTime = 0;
    setBoxofficeList();
  }
};

$nextBtn.onclick = () => {
  currentSlide += 1;
  setBoxofficeList();
  boxofficeRender(movielist);
};

$prevBtn.onclick = () => {
  currentSlide -= 1;
  setBoxofficeList();
  boxofficeRender(movielist);
};

export default getMovieList;
