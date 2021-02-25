import getMovieList from './carousel';
import reservation from './eventHandle/reservationEventHandle';
import myBooking from './myBooking';
import scrollGoToTop from './scrollGoToTop';
import { changeRadioDisabled } from './ajax/changeRadioDisabled';
import movieListEventHandle from './eventHandle/movieListEventHandle';
import kakaoLogin from './kakaoLogin';

kakaoLogin();
scrollGoToTop();
getMovieList();
movieListEventHandle();
changeRadioDisabled();
reservation();
myBooking();
