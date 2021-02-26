import { reserveData, state } from '../store';
import renderCompleted from '../completed';
import { calendarRender } from '../calendar/calendarRender';
import { setStateMonthAndDate, setStateMonthAndYear } from '../calendar/setCaledarState';
import { setReserveInfo } from '../setReserveInfo';
import { postReserveInfo } from '../ajax/ajaxReserveInfo';
import { changeRadioDisabled } from '../ajax/changeRadioDisabled';
import { StateTime } from '../interface/State';

const $btnNext = document.querySelector('.btn-next') as HTMLButtonElement;
const $btnPrev = document.querySelector('.btn-prev') as HTMLButtonElement;
const $radioSection = document.querySelector('.radio-section') as HTMLElement;
const $reserveBtnGroup = document.querySelector('.btn-group') as HTMLElement;
const $calendarContainer = document.querySelector('.main-container') as HTMLElement;
const $reserveContainer = document.querySelector('.reservation-container') as HTMLElement;

export const setBtnDisplay = (btnPrev: string, btnNext: string): void => {
  $btnNext.style.display = btnNext;
  $btnPrev.style.display = btnPrev;
};

const findCheckedEl = () => {
  const checkedEl = Array.from($radioSection.querySelectorAll('input')) //
    .find(radio => radio.checked) as HTMLInputElement;

  checkedEl.checked = false;
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

  $calendarContainer.addEventListener('click', e => {
    const eventTarget = e.target as HTMLElement;

    if (!eventTarget.matches('button')) return;

    state.today = `${state.year}-${state.month + 1}-${eventTarget.id}`;
    changeRadioDisabled();
    calendarRender();
  });

  $radioSection.addEventListener('change', e => {
    const eventTarget = e.target as HTMLElement;

    (document.querySelector('.reservation-completed') as HTMLButtonElement).disabled = false;

    $radioSection.querySelector('.active')?.classList.remove('active');
    eventTarget.closest('.radio-container')?.classList.add('active');

    state.time = $radioSection.querySelector('.active')?.textContent?.trim() as StateTime;
  });

  $reserveBtnGroup.addEventListener('click', e => {
    const eventTarget = e.target as HTMLElement;

    if (eventTarget.matches('.reservation-completed')) {
      setReserveInfo();
      postReserveInfo(reserveData);
      renderCompleted(reserveData);
    }

    $reserveContainer.classList.remove('active');
    (document.querySelector('.reservation-completed') as HTMLButtonElement).disabled = true;

    findCheckedEl();
  });

  $reserveContainer.addEventListener('click', e => {
    const eventTarget = e.target as HTMLElement;

    if (eventTarget === $reserveContainer) $reserveContainer.classList.remove('active');
  });
};
