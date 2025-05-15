import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { OpenAI } from 'openai';
import { MODELS, API_LIMITS, ERROR_MESSAGES } from '../utils/constants.js';
import { formatResponse, getFallbackResponse } from '../utils/responseUtils.js';
import { speakText, stopSpeaking, getVoices } from '../utils/speechUtils.js';
import Conversation from '../models/conversation.js';

// Set up path for env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../../.env') });

// Initialize OpenAI with error handling and retries
let openai;
try {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key is not set in environment variables');
    }
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY.trim(),
        maxRetries: API_LIMITS.MAX_RETRIES,
        timeout: 30000 // 30 second timeout
    });
} catch (error) {
    console.error('OpenAI initialization error:', error);
    if (process.env.NODE_ENV === 'development') {
        process.exit(1);
    }
}

// Process commands with improved error handling
export const processCommand = async (req, res) => {
    try {
        const { input } = req.body;
        
        if (!input || typeof input !== 'string') {
            return res.status(400).json(
                formatResponse(false, null, 'Invalid input provided')
            );
        }

        let response;
        try {
            if (!openai) {
                throw new Error('OpenAI client not initialized');
            }

            // Try OpenAI with system context
            const completion = await openai.chat.completions.create({
                model: MODELS.GPT_MODEL,
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful AI assistant named Jarvis. You provide clear, concise, and accurate responses."
                    },
                    { 
                        role: "user", 
                        content: input 
                    }
                ],
                max_tokens: API_LIMITS.MAX_TOKENS,
                temperature: 0.7,
                presence_penalty: 0.6,
                frequency_penalty: 0.5
            });
            response = completion.choices[0].message.content.trim();
        } catch (openaiError) {
            console.error('OpenAI Error:', openaiError);
            // Check for specific OpenAI errors
            if (openaiError.code === 'insufficient_quota') {
                response = ERROR_MESSAGES.QUOTA_EXCEEDED;
            } else {
                response = getFallbackResponse(input);
            }
        }

        // Save conversation with error handling
        try {
            await Conversation.create({ 
                input, 
                response,
                timestamp: new Date()
            });
        } catch (dbError) {
            console.error('Database Error:', dbError);
            // Log but continue if save fails
        }

        // Handle text-to-speech with cleanup
        try {
            await stopSpeaking();
            await speakText(response);
        } catch (speechError) {
            console.error('Speech Error:', speechError);
            // Log but continue if speech fails
        }

        res.json(formatResponse(true, { 
            input, 
            response,
            timestamp: new Date()
        }));
    } catch (error) {
        console.error('Processing Error:', error);
        res.status(error.status || 500).json(
            formatResponse(false, null, error.message || ERROR_MESSAGES.GENERAL_ERROR)
        );
    }
};

// Enhanced stop speaking handler
export const stopSpeakingHandler = async (req, res) => {
    try {
        await stopSpeaking();
        res.json(formatResponse(true, { 
            message: 'Speech stopped successfully',
            timestamp: new Date()
        }));
    } catch (error) {
        console.error('Stop Speaking Error:', error);
        res.status(500).json(
            formatResponse(false, null, ERROR_MESSAGES.GENERAL_ERROR)
        );
    }
};

// Enhanced voice handler
export const getAvailableVoices = async (req, res) => {
    try {
        const voices = await getVoices();
        res.json(formatResponse(true, { 
            voices,
            timestamp: new Date()
        }));
    } catch (error) {
        console.error('Get Voices Error:', error);
        res.status(500).json(
            formatResponse(false, null, ERROR_MESSAGES.VOICE_NOT_FOUND)
        );
    }
};