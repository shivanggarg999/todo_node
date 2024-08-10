import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
        console.log(`mongo connected ! ${conn.connection.host}`);
    } catch (error) {
        console.log(`error on connecting mongo ${process.env.MONGO_URL}/${process.env.DB_NAME} ${error}`);
        process.exit(1);
    }
}
const connection = connectDB();

export default connection;