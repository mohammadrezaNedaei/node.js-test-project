import { configDotenv } from "dotenv";
import mongoose from "mongoose";


configDotenv();

const MONGODB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskdb';

export async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('connected to database');
    } catch (error) {
        console.error('connection went wrong error:', error)
    }
}