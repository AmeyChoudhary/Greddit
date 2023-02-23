import express from 'express';
import { createSubGreddit , mySubGreddits, allSubGreddits, getUserStatus , getSubGredditInfo} from '../Controllers/SubGreddit.js';
import { LeaveSubGreddit } from '../Controllers/SubGreddit.js';
import { JoinSubGreddit } from '../Controllers/SubGreddit.js';
import { deleteSubGreddits } from '../Controllers/SubGreddit.js';
const router = express.Router();

router.post('/create', createSubGreddit);
router.post('/mysubgreddits', mySubGreddits);
router.post('/deletesubgreddit', deleteSubGreddits);
router.post('/allsubgreddits', allSubGreddits);
router.post('/status', getUserStatus);
router.post('/info', getSubGredditInfo)
router.post('/leave', LeaveSubGreddit)
router.post('/join', JoinSubGreddit)
export default router;