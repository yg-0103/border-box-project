import axios from 'axios';
import { state } from '../model';

const $radioContainer = document.querySelector('.radio-section') as HTMLElement;
const $radio = $radioContainer.querySelectorAll('input');

export const changeRadioDisabled = async () => {
  try {
    const { data: reserveInfo } = await axios.get('/reserve');
    const activeTime = reserveInfo
      .filter(({ reserveDate }: {reserveDate: string}) => reserveDate === state.today)
      .map(({ reserveTime }: { reserveTime: string}) => reserveTime);

    Array.from($radio).forEach(radio => {
      radio.disabled = activeTime.includes(radio.parentNode?.textContent?.trim());
    });
  } catch (e) {
    throw new Error('failed get reserveInfo');
  }
};
