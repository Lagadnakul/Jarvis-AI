const say = require('say');
const { SPEECH } = require('./constants');

const speechUtils = {
    // Text-to-Speech using say.js
    speakText: (text, voice = SPEECH.DEFAULT_VOICE, speed = SPEECH.DEFAULT_SPEED) => {
        return new Promise((resolve, reject) => {
            try {
                say.speak(text, voice, speed, (err) => {
                    if (err) {
                        console.error('TTS Error:', err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } catch (error) {
                console.error('TTS Setup Error:', error);
                reject(error);
            }
        });
    },

    // Stop current speech
    stopSpeaking: () => {
        return new Promise((resolve, reject) => {
            try {
                say.stop(() => resolve());
            } catch (error) {
                console.error('Stop Speaking Error:', error);
                reject(error);
            }
        });
    },

    // Backend placeholder for speech recognition
    // Actual implementation should be in frontend
    recognizeSpeech: () => {
        return Promise.reject(new Error('Speech recognition must be implemented in the frontend'));
    },

    // Get available voices
    getVoices: () => {
        return new Promise((resolve, reject) => {
            try {
                say.getInstalledVoices((err, voices) => {
                    if (err) {
                        console.error('Get Voices Error:', err);
                        reject(err);
                    } else {
                        resolve(voices);
                    }
                });
            } catch (error) {
                console.error('Get Voices Setup Error:', error);
                reject(error);
            }
        });
    }
};

// Export the utilities
module.exports = speechUtils;