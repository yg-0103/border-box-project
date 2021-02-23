import axios, { AxiosResponse } from 'axios';

const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;
const todayDate = new Date().getDate();

const today = `${todayYear}${("0" + todayMonth).slice(-2)}${("0" + (todayDate-1)).slice(-2)}`
// console.log(today);

const $boxofficeList = document.querySelector('.boxoffice_list') as HTMLInputElement;
const $prevBtn = document.querySelector('.prev') as HTMLInputElement;
const $nextBtn = document.querySelector('.next') as HTMLInputElement;

interface Boxoffice {
  title: string;
  image: string;
  director: string;
  rank: number;
}

let currentSlide = 2;
const delayTime = 500;

const boxofficeRender = (movieList: []) => {
  $boxofficeList.innerHTML = movieList.map(({title, image, director}: Boxoffice, index: number) => 
    `<li class="${currentSlide === index ? 'active' : ''}"><img src="${image}" alt=""> <div class="movie-info"><p class="movie-title">${title}</p>
    <p class="movie-director">${director}</p></div>
    <button class="movie-details">상세정보</button>
    <button class="booking-btn">예매하기</button>
    </li>`
  ).join('');

  // const $activeList = document.querySelectorAll('.boxoffice_list > li');
  // movieList.match((_, i) => currentSlide = i).
  
};

const getMovieList = async () => {
  const movieList = await (await axios.get(`/movielist/${today}`)).data;
  boxofficeRender(movieList);
  // const $boxofficeCarousel = document.querySelector('.boxoffice_carousel') as HTMLElement;
  // $boxofficeCarousel.style.width = `${movieList.length * 400}px`;
  // console.log($boxofficeList.scrollWidth);
  console.log(movieList);
};
// getMovieList();



const setBoxofficeList = () => {
  $boxofficeList.style.setProperty('--currentSlide', `${currentSlide}`);
  $boxofficeList.style.setProperty('--duration', `${delayTime}`);
};


$nextBtn.onclick = () => {
  currentSlide += 1;
  setBoxofficeList();
  getMovieList();
};

$prevBtn.onclick = () => {
  currentSlide -= 1;
  setBoxofficeList();
  getMovieList();
};

export default getMovieList;

