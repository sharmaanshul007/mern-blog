import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);  // Use MONGO instead of Mongo for better convention
        console.log("Database connection successful");
    } catch (error) {
        console.error("Error in DB connection:", error);
        process.exit(1);
    }
};
