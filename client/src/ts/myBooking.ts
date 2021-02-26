import { getReserveItem } from './ajax/ajaxReserveInfo';
import renderCompleted from './completed';

const myBooking = () => {
  // DOM Elements
  const $btnMyBooking = document.querySelector(
    '.btn-myBooking'
  ) as HTMLButtonElement;
  const $myBooking = document.querySelector('.myBooking') as HTMLElement;
  const $myBookingForm = document.querySelector(
    '.myBooking_form'
  ) as HTMLFormElement;
  const $myBookingInput = document.getElementById(
    'myBooking_input'
  ) as HTMLFormElement;
  const $invalid = document.querySelector('.invalid') as HTMLElement;
  const $closeBtn = document.querySelector(
    '.myBooking_close'
  ) as HTMLButtonElement;

  // Functions
  const clearInput = () => {
    $myBookingInput.value = '';
  };

  const showInvalid = (message: string) => {
    $invalid.textContent = message;
    $invalid.style.display = 'inline-block';
    clearInput();
  };

  const openMyBooking = () => {
    $myBooking.classList.add('active');
    $myBookingInput.focus();
  };

  const closeMybooking = () => {
    $myBooking.classList.remove('active');
    $invalid.textContent = '';
    $invalid.style.display = 'none';
    clearInput();
  };

  // Event Listeners
  $btnMyBooking.addEventListener('click', openMyBooking);

  $closeBtn.addEventListener('click', closeMybooking);

  (document.querySelector(
    '.myBooking_overlay'
  ) as HTMLElement).addEventListener('click', closeMybooking);

  $myBookingForm.addEventListener('submit', async (e: Event) => {
    const value = $myBookingInput.value.toUpperCase();
    e.preventDefault();

    if (!/\d{8}[A-C]/.test(value)) {
      return showInvalid('예약 번호의 형식에 맞지 않습니다. (예: 20201225A)');
    }

    const reserveData = await getReserveItem(value);
    if (!reserveData) {
      return showInvalid('해당 예약 번호에 대한 정보가 없습니다.');
    }
    renderCompleted(reserveData);
    closeMybooking();
  });
};
export default myBooking;
