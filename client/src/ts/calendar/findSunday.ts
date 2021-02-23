import { state } from '../model';

export const findSundays = (): number[] => {
  const days: number[] = [
    ...state.prevMonthDays,
    ...state.currentMonthDays,
    ...state.nextMonthDays,
  ];

  const sundays: number[] = days.filter((_, i) => !(i % 7));

  return sundays[0] === 1 ? sundays : sundays.slice(1);
};
