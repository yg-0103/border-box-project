const movieDetail = (() => {
  const $detail = document.querySelector('.detail') as HTMLElement;
  const $detailIframe = document.querySelector(
    '.detail iframe'
  ) as HTMLIFrameElement;

  return {
    show(link: string) {
      $detailIframe.src = link;
      $detail.classList.add('active');
    },
    close() {
      $detailIframe.src = '';
      $detail.classList.remove('active');
    },
  };
})();

export default movieDetail;
