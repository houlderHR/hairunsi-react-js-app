import { Router } from 'express';
import PermissionController from '../controllers/permission.controller';
import REGEX from '../utils/regex';

const router = Router();

router.post('/post', PermissionController.create);
router.get('/get', PermissionController.getAll);
router.get(`/get/:id${REGEX.UID}`, PermissionController.getOne);
router.put(`/update/:id${REGEX.UID}`, PermissionController.updateName);
router.delete(`/delete/:id${REGEX.UID}`, PermissionController.delete);

export default router;
