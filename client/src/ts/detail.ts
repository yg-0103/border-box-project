const movieDetail = (() => {
  const $detail = document.querySelector('.detail') as HTMLElement;
  const $detailSpinner = document.querySelector(
    '.detail_spinner'
  ) as HTMLElement;
  const $detailIframe = document.querySelector(
    '.detail iframe'
  ) as HTMLIFrameElement;

  return {
    show(link: string | undefined) {
      $detailIframe.src = link as string;
      $detail.classList.add('active');
      setTimeout(() => {
        $detailSpinner.style.display = 'none';
      }, 500);
    },
    close() {
      $detailIframe.src = '';
      $detail.classList.remove('active');
      $detailSpinner.style.display = 'block';
    },
  };
})();

export default movieDetail;
