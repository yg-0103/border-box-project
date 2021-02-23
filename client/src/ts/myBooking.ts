import axios from 'axios';
import renderCompleted from './completed';

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

const cleanInput = () => {
  $myBookingInput.value = '';
};

const closeMybooking = () => {
  $myBooking.classList.remove('active');
  $invalid.textContent = '';
  $invalid.style.display = 'none';
  cleanInput();
};

const getReserveData = async () => {
  try {
    const response = await axios.get(`/reserve/${$myBookingInput.value}`);
    const reserveData = await response.data;

    return reserveData;
  } catch (err) {
    console.error(err);
  }
};

const myBooking = () => {
  $btnMyBooking.addEventListener('click', () => {
    $myBooking.classList.add('active');
  });
  $closeBtn.addEventListener('click', closeMybooking);

  (document.querySelector(
    '.myBooking_overlay'
  ) as HTMLElement).addEventListener('click', closeMybooking);

  $myBookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!/\d{8}[A-C]/.test($myBookingInput.value)) {
      $invalid.textContent = '예약 번호의 형식에 맞지 않습니다.';
      $invalid.style.display = 'inline-block';
      cleanInput();
      return;
    }

    const reserveData = await getReserveData();
    if (!reserveData) {
      $invalid.textContent = '해당 예약 번호에 대한 정보가 없습니다.';
      $invalid.style.display = 'inline-block';
      $myBookingInput.value = '';
      return;
    } else {
      renderCompleted(reserveData);
      closeMybooking();
    }
  });
};

export default myBooking;
