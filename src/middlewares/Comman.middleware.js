import morgan from 'morgan';
import {logger} from '../services/logger.js';


const CommanMiddleware =  (app, express) => {
    app.use(express.json({ extended: false }));
    app.use(express.urlencoded({ extended: false }));

    const morganFormat = ':method :url :status :response-time ms :req[header]';
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

export default CommanMiddleware;