// import renderCompleted from './completed';
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
  cleanInput();
};

const myBooking = (() => {
  $btnMyBooking.addEventListener('click', () => {
    $myBooking.classList.add('active');
  });
  $closeBtn.addEventListener('click', closeMybooking);

  $myBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!/\d{8}[A-C]/.test($myBookingInput.value)) {
      $invalid.style.display = 'inline-block';
      cleanInput();
      return;
    }

    /*
    $myBookingInput.value로 서버에서 해당 예매 정보 검색
    -> 찾은 객체를 인수로 completed의 render 함수 실행
    renderCompleted()
    */
    closeMybooking();
  });

  return () => {};
})();

export default myBooking;
