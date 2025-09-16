import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    lead: {
        name: { type: String, required: true },
        role: { type: String, required: true },
        company: { type: String, required: true },
    },
    intent: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
    score: { type: Number, required: true },
    reasoning: { type: String, required: true },
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);
export default Result;
