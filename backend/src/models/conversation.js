import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;