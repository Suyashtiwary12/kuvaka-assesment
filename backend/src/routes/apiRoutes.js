import express from 'express';
import { uploadLeads } from '../controller/leadController.js';
import { uploadOffer } from '../controller/offerController.js';
import { scoreLeads, getResults, exportResultsCSV } from '../controller/scoreController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/offer', uploadOffer);
router.post('/leads/upload', upload.single('file'), uploadLeads);
router.post('/score', scoreLeads);
router.get('/results', getResults);
router.get('/results/export', exportResultsCSV); 

export default router;
