const express = require('express');

const { getMovies, getMoviesById, postMovie, updatedMovieById, deleteMovieById } = require('./controllers/moviesControllers');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());

app.get('/movies', getMovies);
app.get('/movies/:movieId', getMoviesById);
app.post('/movies', postMovie);
app.put('/movies/:movieId', updatedMovieById);
app.delete('/movies/:movieId', deleteMovieById);

app.listen(8000, (err) => {
    console.log("server is started successfully");
})