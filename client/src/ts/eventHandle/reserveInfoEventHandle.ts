import { getReserve } from '../ajax/ajaxReserveInfo';
import reserveInfoRender from '../reserveInfoRender';

const $userReserve = document.querySelector('.user-reserve') as HTMLElement;
const $checkReserveBtn = document.querySelector('.check-reservation') as HTMLButtonElement;
const $userReserveContainer = document.querySelector('.user-reserve-list') as HTMLElement;

export default () => {
  $checkReserveBtn.addEventListener('click', () => {
    $userReserve.classList.toggle('active');
    getReserve(reserveInfoRender);
  });

  $userReserveContainer.addEventListener('click', e => {
    const eventTarget = e.target as HTMLElement;

    if (!eventTarget.matches('i')) return;
    $userReserve.classList.remove('active');
  });

  $userReserveContainer.parentNode?.addEventListener('click', () => {
    $userReserve.classList.remove('active');
  });
};
