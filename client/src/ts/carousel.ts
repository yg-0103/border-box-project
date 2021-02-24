import axios, { AxiosResponse } from 'axios';
import { boxOfficeMovieList } from './store';

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
}

let delayTime = 500;
let currentSlide = 1;
let lastActivatedNode: any = null;
let isClickable: boolean = true;

const boxofficeRender = (movieList: []) => {
  $boxofficeList.innerHTML = movieList.map(({ title, image, director, rank }: Boxoffice) => `
    <li id="${rank}" ><img src="${image}" alt=""> 
    <div id="${rank}" class="movie-info"><p class="movie-title">${title}</p>
    <p class="movie-director">${director}</p></div>
    <button id="${rank}" class="movie-details">상세정보</button>
    <button id="${rank}" class="booking-btn">예매하기</button>
    </li>`)
    .join('');

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
};

const getMovieList = async () => {
  const movieList = await (await axios.get(`/movielist/${today}`)).data;
  boxofficeRender(movieList);
  boxOfficeMovieList.movieList = movieList;
  $boxofficeList.style.width = `${(movieList.length + 6) * 310}px`;
  // console.log(boxOfficeMovieList.movieList);
};

const setCurrentActive = () => {
  let index = currentSlide;

  if (index === 11) index = 1;
  if (index === 0) index = 10;
  
  [...$boxofficeList.children].forEach($child => {
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
    delayTime = 0;
    currentSlide = 1;
    setBoxofficeList();
    // delayTime = 500;
  }
  if (currentSlide === 0) {
    delayTime = 0;
    currentSlide = boxOfficeMovieList.movieList.length;
    setBoxofficeList();
    // delayTime = 500;
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
  // delayTime = 500;

  // if (currentSlide === boxOfficeMovieList.movieList.length) {
  //   delayTime = 0;
  //   currentSlide = 0;
  // }
  // setCurrentActive();
  // setBoxofficeList();
  // boxofficeRender(boxOfficeMovieList.movieList);
  // console.log(boxOfficeMovieList.movieList);
};

$prevBtn.onclick = () => {
  if (isClickable) {
    isClickable = false;
    currentSlide -= 1;

    setCurrentActive();
    setBoxofficeList();
  }
  // delayTime = 500;

  // if (currentSlide === -1) {
  //   // delayTime = 0;
  //   currentSlide = boxOfficeMovieList.movieList.length - 1;
  // }
  // setCurrentActive();
  // setBoxofficeList();
  // boxofficeRender(boxOfficeMovieList.movieList);
};

export default getMovieList;
