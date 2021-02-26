import reservation from './eventHandle/reservationEventHandle';
import myBooking from './myBooking';
import scrollGoToTop from './scrollGoToTop';
import carousel from './carousel';
import getMovieList from './boxofficeRender';
import { changeRadioDisabled } from './ajax/changeRadioDisabled';
import movieListEventHandle from './eventHandle/movieListEventHandle';
import reserveInfoEventHandle from './eventHandle/reserveInfoEventHandle';
import introduction from './introduction';

reserveInfoEventHandle();
scrollGoToTop();
introduction();
getMovieList();
carousel();
movieListEventHandle();
// eslint-disable-next-line no-unused-expressions
changeRadioDisabled;
reservation();
myBooking();
