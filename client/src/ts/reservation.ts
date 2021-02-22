import axios from 'axios';
import { reserveData } from './model';
import renderCompleted from './completed';

export default () => {
  const $calenderContainer = document.querySelector(
    '.main-container'
  ) as HTMLElement;
  const $btnNext = document.querySelector('.btn-next') as HTMLButtonElement;
  const $btnPrev = document.querySelector('.btn-prev') as HTMLButtonElement;
  const $radioSection = document.querySelector('.radio-section') as HTMLElement;
  const $reserveBtnGroup = document.querySelector('.btn-group') as HTMLElement;

interface State {
  currentMonthDays: number[];
  prevMonthDays: number[];
  nextMonthDays: number[];
  year: number;
  month: number;
  today: string;
  date: number;
  active: boolean;
  time: string | null;
}

const state: State = {
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

const setDays = ((): (() => void) => {
  const date: Date = new Date();
  state.year = date.getFullYear();
  state.month = date.getMonth();
  state.date = date.getDate();
  state.today = `${state.year}-${state.month + 1}-${state.date}`;

  return (): void => {
    const prevMonthLastDay: Date = new Date(state.year, state.month, 0);
    const currentMonthLastDay: Date = new Date(state.year, state.month + 1, 0);
    const currentMonthFirstDay: Date = new Date(state.year, state.month, 1);

    // eslint-disable-next-line max-len
    const getPrevMonthDays = (day: Date): number[] => Array.from({ length: day.getDay() }, (_, i) => prevMonthLastDay.getDate() - prevMonthLastDay.getDay() + i);

    // eslint-disable-next-line max-len
    const getNextMonthDays = (day: Date): number[] => Array.from({ length: 6 - day.getDay() }, (_, i) => i + 1);

    // eslint-disable-next-line max-len
    const getCurrentMonthDays = (day: Date): number[] => Array.from({ length: day.getDate() }, (_, i) => i + 1);

    state.currentMonthDays = getCurrentMonthDays(currentMonthLastDay);
    state.prevMonthDays = getPrevMonthDays(currentMonthFirstDay);
    state.nextMonthDays = getNextMonthDays(currentMonthLastDay);
  };
})();

const setMonthAndYear = ((): (() => void) => {
  const $titleMonth = document.querySelector('.heading-month') as HTMLElement;
  const $titleYear = document.querySelector('.heading-year') as HTMLElement;

  const getMonth = (): string => {
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
    $titleMonth.textContent = getMonth();
    $titleYear.textContent = `${state.year}`;
  };
})();

const findSundays = (): number[] => {
  const days: number[] = [
    ...state.prevMonthDays,
    ...state.currentMonthDays,
    ...state.nextMonthDays,
  ];

  const sundays: number[] = days.filter((_, i) => !(i % 7));

  return sundays[0] === 1 ? sundays : sundays.slice(1);
};

const render = (): void => {
  setDays();
  setMonthAndYear();

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

const setReserveInfo = async () => {
  const today = await axios.post('/reserve', { time: state.time });
  console.log(today.data);
};

document.addEventListener('DOMContentLoaded', render);

$btnNext.addEventListener('click', () => {
  state.month += 1;
  state.date = 0;
  $btnNext.style.display = 'none';
  $btnPrev.style.display = 'block';
  if (state.month >= 12) {
    state.month = 0;
    state.year += 1;
  }

  render();
});

$btnPrev.addEventListener('click', () => {
  $btnPrev.style.display = 'none';
  $btnNext.style.display = 'block';
  state.month -= 1;
  state.date = new Date().getDate();
  if (state.month < 0) {
    state.month = 11;
    state.year -= 1;
  }

  render();
});

$calenderContainer.addEventListener('click', e => {
  const eventTarget = <HTMLElement>e.target;
  if (!eventTarget.matches('button')) return;
  state.today = `${state.year}-${state.month + 1}-${eventTarget.id}`;
  render();
});

$radioSection.addEventListener('change', e => {
  const eventTarget = <HTMLElement>e.target;
  ($radioSection.querySelector('.active') as HTMLElement).classList.remove('active');
  (eventTarget.closest('.radio-container') as HTMLElement).classList.add('active');
  state.time = (($radioSection.querySelector('.active') as HTMLElement).textContent as string).trim();
});

$reserveBtnGroup.addEventListener('click', e => {
  const eventTarget = <HTMLElement>e.target;
  if (eventTarget.matches('.reservation-completed')) {
    reserveData.movieImg = (document.querySelector('.img-container img') as HTMLImageElement).src;
    reserveData.movieTitle = (document.querySelector('.reservation_movie-title') as HTMLElement).textContent;
    reserveData.reserveDate = state.today;
    reserveData.reserveTime = state.time;
    renderCompleted(reserveData);
    (document.querySelector('.completed') as HTMLElement).style.display = 'flex';
  }

  (document.querySelector('.reservation-container') as HTMLElement).style.display = 'none';
});
};
