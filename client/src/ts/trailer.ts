declare let gapi: any;

const trailer = (() => {
  const API_KEY = 'AIzaSyAe4GE9jSB3NeTGPGVwk2LNxqDwjRkHg4c';

  const $trailer = document.querySelector('.trailer') as HTMLElement;
  const $trailerIframe = document.querySelector(
    '.trailer iframe'
  ) as HTMLVideoElement;
  const $trailerSpinner = document.querySelector(
    '.trailer_spinner'
  ) as HTMLElement;

  const getTrailerLink = async (movieTitle: string) => {
    gapi.client.setApiKey(API_KEY);
    await gapi.client.load(
      'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
    );

    const data = await gapi.client.youtube.search.list({
      part: ['snippet'],
      q: movieTitle + ' 예고편',
    });

    const { videoId } = data.result.items[0].id;
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;

    (document.querySelector(
      '.trailer iframe'
    ) as HTMLVideoElement).src = youtubeUrl;

    $trailerSpinner.style.display = 'none';
  };

  return {
    show(movieTitle: string) {
      gapi.load('client:auth2', () => {
        getTrailerLink(movieTitle);
      });
      $trailer.classList.add('active');
    },
    close() {
      $trailerIframe.src = '';
      $trailer.classList.remove('active');
      $trailerSpinner.style.display = 'block';
    },
  };
})();

export default trailer;
