import say from 'say';
import { SPEECH } from './constants.js';

// Text-to-Speech using say.js
export const speakText = (text, voice = SPEECH.DEFAULT_VOICE, speed = SPEECH.DEFAULT_SPEED) => {
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
};

// Stop current speech
export const stopSpeaking = () => {
    return new Promise((resolve, reject) => {
        try {
            say.stop(() => resolve());
        } catch (error) {
            console.error('Stop Speaking Error:', error);
            reject(error);
        }
    });
};

// Get available voices
export const getVoices = () => {
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
};