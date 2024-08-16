import {logger} from '../services/logger.js';
import multer from 'multer';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser  from "cookie-parser";

const upload = multer();


const CommanMiddlewares =  (app, express) => {
    app.use(cookieParser());
    app.use(upload.none());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));


    
    // log the incoming reuqest with morgan middlewere
    const morganFormat = ':method :url :status :response-time ms';
    app.use(morgan(morganFormat,{
            stream: {
                write: (message) => {
                    const logObject = {
                        method: message.split(' ')[0],
                        url: message.split(' ')[1],
                        status: message.split(' ')[2],
                        responseTime: message.split(' ')[3],
                    };
                    logger.http(JSON.stringify(logObject));
                }
            }
        }
    ));
}

export default CommanMiddlewares;