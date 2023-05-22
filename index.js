import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();
import genreGamesActions from './controllers/genreGamesActions.js';
import accountController from './controllers/accountActions.js';

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const port = process.env.PORT;

app.use('/api',genreGamesActions);
app.use('/api/account',accountController);

mongoose.connect(process.env.MONGO_URL)
.then(result => {
    app.listen(port, ()=> {
        console.log(`The server is running via ${port}`);
    });
})
.catch(error => {
    console.log(error.message);
})
