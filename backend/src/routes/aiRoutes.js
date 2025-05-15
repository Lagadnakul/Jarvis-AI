import express from 'express';
import { 
    processCommand, 
    stopSpeakingHandler as stopSpeaking, 
    getAvailableVoices 
} from '../controllers/aiController.js';
import { formatResponse } from '../utils/responseUtils.js';

const router = express.Router();

// Process voice/text commands
router.post('/process', async (req, res, next) => {
    try {
        await processCommand(req, res);
    } catch (error) {
        next(error);
    }
});

// Stop text-to-speech
router.post('/stop-speaking', async (req, res, next) => {
    try {
        await stopSpeaking(req, res);
    } catch (error) {
        next(error);
    }
});

// Get available voices
router.get('/voices', async (req, res, next) => {
    try {
        await getAvailableVoices(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;