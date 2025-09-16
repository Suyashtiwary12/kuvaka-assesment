import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/apiRoutes.js';

const app = express();
app.use(bodyParser.json());

app.use('/api', apiRoutes);