export interface ReserveData {
  movieImg: string;
  movieTitle: string | null;
  reserveTime: string | null;
  reserveDate: string
}

export interface State {
  currentMonthDays: number[];
  prevMonthDays: number[];
  nextMonthDays: number[];
  year: number;
  month: number;
  today: string;
  date: number;
  active: boolean;
  time: string;
}

export const reserveData: ReserveData = {
  movieImg: '',
  movieTitle: '',
  reserveDate: '',
  reserveTime: ''
};

export const state: State = {
  currentMonthDays: [],
  prevMonthDays: [],
  nextMonthDays: [],
  year: 0,
  month: 0,
  today: '',
  date: 0,
  active: false,
  time: 'A Time (10:00 - 13:00)'
};
