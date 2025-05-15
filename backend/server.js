import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import aiRoutes from './src/routes/aiRoutes.js';
import { formatResponse } from './src/utils/responseUtils.js';
import { ERROR_MESSAGES } from './src/utils/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Configure rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: formatResponse(false, null, ERROR_MESSAGES.RATE_LIMIT_EXCEEDED)
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', limiter);

// Routes
app.use('/api/ai', aiRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json(formatResponse(true, { status: 'Server is running' }));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(err.status || 500).json(
        formatResponse(false, null, err.message || ERROR_MESSAGES.GENERAL_ERROR)
    );
});

// Start server
const PORT = process.env.PORT || 5000;

try {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
}

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    if (process.env.NODE_ENV === 'development') {
        process.exit(1);
    }
});