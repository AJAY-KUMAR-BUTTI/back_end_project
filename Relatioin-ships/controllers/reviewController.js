const movieModel = require("../models/movieModel");
const ReviewModel = require("../models/reviewModel");

const addReview = async (req, res) => {
    const { movieId } = req.params;
    const { comment, userName } = req.body;

    try {
      const newReview = await ReviewModel.create({ comment, userName, movieId });
     const movieDoc = await movieModel.findByIdAndUpdate(movieId, {
        $push : {
            reviews : newReview._id
        }
      })
      res.send({status : 'success', review : newReview });
    } catch (error) {
      res.send({status : 'error', msg : 'Review was not added successfully'})
    }
}

const getAllReviews = async (req, res) => {
  const { movieId } = req.params;

  try {
    const reviews = await ReviewModel.find({ movieId });
    res.send({status : 'success', review : reviews });

  } catch (error) {
    res.send({status : 'error', msg : 'Reviews cannot be fetched' })

  }
}

module.exports = {
    addReview,
    getAllReviews
}