const apis = require('./utils/apis');
const express = require('express');
const app = express();

app.use(express.static('../client'));

app.use(express.json());

let movieList = [];

let reserveInformation = [];

app.get('/movielist/:today', async (req, res) => {
  console.log(req.params);
  movieList = await apis.getBoxOfficeMovies(req.params.today);

  res.send(movieList);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
