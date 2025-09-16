import Lead from '../models/leadModel.js';
import Offer from '../models/offerModel.js';
import Result from '../models/resultModel.js';
import { calculateRuleScore } from '../service/scoringService.js';
import { getAIScore } from '../service/aiService.js';
import { Parser } from 'json2csv';
export const scoreLeads = async (req, res) => {
    try {
        const offer = await Offer.findOne().sort({ createdAt: -1 });  // Get latest offer
        const leads = await Lead.find();
        const scoredResults = [];

        for (let lead of leads) {
            const ruleScore = calculateRuleScore(lead, offer);
            const { aiPoints, intent, reasoning } = await getAIScore(lead, offer);

            const result = new Result({
                lead: {
                    name: lead.name,
                    role: lead.role,
                    company: lead.company,
                },
                intent,
                score: ruleScore + aiPoints,
                reasoning,
            });

            await result.save();
            scoredResults.push(result);
        }

        res.status(200).json({ message: 'Scoring completed', scoredResults });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getResults = async (req, res) => {
    try {
        const results = await Result.find();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const exportResultsCSV = (req, res) => {
    const fields = ['name', 'role', 'company', 'intent', 'score', 'reasoning'];
    const parser = new Parser({ fields });
    const csv = parser.parse(scoredResults);

    res.header('Content-Type', 'text/csv');
    res.attachment('results.csv');
    res.send(csv);
};
