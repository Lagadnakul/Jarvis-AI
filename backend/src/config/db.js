import mongoose from 'mongoose';
import { ERROR_MESSAGES } from '../utils/constants.js';
import { formatResponse } from '../utils/responseUtils.js';

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MongoDB URI is not set in environment variables');
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // 5 second timeout
            heartbeatFrequencyMS: 10000, // 10 seconds
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Setup connection error handlers
        conn.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
        });

        conn.connection.on('disconnected', () => {
            console.error('MongoDB disconnected. Attempting to reconnect...');
        });

        return conn;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        
        // Format error response
        const errorResponse = formatResponse(false, null, 
            error.message || ERROR_MESSAGES.DATABASE_ERROR
        );

        // In development, exit on connection failure
        if (process.env.NODE_ENV === 'development') {
            console.error('Connection response:', errorResponse);
            process.exit(1);
        }

        throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
    }
};