import mongoose from "mongoose";
import { logger } from "../services/logger.js";

export const connect_mongoDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
        console.log(`mongoDB connected @${conn.connection.host} ${conn.connection.name}`);
    } catch (error) {
        logger.error(`error on connecting mongo ${process.env.MONGO_URL}/${process.env.DB_NAME} ${error}`);
        process.exit(1);
    }
}