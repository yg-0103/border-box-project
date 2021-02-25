import { ReserveData } from './interface/ReserveData';

const $userReserveContainer = document.querySelector('.user-reserve-list') as HTMLElement;

const reserveInfoRender = (reserveInfo: ReserveData[]) => {
  $userReserveContainer.innerHTML = `
  <tr>
    <th></th>
    <th>제목</th>
    <th>예약 번호</th>
    <th>날짜</th>
    <th>시간</th>
  </tr>
  ${reserveInfo.map((info, i) => `
  <tr>
    <td><b>${i + 1}</b></td>
    <td>${info.movieTitle}</td>
    <td>${info.reserveId}</td>
    <td>${info.reserveDate}</td>
    <td>${info.reserveTime}</td>
  </tr>
  <button class="user-reserve-close-btn"><i class="bx bx-x"></i></button>
  `).join('')}`;
};

export default reserveInfoRender;
