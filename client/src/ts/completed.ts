import { ReserveData } from './interface/ReserveData';
import { deleteReserveInfo } from './ajax/ajaxReserveInfo';

const renderCompleted = (reserveData: ReserveData) => {
  // Datas
  const {
    movieImg,
    movieTitle,
    reserveDate,
    reserveTime,
    reserveId,
  } = reserveData;

  const reserveDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][
    new Date(reserveDate).getDay()
  ];

  const qrData = `예약 번호: ${reserveId} / 영화 제목: ${movieTitle} / 예약 날짜: ${reserveDate} / 예약 시간: ${reserveTime}`;

  // Rendering on Runtime
  (document.querySelector('.completed') as HTMLElement).innerHTML = `
    <h3 class="completed_movie-title">${movieTitle}</h3>
      <div class="completed_reservation-number">
        예약 번호<span class="reservation-number">${reserveId}</span>
      </div>
      <img
        class="completed_image"
        src="${movieImg}"
        alt="${movieTitle}"
      />
      <div class="completed_reservation-details">
        <p class="completed_reservation-details_date">${reserveDate} (${reserveDay})</p>
        <p class="completed_reservation-details_time">${reserveTime}</p>
      </div>
      <div class="completed_qrcode">
        BORDER BOX
        <img class="completed_qrcode_image" src="src/img/tail-spin.svg" alt="QR코드" />
    </div>
    <button class="completed_cancel">예약 취소</button>
    <button class="completed_close"><i class="bx bx-x"></i></button>
  `;

  setTimeout(() => {
    (document.querySelector(
      '.completed_qrcode_image'
    ) as HTMLImageElement).src = `http://api.qrserver.com/v1/create-qr-code/?data=${qrData}&size=100x100`;
  });

  (document.querySelector('.completed') as HTMLElement).classList.add('active');

  // Functions
  const closeCompleted = () => {
    (document.querySelector('.completed') as HTMLElement).classList.remove(
      'active'
    );
  };

  const cancelReserve = () => {
    if (window.confirm('예약을 취소하시겠습니까?')) {
      deleteReserveInfo(reserveId);
      window.alert('예약이 취소되었습니다.');
      closeCompleted();
    }
  };

  // Event Listeners
  (document.querySelector(
    '.completed_overlay'
  ) as HTMLElement).addEventListener('click', closeCompleted);

  (document.querySelector(
    '.completed_cancel'
  ) as HTMLButtonElement).addEventListener('click', cancelReserve);

  (document.querySelector(
    '.completed_close'
  ) as HTMLButtonElement).addEventListener('click', closeCompleted);
};

export default renderCompleted;
