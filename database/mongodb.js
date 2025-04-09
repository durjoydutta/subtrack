import mongoose from 'mongoose';
import {DB_URI, NODE_ENV} from '../config/env.js';

if (!DB_URI) {
    throw new Error("DB_URI is not defined. Please define it in .env.development/production.local");
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to MongoDB database in ${NODE_ENV} mode:)`);
    } catch (error) {
        console.error('Error connecting to database: ', error.message);
        process.exit(1);
    }
}

export default connectDB;