import express from 'express';
import { UserList , JoiningRequest, AcceptJoiningRequest, RejectJoiningRequest, ReportedPosts} from '../Controllers/Moderator.js';
import { deleteReportedPost } from '../Controllers/Moderator.js'

const router = express.Router();

router.post('/user_list', UserList);
router.post('/joining_request', JoiningRequest);
router.post('/accept_joining_request', AcceptJoiningRequest);
router.post('/reject_joining_request', RejectJoiningRequest);
router.post('/reported_posts', ReportedPosts);
router.post('/deletereportedpost', deleteReportedPost)


export default router;