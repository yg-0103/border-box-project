import axios from 'axios';
import { state } from '../store';

const $radioContainer = document.querySelector('.radio-section') as HTMLElement;
const $radio = $radioContainer.querySelectorAll('input');

// eslint-disable-next-line no-unused-vars
export const overTimeToRadioBtn = ((): ((today: number) => void) => {
  const date = new Date();
  const day = date.getDate();
  const hour = date.getHours();
  const [$radioA, $radioB, $radioC] = Array.from($radio);

  return today => {
    $radioA.disabled = hour >= 10 && day === today;
    $radioB.disabled = hour >= 14 && day === today;
    $radioC.disabled = hour >= 18 && day === today;
  };
})();

export const changeRadioDisabled = async (today: number) => {
  try {
    const { data: reserveInfo } = await axios.get('/reserve');

    const activeTime = reserveInfo
      .filter(({ reserveDate }: {reserveDate: string}) => reserveDate === state.today)
      .map(({ reserveTime }: { reserveTime: string}) => reserveTime);

    overTimeToRadioBtn(today);

    Array.from($radio)
      .filter(radio => !radio.disabled)
      .forEach(radio => {
        radio.disabled = activeTime
          .includes(radio.parentNode
            ?.textContent
            ?.trim());
      });
  } catch (e) {
    throw new Error('failed get reserveInfo');
  }
};
