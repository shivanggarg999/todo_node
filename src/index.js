import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import Routes from './routes/index.route.js';
import CommanMiddleware from './middlewares/Comman.middleware.js';
import {connect_mongoDB} from "./db/index.js";

// config env path & connect to database
dotenv.config({path: './.env'});
connect_mongoDB();

// create app from express and some middleweres
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get middleweres
CommanMiddleware(app);

// get all the routes
Routes(app);


app.listen(process.env.PORT, () => {
    console.log(`App is runnig on port : ${process.env.PORT}`)
})

