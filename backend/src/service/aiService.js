import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getAIScore = async (lead, offer) => {
    const prompt = process.env.PROMPT
        .replace('${JSON.stringify(offer)}', JSON.stringify(offer))
        .replace('${JSON.stringify(lead)}', JSON.stringify(lead));
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    const payload = {
        contents: [{
            parts: [{
                text: prompt
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            candidateCount: 1
        }
    };

    try {
        const response = await axios.post(
            url,
            payload, 
            {
                headers: {
                    'X-goog-api-key': process.env.GEMINI_API,
                    'Content-Type': 'application/json'
                }
            }
        );
        const resultText = response.data.candidates[0].content.parts[0].text.toLowerCase();

        let aiPoints = 10;
        let intent = 'Low';

        if (resultText.includes('high')) {
            aiPoints = 50;
            intent = 'High';
        } else if (resultText.includes('medium')) {
            aiPoints = 30;
            intent = 'Medium';
        }

        return { aiPoints, intent, reasoning: resultText.trim() };
    } catch (error) {
        console.error('Gemini API Error:', error.response?.data || error.message);
        throw new Error('Failed to fetch AI score');
    }
};