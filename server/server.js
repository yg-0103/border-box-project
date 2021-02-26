const apis = require('./utils/apis');
const express = require('express');
const app = express();

app.use(express.static('../client'));

app.use(express.json());

let movieList = [];

let reserveInformation = [];

app.get('/movielist/:today', async (req, res) => {
  console.log(req.params);
  const { movieNameAndRank, boxOfficeMovie } = await apis.getBoxOfficeMovies(req.params.today);

  movieList = boxOfficeMovie.map((movie, i) => ({
    ...movie,
    ...movieNameAndRank[i],
  }));

  res.send(movieList);
});

app.get('/reserve', (req, res) => {
  res.send(reserveInformation);
});

app.get('/reserve/:id', (req, res) => {
  const reserve = reserveInformation.find(({ reserveId }) => req.params.id === reserveId);

  res.send(reserve);
});

app.post('/reserve', (req, res) => {
  reserveInformation = [...reserveInformation, req.body];

  res.send(reserveInformation);
});

app.delete('/reserve/:id', (req, res) => {
  const id = req.params.id;
  reserveInformation = reserveInformation.filter(({ reserveId }) => reserveId !== id);

  res.send(reserveInformation);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
