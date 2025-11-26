const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const movieSchema = new Schema({
    name : {
        type : String,
        required : true,
        maxLength : 25,
        unique : true
    },
    releaseData: {
        type : Date
    },
    language : String,
    cast : [String],
    rating : {
        type : Number,
        max : 5,
        min : 0
    },
    is3D : Boolean
})

const movieModel = mongoose.model('movies', movieSchema);
movieModel.createIndexes();
module.exports = movieModel;