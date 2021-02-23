import { State, StateTime } from './interface/State';
import { ReserveData } from './interface/ReserveData';
import { BoxOfficeMovieList } from './interface/BoxOfficeMovieList';

export const reserveData: ReserveData = {
  movieImg: '',
  movieTitle: '',
  reserveDate: '',
  reserveTime: '',
  reserveId: '',
};

export const state: State = {
  currentMonthDays: [],
  prevMonthDays: [],
  nextMonthDays: [],
  year: 0,
  month: 0,
  date: 0,
  today: '',
  time: StateTime.A,
};

export const boxOfficeMovieList: BoxOfficeMovieList = {
  movieList: [],
};
