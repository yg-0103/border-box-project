import { state } from '../store';

export const changeCalendarHeaderTitle = ((): (() => void) => {
  const $titleMonth = document.querySelector('.heading-month') as HTMLElement;
  const $titleYear = document.querySelector('.heading-year') as HTMLElement;

  const getStringMonth = (): string => {
    const month: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return month[state.month];
  };

  return () => {
    $titleMonth.textContent = getStringMonth();
    $titleYear.textContent = `${state.year}`;
  };
})();
