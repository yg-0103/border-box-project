import { boxOfficeMovieList } from './store';

const $boxofficeList = document.querySelector('.boxoffice_list') as HTMLUListElement;
const $prevBtn = document.querySelector('.prev') as HTMLElement;
const $nextBtn = document.querySelector('.next') as HTMLElement;

let delayTime = 500;
let currentSlide = 1;
let isSingleClick: boolean = true;

const setCurrentActive = () => {
  let index = currentSlide;

  if (index === 11) index = 1;
  if (index === 0) index = 10;

  Array.from($boxofficeList.children).forEach($child => {
    $child.classList.toggle('active', +$child.id === index);
  });
};

const setBoxofficeList = () => {
  $boxofficeList.style.setProperty('--duration', `${delayTime}`);
  $boxofficeList.style.setProperty('--currentSlide', `${currentSlide}`);
};

const connectSlide = (currentslide: number) => {
  currentSlide = currentslide;
  delayTime = 0;
  setCurrentActive();
  setBoxofficeList();
};

const movingOneSlide = (e: Event) => {
  const $clickBtn = e.target as HTMLElement;

  if (isSingleClick) {
    isSingleClick = false;

    if ($clickBtn.matches('.next')) currentSlide += 1;
    if ($clickBtn.matches('.prev')) currentSlide -= 1;

    setCurrentActive();
    setBoxofficeList();
  }
};

export default () => {
  $boxofficeList.ontransitionend = () => {
    isSingleClick = true;

    if (currentSlide === boxOfficeMovieList.movieList.length + 1) connectSlide(1);
    if (currentSlide === 0) connectSlide(boxOfficeMovieList.movieList.length);

    delayTime = 500;
  };

  $nextBtn.onclick = movingOneSlide;
  $prevBtn.onclick = movingOneSlide;
};
