import dotenv from 'dotenv';
dotenv.config({path: './.env'});
import connection from "./db/index.js";
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

import CommanMiddleware from './middlewares/Comman.middleware.js';
CommanMiddleware(app, express);

import Routes from './routes/index.route.js';
Routes(app);


app.listen(process.env.PORT, () => {
    console.log(`App is runnig on port : ${process.env.PORT}`)
})

