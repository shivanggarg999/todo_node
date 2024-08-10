import dotenv from 'dotenv';
import express from 'express';
import Routes from './routes/index.route.js';
import CommanMiddlewares from './middlewares/Comman.middleware.js';
import {connect_mongoDB} from "./db/index.js";

dotenv.config({path: './.env'});
connect_mongoDB();
const app = express();

// add some comman middleweres
CommanMiddlewares(app, express);

// get all the routes
Routes(app);


app.listen(process.env.PORT, () => {
    console.log(`App is runnig on port : ${process.env.PORT}`)
})