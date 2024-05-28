import { Router } from 'express';
import PostController from '../controllers/post.controller';
import REGEX from '../utils/regex';

const router = Router();

router.post('/', PostController.create);
router.get('/', PostController.getAll);
router.get(`/:id${REGEX.UID}`, PostController.getOne);
router.get(`/department/:id${REGEX.UID}`, PostController.getAllByDepartment);
router.put(`/:id${REGEX.UID}`, PostController.updateName);
router.delete(`/:id${REGEX.UID}`, PostController.delete);

export default router;
