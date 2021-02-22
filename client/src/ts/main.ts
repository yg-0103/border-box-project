import calender from './calender';

const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;
const todayDate = new Date().getDate();

const today = `${todayYear}${('0' + todayMonth).slice(-2)}${(
  '0' +
  (todayDate - 1)
).slice(-2)}`;
// console.log(today);

// const getMovieList = async () => {
//   const movieList = await axios.get(`/movielist/${today}`);
//   console.log(movieList.data);
// };
// getMovieList();

let currentSlide = 1;

const $prevBtn = document.querySelector('.prev');
const $nextBtn = document.querySelector('.next');

calender();
