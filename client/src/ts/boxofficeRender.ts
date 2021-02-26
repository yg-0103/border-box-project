import axios, { AxiosResponse } from 'axios';
import movieTrailer from './trailer';
import movieDetail from './detail';
import { boxOfficeMovieList } from './store';

interface Boxoffice {
  title: string;
  image: string;
  director: string;
  rank: number;
  link?: string;
}

const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;
const todayDate = new Date().getDate();

const today = `${todayYear}${('0' + todayMonth).slice(-2)}${(
  '0' +
  (todayDate - 1)
).slice(-2)}`;

const $boxofficeList = document.querySelector(
  '.boxoffice_list'
) as HTMLUListElement;

let lastActivatedNode: any = null;

const boxofficeRender = (movieList: []) => {
  $boxofficeList.innerHTML = movieList
    .map(
      ({ title, image, director, rank, link }: Boxoffice) => `
    <li id="${rank}" >
      <img src="${image}" alt="">
      <div class="movie-rank">${rank}</div>
      <div id="${rank}" class="movie-info">
        <p class="movie-title">${title}</p>
        <p class="movie-director">${director.substring(0, director.length - 1)}</p>
      </div>
      <div class="movie-control">
        <button id="${rank}" class="movie-details" data-link="${link}">상세정보</button>
        <button id="${rank}" class="booking-btn">예매하기</button>
      </div>
    </li>`
    )
    .join('');

  const $clonedFirst = ($boxofficeList.firstElementChild as HTMLElement).cloneNode(
    true
  );
  const $clonedSecond = ($boxofficeList.querySelector(
    'li:nth-child(2)'
  ) as HTMLElement).cloneNode(true);
  const $clonedThird = ($boxofficeList.querySelector(
    'li:nth-child(3)'
  ) as HTMLElement).cloneNode(true);
  const $clonedLast = ($boxofficeList.lastElementChild as HTMLElement).cloneNode(
    true
  );
  const $clonedSecondLast = ($boxofficeList.querySelector(
    `li:nth-child(${movieList.length - 1})`
  ) as HTMLElement).cloneNode(true);
  const $clonedThirdLast = ($boxofficeList.querySelector(
    `li:nth-child(${movieList.length - 2})`
  ) as HTMLElement).cloneNode(true);

  // eslint-disable-next-line prefer-destructuring
  lastActivatedNode = $boxofficeList.children[0];
  lastActivatedNode.classList.add('active');

  $boxofficeList.append($clonedFirst, $clonedSecond, $clonedThird);
  $boxofficeList.prepend($clonedThirdLast, $clonedSecondLast, $clonedLast);
};

const getMovieList = async () => {
  const movieList = await (await axios.get(`/movielist/${today}`)).data;

  (document.querySelector('.spinner') as HTMLElement).style.display = 'none';

  await boxofficeRender(movieList);
  boxOfficeMovieList.movieList = movieList;
  $boxofficeList.style.width = `${(movieList.length + 6) * 310}px`;

  movieDetail();
  movieTrailer();
};

export default getMovieList;
