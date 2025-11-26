const { Router } = require('express');
const movieRouter = Router();

const { getMovies , getMoviesById, postMovies, updateMoviesById, deleteMoviesById } = require('../controllers/moviesController');
const { authMiddleWare, isAdminMiddleWare } = require('../middleWares/authMiddleWare');

movieRouter.use(authMiddleWare);

movieRouter.get('/', getMovies);
movieRouter.get('/:movieId', getMoviesById);

movieRouter.post('/', isAdminMiddleWare, postMovies);
movieRouter.put('/:movieId', isAdminMiddleWare, updateMoviesById);
movieRouter.delete('/:movieId', isAdminMiddleWare, deleteMoviesById);

module.exports = movieRouter;