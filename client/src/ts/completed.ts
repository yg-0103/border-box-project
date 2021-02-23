import axios from 'axios';
import { ReserveData } from './model';

const renderCompleted = ({
  movieImg,
  movieTitle,
  reserveDate,
  reserveTime,
}: ReserveData) => {
  const reserveDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][
    new Date(reserveDate).getDay()
  ];

  const reserveId =
    new Date(reserveDate).getMonth() > 8
      ? reserveDate.replace(/-/g, '') + (reserveTime as string).slice(0, 1)
      : (reserveDate.slice(0, 4) + '0' + reserveDate.slice(4)).replace(
          /-/g,
          ''
        ) + (reserveTime as string).slice(0, 1);

  const reserveData: ReserveData = {
    movieImg,
    movieTitle,
    reserveDate,
    reserveTime,
    reserveId,
  };

  const postReserveData = async () => {
    const reserve = await axios.post('/reserve', reserveData);
    console.log(reserve);
  };

  postReserveData();

  const qrData = `예약 번호: ${reserveId} / 영화 제목: ${movieTitle} / 예약 날짜: ${reserveDate} / 예약 시간: ${reserveTime}`;

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
  `;

  setTimeout(() => {
    (document.querySelector(
      '.completed_qrcode_image'
    ) as HTMLImageElement).src = `http://api.qrserver.com/v1/create-qr-code/?data=${qrData}&size=120x120`;
  });

  document
    .querySelector('.completed_overlay')
    ?.addEventListener('click', () => {
      (document.querySelector('.completed') as HTMLElement).classList.remove(
        'active'
      );
    });
};

export default renderCompleted;
