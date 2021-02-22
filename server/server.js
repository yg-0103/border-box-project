const apis = require('./utils/apis');
const express = require('express');
const app = express();

app.use(express.static('../client'));

app.use(express.json());

let movieList = [];

let reserveInformation = [];

app.get('/movielist/:today', async (req, res) => {
  console.log(req.params);
  const { movieNameAndRank, boxOfficeMovie } = await apis.getBoxOfficeMovies(
    req.params.today
  );

  movieList = boxOfficeMovie.map((movie, i) => ({
    ...movie,
    ...movieNameAndRank[i],
  }));

  res.send(movieList.slice(0, 10));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
