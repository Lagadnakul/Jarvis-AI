const constants = {
    MODELS: {
        GPT_MODEL: "gpt-3.5-turbo"
    },
    
    API_LIMITS: {
        MAX_TOKENS: 200,
        MAX_RETRIES: 3
    },
    
    SPEECH: {
        DEFAULT_SPEED: 1.0,
        DEFAULT_VOICE: null,
        DEFAULT_LANGUAGE: 'en-US',
        RECOGNITION_TIMEOUT: 5000,
        SILENCE_TIMEOUT: 1500,      // Time to wait for silence before stopping recognition
        MAX_DURATION: 10000,        // Maximum recording duration
        VOICE_SETTINGS: {
            MALE: 'Microsoft David Desktop',
            FEMALE: 'Microsoft Zira Desktop',
            FALLBACK: null
        }
    },
    
    ERROR_MESSAGES: {
        QUOTA_EXCEEDED: "I apologize, but I'm currently experiencing high demand. Please try again later.",
        GENERAL_ERROR: "An error occurred while processing your request.",
        SPEECH_NOT_SUPPORTED: "Speech recognition is not supported in this environment.",
        VOICE_NOT_FOUND: "The requested voice is not available on this system.",
        SPEECH_TIMEOUT: "Speech recognition timed out. Please try again.",
        NO_SPEECH_DETECTED: "No speech was detected. Please try again."
    }
};

module.exports = constants;