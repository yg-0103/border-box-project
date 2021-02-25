declare let gapi: any;

const movieTrailer = () => {
  const API_KEY = 'AIzaSyCRRHIXNBZh3_7z4svlxtKFEKSGFCbeVDA';

  // DOM Elements
  const $trailer = document.querySelector('.trailer') as HTMLElement;
  const $trailerIframe = document.querySelector(
    '.trailer iframe'
  ) as HTMLVideoElement;
  const $trailerSpinner = document.querySelector(
    '.trailer_spinner'
  ) as HTMLElement;
  const $trailerOverlay = document.querySelector(
    '.trailer_overlay'
  ) as HTMLElement;
  const $movieItems = document.querySelectorAll(
    '.boxoffice_list li'
  ) as NodeListOf<HTMLElement>;

  // Youtube API
  const setTrailerUrl = (movieTitle: string) => {
    gapi.load('client:auth2', async () => {
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
    });
  };

  // Functions
  const showTrailer = (e: Event) => {
    if ((e.target as HTMLElement).matches('button')) return;

    const movieTitle = ((e.currentTarget as HTMLElement).querySelector(
      '.movie-title'
    ) as HTMLElement).textContent as string;

    setTrailerUrl(movieTitle);

    $trailer.classList.add('active');
    setTimeout(() => {
      $trailerSpinner.style.display = 'none';
    }, 500);
  };

  const closeTrailer = () => {
    $trailerIframe.src = '';
    $trailer.classList.remove('active');
    $trailerSpinner.style.display = 'block';
  };

  // Event Listners
  $movieItems.forEach((movieItem) => {
    movieItem.addEventListener('click', (e: Event) => {
      showTrailer(e);
    });
  });

  $trailerOverlay.addEventListener('click', closeTrailer);
};

export default movieTrailer;
