import Lead from '../models/leadModel.js';
import fs from 'fs';
import csvParser from 'csv-parser';

export const uploadLeads = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'CSV file is required.' });
    }

    const leadsFilePath = req.file.path;
    const leadsToInsert = [];

    fs.createReadStream(leadsFilePath)
        .pipe(csvParser())
        .on('data', (row) => {
            leadsToInsert.push(row);
        })
        .on('end', async () => {
            try {
                await Lead.insertMany(leadsToInsert);

                // Clean up uploaded file
                fs.unlink(leadsFilePath, (err) => {
                    if (err) console.error('Error deleting temp file:', err);
                });

                res.status(200).json({ message: 'Leads uploaded and saved to DB successfully', leadsCount: leadsToInsert.length });
            } catch (err) {
                res.status(500).json({ message: 'Failed to save leads to database', error: err.message });
            }
        })
        .on('error', (error) => {
            res.status(500).json({ message: 'Failed to parse CSV file.', error });
        });
};
