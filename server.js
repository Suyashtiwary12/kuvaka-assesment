import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './backend/src/routes/apiRoutes.js';
import connectDB from './backend/src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
