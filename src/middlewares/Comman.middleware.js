import morgan from 'morgan';
import {logger} from '../services/logger.js';


const CommanMiddleware =  (app) => {
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

export default CommanMiddleware;