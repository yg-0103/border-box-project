/* eslint-disable no-unused-vars */
export enum StateTime {
  A = 'A Time (10:00 - 13:00)',
  B = 'B Time (14:00 - 17:00)',
  C = 'C Time (18:00 - 21:00)',
}

export interface State {
  currentMonthDays: number[];
  prevMonthDays: number[];
  nextMonthDays: number[];
  year: number;
  month: number;
  today: string;
  date: number;
  time: StateTime;
}
