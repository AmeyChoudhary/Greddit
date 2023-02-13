import express from 'express';
import { createSubGreddit , mySubGreddits, allSubGreddits} from '../Controllers/SubGreddit.js';
const router = express.Router();

router.post('/create', createSubGreddit);
router.post('/mysubgreddits', mySubGreddits);
router.post('/allsubgreddits', allSubGreddits);

export default router;