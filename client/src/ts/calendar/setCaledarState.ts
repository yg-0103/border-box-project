import { state } from '../model';

export const setStateMonthAndDate = (month: number, date: number): void => {
  state.month += month;
  state.date = date;
};

export const setStateMonthAndYear = (month: number, year: number): void => {
  state.month = month;
  state.year += year;
};
