import throttle from './utils/throttle';

export default () => {
  const $privateContainer = document.querySelector(
    '.private-container'
  ) as HTMLElement;
  const $premiumImg = document.querySelector('.premium-img') as HTMLElement;
  const $premiumText = document.querySelector('.premium-text') as HTMLElement;
  
  window.onscroll = throttle(() => {
    $privateContainer.style.display =
      window.pageYOffset >= 400 ? 'block' : 'none';
    $premiumImg.style.display = window.pageYOffset >= 400 ? 'block' : 'none';
    $premiumText.style.display = window.pageYOffset >= 400 ? 'block' : 'none';
  }, 100);
};


