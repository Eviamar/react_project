import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    genreId : {type : mongoose.Schema.Types.ObjectId,ref: 'Genre'},
    addedBy : {type : mongoose.Schema.Types.ObjectId,ref: 'Account'},
    gameName : String,
    gameDesc : String,
    gameRaters : {type : Number,default:0},
    gameRating : {type : Number,default:0},
    gamePrice : Number,
    gameReleaseDate : Date,
    gameImageCover: String,
    gameGallery : [{
        imageSource : String,
    }],
    gameReviews : [{
        userAuthor: {type : mongoose.Schema.Types.ObjectId,ref: 'Account'},
        createdAt:{type : Date,default:Date.now()},
        title : String,
        review : String,
        userRating : Number,
        isCommitedReview : {type : Boolean,default:false}
    }]
});

export default mongoose.model('Game',gameSchema);