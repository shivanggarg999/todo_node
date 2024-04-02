import dotenv from 'dotenv';
dotenv.config({path: './.env'});
import connectDB from "./db/index.js";
import express from 'express';
import cors from 'cors';


connectDB();
const app = express();
app.use(cors());


import CommanMiddleware from './middlewares/Comman.middleware.js';
CommanMiddleware(app, express);


import userRoutes from './routes/user.route.js';
import categoryRoutes from './routes/category.route.js';
import todoRoutes from "./routes/todo.route.js";


app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/todo', todoRoutes);





app.listen(process.env.PORT, () => {
    console.log(`app is runnig on port : ${process.env.PORT}`)
})

