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
  $invalid.style.display = 'none';
  cleanInput();
};

const myBooking = () => {
  $btnMyBooking.addEventListener('click', () => {
    $myBooking.classList.add('active');
  });
  $closeBtn.addEventListener('click', closeMybooking);

  (document.querySelector(
    '.myBooking_overlay'
  ) as HTMLElement).addEventListener('click', closeMybooking);

  $myBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!/\d{8}[A-C]/.test($myBookingInput.value)) {
      $invalid.style.display = 'inline-block';
      cleanInput();
      return;
    }
    const getReserveData = async () => {
      const reserveData = await axios.get(`/reserve/${$myBookingInput.value}`);
      console.log(reserveData);
    };

    getReserveData();

    closeMybooking();
  });
};

export default myBooking;
