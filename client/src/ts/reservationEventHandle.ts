import { reserveData, state, StateTime } from './model';
import renderCompleted from './completed';
import { calendarRender } from './calendar/calenderRender';
import {
  setStateMonthAndDate,
  setStateMonthAndYear,
} from './calendar/setCalederState';

const $btnNext = document.querySelector('.btn-next') as HTMLButtonElement;
const $btnPrev = document.querySelector('.btn-prev') as HTMLButtonElement;
const $radioSection = document.querySelector('.radio-section') as HTMLElement;
const $reserveBtnGroup = document.querySelector('.btn-group') as HTMLElement;
const $calendarContainer = document.querySelector(
  '.main-container'
) as HTMLElement;

const setReserveInfo = (): void => {
  reserveData.movieImg = (document.querySelector(
    '.img-container img'
  ) as HTMLImageElement).src;
  reserveData.movieTitle = (document.querySelector(
    '.reservation_movie-title'
  ) as HTMLElement).textContent;
  reserveData.reserveDate = state.today;
  reserveData.reserveTime = state.time;
};

const setBtnDisplay = (prevBtn: string, nextBtn: string): void => {
  $btnNext.style.display = nextBtn;
  $btnPrev.style.display = prevBtn;
};

const prevAndNextCalendarHandle = (e: Event): void => {
  const eventTarget = e.target as HTMLElement;

  if (eventTarget.closest('.btn-next')) {
    setStateMonthAndDate(1, 0);
    setBtnDisplay('block', 'none');
  } else if (eventTarget.closest('.btn-prev')) {
    setStateMonthAndDate(-1, new Date().getDate());
    setBtnDisplay('none', 'block');
  }

  if (state.month >= 12) setStateMonthAndYear(0, 1);
  else if (state.month < 0) setStateMonthAndYear(11, -1);

  calendarRender();
};

export default () => {
  document.addEventListener('DOMContentLoaded', calendarRender);

  $btnNext.addEventListener('click', prevAndNextCalendarHandle);

  $btnPrev.addEventListener('click', prevAndNextCalendarHandle);

  $calendarContainer.addEventListener('click', (e) => {
    const eventTarget = e.target as HTMLElement;
    if (!eventTarget.matches('button')) return;

    state.today = `${state.year}-${state.month + 1}-${eventTarget.id}`;
    calendarRender();
  });

  $radioSection.addEventListener('change', (e) => {
    const eventTarget = e.target as HTMLElement;

    $radioSection.querySelector('.active')?.classList.remove('active');
    eventTarget.closest('.radio-container')?.classList.add('active');

    state.time = $radioSection
      .querySelector('.active')
      ?.textContent?.trim() as StateTime;
    console.log(state.time);
  });

  $reserveBtnGroup.addEventListener('click', (e) => {
    const eventTarget = e.target as HTMLElement;

    if (eventTarget.matches('.reservation-completed')) {
      setReserveInfo();
      renderCompleted(reserveData);
      (document.querySelector('.completed') as HTMLElement).classList.add(
        'active'
      );
    }

    (document.querySelector(
      '.reservation-container'
    ) as HTMLElement).style.display = 'none';
  });
};
