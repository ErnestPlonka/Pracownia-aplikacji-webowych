import { Router } from 'express';
import { getPost, getOnePost} from "../controllers/postController.ts";

const router = Router();

router.get('/', getPost);
router.get('/:id', getOnePost);

export default router;