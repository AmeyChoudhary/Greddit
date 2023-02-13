import express from 'express';
import { createSubGreddit } from '../Controllers/SubGreddit.js';
const router = express.Router();

router.post('/create', createSubGreddit);

export default router;