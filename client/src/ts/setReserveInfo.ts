import { ReserveData, reserveData, state } from './model';

export const setReserveInfo = (():(() => ReserveData) => {
  const generateReserveId = () => state.today.split('-').map(day => (+day < 10 ? '0' + day : day)).join('') + state.time[0];

  return () => {
    reserveData.movieImg = (document.querySelector('.img-container img') as HTMLImageElement).src;
    reserveData.movieTitle = (document.querySelector('.reservation_movie-title') as HTMLElement).textContent;
    reserveData.reserveDate = state.today;
    reserveData.reserveTime = state.time;
    reserveData.reserveId = generateReserveId();

    return reserveData;
  };
})();
