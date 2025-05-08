const OpenAI = require('openai');
const Conversation = require('../models/conversation');
const { speakText, stopSpeaking, getVoices } = require('../utils/speechUtils');
const { getFallbackResponse, formatResponse } = require('../utils/responseUtils');
const { MODELS, API_LIMITS, ERROR_MESSAGES } = require('../utils/constants');

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.processCommand = async (req, res) => {
    try {
        const { input } = req.body;
        
        if (!input || typeof input !== 'string') {
            return res.status(400).json(
                formatResponse(false, null, 'Invalid input provided')
            );
        }

        let response;
        try {
            // Try OpenAI first
            const completion = await openai.chat.completions.create({
                model: MODELS.GPT_MODEL,
                messages: [{ role: "user", content: input }],
                max_tokens: API_LIMITS.MAX_TOKENS
            });
            response = completion.choices[0].message.content.trim();
        } catch (openaiError) {
            console.error('OpenAI Error:', openaiError);
            // Fallback to local response system
            response = getFallbackResponse(input);
        }

        // Save conversation to MongoDB
        await Conversation.create({ input, response });

        // Convert response to speech
        try {
            await stopSpeaking(); // Stop any ongoing speech
            await speakText(response);
        } catch (speechError) {
            console.error('Speech Error:', speechError);
            // Continue even if speech fails
        }

        res.json(formatResponse(true, { input, response }));

    } catch (error) {
        console.error('Processing Error:', error);
        res.status(error.status || 500).json(
            formatResponse(false, null, error.message || ERROR_MESSAGES.GENERAL_ERROR)
        );
    }
};

// Add voice control endpoints
exports.stopSpeaking = async (req, res) => {
    try {
        await stopSpeaking();
        res.json(formatResponse(true, { message: 'Speech stopped successfully' }));
    } catch (error) {
        res.status(500).json(
            formatResponse(false, null, 'Failed to stop speech')
        );
    }
};

exports.getAvailableVoices = async (req, res) => {
    try {
        const voices = await getVoices();
        res.json(formatResponse(true, { voices }));
    } catch (error) {
        res.status(500).json(
            formatResponse(false, null, 'Failed to get available voices')
        );
    }
};