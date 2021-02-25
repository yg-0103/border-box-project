const axios = require('axios');
const isSameTitle = require('./isSameTitle');

const KOBIS_KEY = '944ccabbee050d715b5a71b81640b460';
const KOBIS_URL = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KOBIS_KEY}&targetDt=`;
const NAVER_URL = `https://openapi.naver.com/v1/search/movie.json?query=`;
const NAVER_CLIENT_ID = '1eJFVC1DoeMybz2HOAyD';
const NAVER_CLIENT_SECRET_ID = 'rWgOmb2Qxy';

const ajaxNaverMovie = axios.create({
  baseURL: NAVER_URL,
  headers: {
    'X-Naver-Client-Id': NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': NAVER_CLIENT_SECRET_ID,
  },
});

const getNaverMovies = async serchWord => {
  try {
    const {
      data: { items: movies },
    } = await ajaxNaverMovie.get(encodeURI(`${serchWord}&display=2`));

    return movies;
  } catch (e) {
    throw new Error('failed: get naver moive');
  }
};

const getBoxOfficeMovies = async today => {
  try {
    const {
      data: {
        boxOfficeResult: { dailyBoxOfficeList },
      },
    } = await axios.get(`${KOBIS_URL}${today}`);

    const movieNameAndRank = dailyBoxOfficeList.map(({ movieNm, rank }) => ({
      movieNm,
      rank,
    }));

    console.log(movieNameAndRank);
    const naverMovies = await Promise.all(movieNameAndRank.map(({ movieNm }) => getNaverMovies(movieNm)));

    const boxOfficeMovie = naverMovies
      .flat()
      .filter(({ title, userRating }) => isSameTitle(title) && userRating !== '0.00');

    return {
      boxOfficeMovie,
      movieNameAndRank,
    };
  } catch (e) {
    throw new Error('failed: get box office movie');
  }
};

module.exports = {
  getNaverMovies,
  getBoxOfficeMovies,
};
