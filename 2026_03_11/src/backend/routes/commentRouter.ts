import { Router } from 'express';
import {getComment, createComment, getCommentByPost} from '../controllers/commentController.ts';

const router = Router();

router.get('/', getComment);
router.get('/post/:id', getCommentByPost);
router.post('/', createComment);

export default router;