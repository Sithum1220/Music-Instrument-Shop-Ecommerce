const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;

const db = async () => {

    try {
        const con = await mongoose.connect(MONGODB_URL);
        console.info(`Mongo DB Connected to:${con.connection.host}`);
    } catch (err) {
        console.error("Mongo Db Connect Error:", err);
    }
}
module.exports=db;