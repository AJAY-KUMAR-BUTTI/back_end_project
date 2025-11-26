const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const reviewSchema = new Schema({
   userName : String,
   comment : {
    type : String,
    maxLength : 100,
    required : true
   },
   likes : {
    type : Number,
    default : 0
   },
   postedTime : {
    type : Date,
    default : Date.now()
   },
   movieId : {
      type : mongoose.SchemaTypes.ObjectId,
      required : true,
      ref : 'movies'
   }
})

const ReviewModel = mongoose.model('reviews', reviewSchema);

module.exports = ReviewModel;