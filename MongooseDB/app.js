const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const { initDB } = require('./dbConfig');
const { getMovies , getMoviesById, postMovies, updateMoviesById, deleteMoviesById } = require('./controllers/moviesController');

const app = express();
initDB();
app.use(express.json());

app.get('/movies', getMovies);
app.get('/movies/:movieId', getMoviesById);
app.post('/movies', postMovies);
app.put('/movies/:movieId', updateMoviesById);
app.delete('/movies/:movieId', deleteMoviesById);

app.listen(8000, () => {
    console.log(" server connected successfully");
})