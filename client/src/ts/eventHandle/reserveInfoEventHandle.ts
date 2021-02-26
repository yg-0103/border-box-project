import { getReserveInfo } from '../ajax/ajaxReserveInfo';
import reserveInfoRender from '../reserveInfoRender';

const $userReserve = document.querySelector('.user-reserve') as HTMLElement;
const $checkReserveBtn = document.querySelector('.check-reservation') as HTMLButtonElement;
const $userReserveContainer = document.querySelector('.user-reserve') as HTMLElement;

export default () => {
  $checkReserveBtn.addEventListener('click', () => {
    $userReserve.classList.add('active');
    getReserveInfo(reserveInfoRender);
  });

  $userReserveContainer.addEventListener('click', e => {
    const eventTarget = e.target as HTMLElement;

    if (!eventTarget.matches('i') && eventTarget !== $userReserveContainer) return;
    $userReserve.classList.remove('active');
  });
};
