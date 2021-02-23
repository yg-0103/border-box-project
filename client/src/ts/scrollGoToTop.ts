import throttle from './utils/throttle';

const TOP_POS_TO_START_SHOWING = 200;
const $goToTop = document.querySelector('.gototop') as HTMLElement;

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
