import { ReserveData } from './model';

// interface ReserveData {
//   movieImg: string;
//   movieTitle: string;
//   reserveDate: string;
//   reserveTime: string;
// }

const renderCompleted = ({
  movieImg,
  movieTitle,
  reserveDate,
  reserveTime,
}: ReserveData) => {
  const reserveDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][
    new Date(reserveDate).getDay()
  ];

  const reserveNumber = reserveDate.replace('/-/g', '') + (reserveTime as string).slice(0, 1);

  const qrData = `
    예약 번호: ${reserveNumber} /
    영화 제목: ${movieTitle} /
    예약 날짜: ${reserveDate} /
    예약 시간: ${reserveTime}
  `;

  (document.querySelector('.completed') as HTMLElement).innerHTML = `
    <h3 class="completed_movie-title">${movieTitle}</h3>
      <div class="completed_reservation-number">
        예약 번호<span class="reservation-number">${reserveNumber}</span>
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
        <img class="completed_qrcode_image" src="http://api.qrserver.com/v1/create-qr-code/?data=${qrData}&size=120x120" alt="QR코드" />
    </div>
  `;
};

export default renderCompleted;
