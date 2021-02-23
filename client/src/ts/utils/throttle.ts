// eslint-disable-next-line no-unused-vars
const throttle = (callback: (() => void), delay: number): ((e: Event) => void) => {
  let timerId: ReturnType<typeof setTimeout> | null;

  return e => {
    if (timerId) return;

    timerId = setTimeout(() => {
      callback();

      timerId = null;
    }, delay, e);
  };
};

export default throttle;
