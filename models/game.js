import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    genreId : {type: mongoose.Schema.Types.ObjectId,ref: 'Genre'},
    gameName : String,
    gameDesc: String,
    gameRating: String,
    gamePrice: Number,
    gameReleaseDate : Date,
    gameImageCover: String,
    gameGallery: [{
        imageSource: String,
        imageDesc: String
    }],
    gameReviews:[{
        createdAt:Date,
        title:String,
        review:String  
    }]
});

export default mongoose.model('Game',gameSchema);