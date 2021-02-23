const TOP_POS_TO_START_SHOWING = 200;
const $goToTop = document.querySelector('.gototop') as HTMLElement;

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

export default () => {
  window.addEventListener('scroll', throttle(() => {
    $goToTop.style.transform = window.pageYOffset > TOP_POS_TO_START_SHOWING
      ? 'translate3d(0, -50px, 0)'
      : 'translate3d(0, 200px, 0)';
  }, 200));

  $goToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  });
};
