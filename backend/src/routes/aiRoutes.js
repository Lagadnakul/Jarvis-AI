const express = require('express');
const router = express.Router();
const { processCommand, stopSpeaking, getAvailableVoices } = require('../controllers/aiController');

router.post('/process', processCommand);
router.post('/stop-speaking', stopSpeaking);
router.get('/voices', getAvailableVoices);
router.get('/test', (req, res) => {
    res.json({
        message: 'Test route is working!'
    });
});

module.exports = router;