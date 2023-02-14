import express from 'express';
import { createSubGreddit , mySubGreddits, allSubGreddits, getUserStatus , getSubGredditInfo} from '../Controllers/SubGreddit.js';
const router = express.Router();

router.post('/create', createSubGreddit);
router.post('/mysubgreddits', mySubGreddits);
router.post('/allsubgreddits', allSubGreddits);
router.post('/status', getUserStatus);
router.post('/info', getSubGredditInfo)
export default router;