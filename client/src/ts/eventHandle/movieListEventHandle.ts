import { changeRadioDisabled } from '../ajax/changeRadioDisabled';
import { calendarRender } from '../calendar/calendarRender';
import { initializeDate } from '../utils/initializeDate';
import { boxOfficeMovieList, state } from '../store';
import { MovieList } from '../interface/MovieList';
import { setBtnDisplay } from './reservationEventHandle';

const $movieList = document.querySelector('.boxoffice_list') as HTMLElement;

const findSelectedMovie = (id: string): MovieList => {
  const target = boxOfficeMovieList.movieList.find(({ rank }) => rank === id);

  return (target as unknown) as MovieList;
};

const setReserveMenu = (target: MovieList) => {
  (document.querySelector('.img-container img') as HTMLImageElement)
    .src = target.image;

  ((document.querySelector('.reservation_movie-title') as HTMLElement)
    .innerHTML as string) = target.title;

  ((document.querySelector('.img-container figcaption') as HTMLElement)
    .textContent as string) = `네티즌 평점 ${target.userRating}`;

  ((document.querySelector('.img-container span') as HTMLElement)
    .textContent as string) = '🍿'.repeat(Math.floor(+target.userRating / 2));
};

export default () => {
  $movieList.addEventListener('click', e => {
    const eventTarget = e.target as HTMLElement;

    if (!eventTarget.matches('.booking-btn')) return;

    const selectedMovie = findSelectedMovie(eventTarget.id);

    setBtnDisplay('none', 'block');
    initializeDate();
    changeRadioDisabled(state.date, state.month);
    calendarRender();
    setReserveMenu(selectedMovie);

    document.querySelector('.reservation-container')
      ?.classList.add('active');
  });
};
