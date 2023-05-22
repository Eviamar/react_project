import express from 'express';
import mongoose from 'mongoose';
import Game from '../models/account.js';
import Genre from '../models/genre.js';
const router = express.Router();

router.post('/createGame',async(req,res)=>{
    const game = req.body.game;
    const id = new mongoose.Types.ObjectId();
    Game.findOne({gameName: game.gameName,gameReleaseDate:game.gameReleaseDate})
    .then(async g =>{
        if(g)
        {
            return res.status(401).json({
                message: "Game already exist in database"
            })
        }
        else
        {
            const _newGame = new Game({
                _id: id,
                gameName:game.gameName,
                gameDesc:game.gameDesc,
                gameRating: game.gameRating,
                gamePrice: game.gamePrice,
                gameReleaseDate: game.gameReleaseDate,
                gameImageCover:game.gameImageCover,
                gameGallery: game.gameGallery,
                gameReviews: []
            });
            _newGame.save()
            .then(results =>
                {
                return res.status(200).json({
                    message: results
                })
            })
            .catch(error=>
                {
                return res.status(500).json({
                    message: error.message
                })
            })
        }
    })
    
})

router.post('/createGenre',async(req,res)=>{
    const {genreName,genreDesc} = req.body;
    const id = new mongoose.Types.ObjectId();

    const _newGenre = new Genre({
        _id : id,
        genreName: genreName,
        genreDesc: genreDesc
    });
    _newGenre.save()
    .then(results =>{
        return res.status(200).json({
            message: results
        })
    })
    .catch(error=>{
        return res.status(500).json({
            message: error.message
        })
    })
})

router.get('/readAllGames',async(req,res)=>{
    Game.find()
    .then(gameList=>{
        return res.status(200).json({
            message: gameList
        })
    })
    .catch(error =>{
        return res.status(500).json({
            message: error.message
        })
    })
})

router.get('/readAllGenres',async(req,res)=>{
    Genre.find()
    .then(genreList=>{
        return res.status(200).json({
            message: genreList
        })
    })
    .catch(error =>{
        return res.status(500).json({
            message: error.message
        })
    })
    
})

router.delete('/deleteGame/:gid', async(req,res)=>{
    Game.findByIdAndDelete(req.params.gid)
    .then(response=>{
        return res.status(200).json({
            message: `Game Deleted ${response}`
        })
    })
    .catch(error=> {
        return res.status(500).json({
            message: error.message
        })
    })
})

router.put('/updateGame/:gid',async(req,res)=>{
    const {gameName,gameDesc,gameRating,gamePrice,gameImage} = req.body;
    Game.findByIdAndUpdate(req.params.gid)
    .then(x =>{
        x.gameName = gameName
        x.gameDesc = gameDesc
        x.gameRating = gameRating
        x.gamePrice = gamePrice
        x.gameImage = gameImage
        x.save();
        return res.status(200).json({
            message: x
        })
    }
    )
    .catch(error =>{
    return res.status(500).json({
        message: error.message
    })
})
})

router.get('/readGameById/:gid',async(req,res)=>{
Game.findById(req.params.gid)
.then(result=>{
    return res.status(200).json({
        message: result
    })
})
.catch(error =>{
    return res.status(500).json({
        message: error.message
    })
})
})

router.get('/readGenreById/:gid',async(req,res)=>{
    Genre.findById(req.params.gid)
    .then(result=>{
        return res.status(200).json({
            message: result
        })
    })
    .catch(error =>{
        return res.status(500).json({
            message: error.message
        })
    })
    })

router.get('/readGameByGenre/:genid',async(req,res)=>{
    Game.find({genreId:req.params.genid})
    .then(results =>{
        return res.status(200).json({
            message:results
        })
    })
    .catch(error=>{
        return res.status(500).json({
            message: error.message
        })
    })

})


    
export default router;