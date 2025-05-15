export const MODELS = {
    GPT_MODEL: "gpt-3.5-turbo"
};

export const API_LIMITS = {
    MAX_TOKENS: 200,
    MAX_RETRIES: 3
};

export const SPEECH = {
    DEFAULT_SPEED: 1.0,
    DEFAULT_VOICE: null,
    DEFAULT_LANGUAGE: 'en-US',
    RECOGNITION_TIMEOUT: 5000,
    SILENCE_TIMEOUT: 1500,
    MAX_DURATION: 10000,
    VOICE_SETTINGS: {
        MALE: 'Microsoft David Desktop',
        FEMALE: 'Microsoft Zira Desktop',
        FALLBACK: null
    }
};

export const ERROR_MESSAGES = {
    DATABASE_ERROR: "Database connection error occurred",
    RATE_LIMIT_EXCEEDED: "Too many requests from this IP, please try again later.",
    GENERAL_ERROR: "An error occurred while processing your request.",
    SPEECH_NOT_SUPPORTED: "Speech recognition is not supported in this environment.",
    VOICE_NOT_FOUND: "The requested voice is not available on this system.",
    SPEECH_TIMEOUT: "Speech recognition timed out. Please try again.",
    NO_SPEECH_DETECTED: "No speech was detected. Please try again.",
    API_ERROR: "Error communicating with the AI service.",
    DATABASE_ERROR: "Error saving conversation.",
    AUTH_ERROR: "Authentication failed.",
    INVALID_INPUT: "Invalid input provided.",
    CONNECTION_ERROR: "Network connection error.",
    SERVER_ERROR: "Internal server error."
};