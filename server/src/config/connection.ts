import mongoose from 'mongoose';
import { MONGO_URI } from './env';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log(`
           -----------------------------------
           -     MONGODB CONNECTED           -
           -----------------------------------
        `);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};