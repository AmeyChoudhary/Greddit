import express from 'express';
import { getPosts } from '../Controllers/Posts.js';
import { createPost } from '../Controllers/Posts.js';

const router = express.Router();

router.post('/getposts', getPosts)
router.post('/createpost', createPost)
export default router;