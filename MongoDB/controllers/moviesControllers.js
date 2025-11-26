const { ObjectId } = require('mongodb');
const { initDB } = require('../dbConfig');

let moviesCollection;
async function getMoviesCollection() {
    const collectionName = 'movies';
    moviesCollection = await initDB(collectionName);
}
getMoviesCollection();

const getMovies = async (req, res) => {

    try {
        const movies = await moviesCollection.find().toArray();
        res.send({status : 'success', movies : movies});
    } catch (err) {
        console.log('Error connection to DB');
        res.status(500).send({status : 'Error', msg : 'Error movies connection to DB'});
    }
}

const getMoviesById = async (req, res) => {
    const { movieId } = req.params;
    
    try {
        const movie = await moviesCollection.findOne({_id : new ObjectId(movieId)});
        if(!movie) {
            res.send({status : 'Error', msg : 'movie not found'});
        } else {
            res.send({status : 'success', movie : movie});
        }
    } catch (err) {
        console.log("Error connection to DB");
        res.status(500).send({status : 'Error', msg : 'Error fetching movies from DB'});
    }
}

const postMovie = async (req, res) => {
    const movieData = req.body;

    try {
        await moviesCollection.insertOne(movieData);
        res.status(201).send({status : 'success'});
    } catch (err) {
      
        res.send({status : 'Error', msg : 'Internal Error'});
    }
}

const updatedMovieById = async (req, res) => {
    const { movieId } = req.params;
    const updatedMovie = req.body;

    try {
        await moviesCollection.updateOne({_id : new ObjectId(movieId)}, {$set : updatedMovie});
        res.send({status : 'updatedSuccessfully'});
    } catch (err) {
        res.send({status : 'Error', msg : 'cannot update movie'});
    }
}

const deleteMovieById = async (req, res) => {
    const { movieId } = req.params;

    try {
        await moviesCollection.deleteOne({_id : new ObjectId(movieId)});
        res.send({status : 'deletedSuccessfully'});
    } catch (err) {
        res.send({status : 'Error', msg : 'movie not be deleted'});
    }
}


module.exports = {
    getMovies,
    getMoviesById,
    postMovie,
    updatedMovieById,
    deleteMovieById
}