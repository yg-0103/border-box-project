const movieDetail = () => {
  // DOM Elements
  const $detail = document.querySelector('.detail') as HTMLElement;
  const $detailSpinner = document.querySelector(
    '.detail_spinner'
  ) as HTMLElement;
  const $detailIframe = document.querySelector(
    '.detail iframe'
  ) as HTMLIFrameElement;
  const $detailOverlay = document.querySelector(
    '.detail_overlay'
  ) as HTMLElement;
  const $detailBtns = document.querySelectorAll(
    '.movie-details'
  ) as NodeListOf<HTMLButtonElement>;

  // Functions
  const showDetail = (e: Event) => {
    $detail.classList.add('active');
    const link = (e.currentTarget as HTMLButtonElement).dataset.link as string;
    $detailIframe.src = link;
    setTimeout(() => {
      $detailSpinner.style.display = 'none';
    }, 500);
  };

  const closeDetail = () => {
    $detailIframe.src = '';
    $detail.classList.remove('active');
    $detailSpinner.style.display = 'block';
  };

  // Event Listeners
  $detailBtns.forEach((btn) => {
    btn.addEventListener('click', (e: Event) => {
      showDetail(e);
    });
  });

  $detailOverlay.addEventListener('click', closeDetail);
};

export default movieDetail;
