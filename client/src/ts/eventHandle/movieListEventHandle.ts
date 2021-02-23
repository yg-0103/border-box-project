import { changeRadioDisabled } from '../ajax/changeRadioDisabled';
import { calendarRender } from '../calendar/calendarRender';
import { initializeDate } from '../initializeDate';
import { boxOfficeMovieList } from '../store';
import { MovieList } from '../interface/MovieList';
import { setBtnDisplay } from './reservationEventHandle';

const $movieList = document.querySelector('.boxoffice_list') as HTMLElement;

const findSelectTarget = (id: string): MovieList => {
  const target = boxOfficeMovieList.movieList.find(({ rank }) => rank === id);

  return target as unknown as MovieList;
};

const setReserveModal = (target: MovieList) => {
  (document.querySelector('.img-container img') as HTMLImageElement)
    .src = target.image;
  ((document.querySelector('.reservation_movie-title') as HTMLElement)
    .textContent as string) = target.movieNm;
};

export default () => {
  $movieList.addEventListener('click', e => {
    const eventTarget = e.target as HTMLElement;

    if (!eventTarget.matches('.booking-btn')) return;
    const target = findSelectTarget(eventTarget.id);

    setBtnDisplay('none', 'block');
    initializeDate();
    changeRadioDisabled();
    calendarRender();
    setReserveModal(target);

    document.querySelector('.reservation-container')
      ?.classList.add('active');
  });
};
