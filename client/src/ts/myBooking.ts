import axios from 'axios';
import renderCompleted from './completed';

const myBooking = () => {
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
  };

  const closeMybooking = () => {
    $myBooking.classList.remove('active');
    $invalid.textContent = '';
    $invalid.style.display = 'none';
    clearInput();
  };

  const getReserveData = async () => {
    try {
      const response = await axios.get(
        `/reserve/${$myBookingInput.value.toUpperCase()}`
      );
      const reserveData = await response.data;

      return reserveData;
    } catch (err) {
      console.error(err);
    }
  };

  $btnMyBooking.addEventListener('click', openMyBooking);
  $closeBtn.addEventListener('click', closeMybooking);
  (document.querySelector(
    '.myBooking_overlay'
  ) as HTMLElement).addEventListener('click', closeMybooking);

  $myBookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!/\d{8}[A-C|a-c]/.test($myBookingInput.value)) {
      showInvalid('예약 번호의 형식에 맞지 않습니다. (예: 20201225A)');
      return;
    }

    const reserveData = await getReserveData();
    if (!reserveData) {
      showInvalid('해당 예약 번호에 대한 정보가 없습니다.');
    } else {
      renderCompleted(reserveData);
      closeMybooking();
    }
  });
};

export default myBooking;
