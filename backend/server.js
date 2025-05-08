const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./src/config/db');
const { formatResponse } = require('./src/utils/responseUtils');
const { ERROR_MESSAGES } = require('./src/utils/constants');
require('dotenv').config();

const app = express();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        error: 'Too many requests from this IP, please try again later.'
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', limiter);

// Health check route
app.get('/health', (req, res) => {
    res.json(formatResponse(true, { status: 'OK' }));
});

// Connect MongoDB
connectDB();

// Routes
app.use('/api/ai', require('./src/routes/aiRoutes'));

// 404 handler
app.use((req, res) => {
    res.status(404).json(
        formatResponse(false, null, 'Route not found')
    );
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json(
        formatResponse(false, null, err.message || ERROR_MESSAGES.GENERAL_ERROR)
    );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    // Do not exit the process in production
    if (process.env.NODE_ENV === 'development') {
        process.exit(1);
    }
});