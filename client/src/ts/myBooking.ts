// import renderCompleted from './completed';

const myBooking = (() => {
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
  const $closeBtn = document.querySelector(
    '.myBooking_close'
  ) as HTMLButtonElement;

  $btnMyBooking.addEventListener('click', () => {
    $myBooking.classList.add('active');
  });
  $closeBtn.addEventListener('click', () => {
    $myBooking.classList.remove('active');
    $myBookingInput.value = '';
  });

  $myBookingForm.addEventListener('submit', e => {
    e.preventDefault();
    $myBooking.classList.remove('active');
    /*
    $myBookingInput.value로 서버에서 해당 예매 정보 검색
    -> 찾은 객체를 인수로 completed의 render 함수 실행
    renderCompleted()
    */
    $myBookingInput.value = '';
  });

  return () => {};
})();

export default myBooking;
