import { findSundays } from './findSunday';
import { state } from '../model';
import { setCalendarDays } from './setCalendarDays';
import { changeCalendarHeaderTitle } from './changeCalendarHeaderTitle';

const $calenderContainer = document.querySelector(
  '.main-container'
) as HTMLElement;

export const calendarRender = (): void => {
  setCalendarDays();
  changeCalendarHeaderTitle();

  const sundays: number[] = findSundays();
  $calenderContainer.innerHTML = state.prevMonthDays
    .map(day => `<button id="${day}" style="color: #aaa; opacity: 0; position: relative; z-index: -10;">${day}</button>`)
    .join('')
    + state.currentMonthDays
      .map(
        day => `<button id="${day}" style="color: ${
          sundays.includes(day) ? 'red' : day >= state.date ? '' : '#aaa'
        }" class="${
          `${state.year}-${state.month + 1}-${day}` === state.today
            ? 'active'
            : ''
        }" ${day < state.date ? 'disabled' : ''}>${day}</button>`
      )
      .join('')
    + state.nextMonthDays
      .map(day => `<button id="${day}" class="next-month" style="opacity: 0; position: relative; z-index: -10;">${day}</button>`)
      .join('');
};
