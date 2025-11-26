const movieModel = require("../models/movieModel");
const getMovies = async (req, res) => {
  const { year = 2010, rating = 8.5, page = 1, size = 3 } = req.query;
  try {
    // const movies = await movieModel.find({}, {title : 1}).skip(size * (page - 1)).limit(size);
    // const movies = await movieModel.find({}, {title : 1}).skip(size * (page - 1)).limit(size)
    const movies = await movieModel.aggregate([
    {
      $project : {
        title : 1
      }
    },
    {
      $skip : size * (page - 1)
    },
    {
      $limit : size
    }
    ])
    res.send({ status: "success", movies });
  } catch (err) {
    console.log("Error connection to DB", err);
    res.status(500).send({ status: "Error", msg: "Error fetching movies" });
  }
};

const getMoviesById = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await movieModel.findById(movieId);
    if (!movie) {
      res.status(404).send({ status: "Error", msg: "movie not found" });
    } else {
      res.send({ status: "success", movie: movie });
    }
  } catch (err) {
    console.log("Error connetion to DB");
    res.status(500).send({ status: "Error", msg: "Error fetching to DB" });
  }
};

const postMovies = async (req, res) => {
  const movieData = req.body;

  try {
    const resultMovie = await movieModel.create(movieData);
    res.status(201).send({ status: "success", movie: resultMovie });
  } catch (err) {
    console.log(err);
    res.send({ status: "Error", msg: err.errors });
  }
};

const updateMoviesById = async (req, res) => {
  const { movieId } = req.params;
  const updateMovieData = req.body;

  try {
    const updatedMovie = await movieModel.findByIdAndUpdate(
      movieId,
      updateMovieData,
      { new: true, runValidators: true }
    );
    res.send({ status: "success", movie: updatedMovie });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error", msg: "cannot update movie" });
  }
};

const deleteMoviesById = async (req, res) => {
  const { movieId } = req.params;

  try {
    const deletedMovie = await movieModel.findByIdAndDelete(movieId);
    res.send({
      status: "success",
      msg: "Deleted successfully",
      movie: deletedMovie,
    });
  } catch (err) {
    res.status(500).send({ status: "Error", msg: "movie not deleted" });
  }
};

module.exports = {
  getMovies,
  getMoviesById,
  postMovies,
  updateMoviesById,
  deleteMoviesById,
};
