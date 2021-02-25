const trailer = (() => {
  const API_KEY = 'AIzaSyDY5xWukKRJb3ijn5wv0WumkzaWAzwHWik';

  const $trailer = document.querySelector('.trailer') as HTMLElement;
  const $trailerVideo = document.querySelector(
    '.trailer video'
  ) as HTMLVideoElement;

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
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

    console.log(youtubeUrl);
    // cross origin error
    document.querySelector('.trailer video').src = youtubeUrl;
  };

  return {
    show(movieTitle: string) {
      gapi.load('client:auth2', () => {
        getTrailerLink(movieTitle);
      });
      $trailerVideo.src = movieTitle;
      $trailer.classList.add('active');
    },
    close() {
      $trailerVideo.src = '';
      $trailer.classList.remove('active');
    },
  };
})();

export default trailer;
