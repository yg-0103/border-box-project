import { state } from './store';

export const initializeDate = () => {
  const date = new Date();
  state.date = date.getDate();
  state.year = date.getFullYear();
  state.month = date.getMonth();
  state.today = `${state.year}-${state.month + 1}-${state.date}`;
};
