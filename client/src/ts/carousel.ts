import axios, { AxiosResponse } from 'axios';
import movieDetail from './detail';
import { boxOfficeMovieList } from './store';
import throttle from './utils/throttle';

const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;
const todayDate = new Date().getDate();

const today = `${todayYear}${('0' + todayMonth).slice(-2)}${('0' + (todayDate - 1)).slice(-2)}`;

const $boxofficeList = document.querySelector('.boxoffice_list') as HTMLUListElement;
const $prevBtn = document.querySelector('.prev') as HTMLElement;
const $nextBtn = document.querySelector('.next') as HTMLElement;

interface Boxoffice {
  title: string;
  image: string;
  director: string;
  rank: number;
  link?: string;
}

let delayTime = 500;
let currentSlide = 1;
let lastActivatedNode: any = null;
let isClickable: boolean = true;

const boxofficeRender = (movieList: []) => {
  $boxofficeList.innerHTML = movieList.map(({title, image, director, rank, link}: Boxoffice) => `
    <li id="${rank}" ><img src="${image}" alt=""><div class="movie-rank">${rank}</div>
    <div id="${rank}" class="movie-info"><p class="movie-title">${title}</p>
    <p class="movie-director">${director.substring(0, director.length - 1)}</p></div>
    <div class="movie-control"><button id="${rank}" class="movie-details" data-link="${link}">상세정보</button>
    <button id="${rank}" class="booking-btn">예매하기</button></div></li>`).join('');

  const $clonedFirst = ($boxofficeList.firstElementChild as HTMLElement).cloneNode(true);
  const $clonedSecond = ($boxofficeList.querySelector('li:nth-child(2)') as HTMLElement).cloneNode(true);
  const $clonedThird = ($boxofficeList.querySelector('li:nth-child(3)') as HTMLElement).cloneNode(true);
  const $clonedLast = ($boxofficeList.lastElementChild as HTMLElement).cloneNode(true);
  const $clonedSecondLast = ($boxofficeList.querySelector(`li:nth-child(${movieList.length - 1})`) as HTMLElement).cloneNode(true);
  const $clonedThirdLast = ($boxofficeList.querySelector(`li:nth-child(${movieList.length - 2})`) as HTMLElement).cloneNode(true);

  lastActivatedNode = $boxofficeList.children[0];
  lastActivatedNode.classList.add('active');

  $boxofficeList.append($clonedFirst, $clonedSecond, $clonedThird);
  $boxofficeList.prepend($clonedThirdLast, $clonedSecondLast, $clonedLast);
  // console.log(boxOfficeMovieList.movieList);

  // movie detail part
  document.querySelectorAll('.movie-details').forEach(button => {
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

  (document.querySelector('.spinner') as HTMLElement).style.display = 'none';

  boxofficeRender(movieList);
  boxOfficeMovieList.movieList = movieList;
  $boxofficeList.style.width = `${(movieList.length + 6) * 310}px`;
  // console.log(boxOfficeMovieList.movieList);
};

const setCurrentActive = () => {
  let index = currentSlide;

  if (index === 11) index = 1;
  if (index === 0) index = 10;

  Array.from($boxofficeList.children).forEach($child => {
    $child.classList.toggle('active', +$child.id === index);
  });

  // let pseudoSlideIndex = currentSlide;

  // if(currentSlide === 11) {
  //   // $boxofficeList.children[pseudoSlideIndex+2].classList.add('active')
  //   pseudoSlideIndex = 1;
  // }

  // if(currentSlide === 0) {
  //   pseudoSlideIndex = boxOfficeMovieList.movieList.length;
  // }

  // if(lastActivatedNode){
  //   lastActivatedNode.classList.remove('active')
  // }

  // $boxofficeList.children[pseudoSlideIndex+2].classList.add('active')
  // lastActivatedNode = $boxofficeList.children[pseudoSlideIndex+2];
};

const setBoxofficeList = () => {
  $boxofficeList.style.setProperty('--duration', `${delayTime}`);
  $boxofficeList.style.setProperty('--currentSlide', `${currentSlide}`);
};

$boxofficeList.ontransitionend = () => {
  isClickable = true;

  if (currentSlide === boxOfficeMovieList.movieList.length + 1) {
    currentSlide = 1;
    delayTime = 0;
    setCurrentActive();
    setBoxofficeList();
  }
  if (currentSlide === 0) {
    currentSlide = boxOfficeMovieList.movieList.length;
    delayTime = 0;
    setCurrentActive();
    setBoxofficeList();
  }
  delayTime = 500;
};

$nextBtn.onclick = () => {
  if (isClickable) {
    isClickable = false;
    currentSlide += 1;

    setCurrentActive();
    setBoxofficeList();
  }
};

$prevBtn.onclick = () => {
  if (isClickable) {
    isClickable = false;
    currentSlide -= 1;

    setCurrentActive();
    setBoxofficeList();
  }
};

const $privateContainer = document.querySelector('.private-container') as HTMLElement;
const $premiumImg = document.querySelector('.premium-img') as HTMLElement;
const $premiumText = document.querySelector('.premium-text') as HTMLElement;

window.onscroll = throttle (() => {
  $privateContainer.style.display = window.pageYOffset >= 400 ? 'block' : 'none';
  // $privateContainer.addEventListener('transitionend', () => {
  //   $premiumImg.style.display = window.pageYOffset >= 400 ? 'block': 'none';
  //   $premiumText.style.display = window.pageYOffset >= 400 ? 'block': 'none';
  //   // $premiumText.style.display = 'block';
  // });
  $premiumImg.style.display = window.pageYOffset >= 400 ? 'block' : 'none';
  $premiumText.style.display = window.pageYOffset >= 400 ? 'block' : 'none';
}, 100);

export default getMovieList;
