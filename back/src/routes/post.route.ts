import { Router } from 'express';
import PostController from '../controllers/post.controller';
import REGEX from '../utils/regex';

const router = Router();

router.post('/post', PostController.create);
router.get('/get', PostController.getAll);
router.get(`/get/:id${REGEX.UID}`, PostController.getOne);
router.put(`/update/:id${REGEX.UID}`, PostController.updateName);
router.delete(`/delete/:id${REGEX.UID}`, PostController.delete);

export default router;
