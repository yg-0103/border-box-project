import reservation from './reservationEventHandle';
import myBooking from './myBooking';
import scrollGoToTop from './scrollGoToTop';
import getMovieList from './carousel';
import { changeRadioDisabled } from './ajax/changeRadioDisabled';

changeRadioDisabled();
scrollGoToTop();
getMovieList();
reservation();
myBooking();
