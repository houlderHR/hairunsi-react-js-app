import { Router } from 'express';
import PermissionController from '../controllers/permission.controller';
import REGEX from '../utils/regex';

const router = Router();

router.post('/', PermissionController.create);
router.get('/', PermissionController.getAll);
router.get(`/:id${REGEX.UID}`, PermissionController.getOne);
router.put(`/:id${REGEX.UID}`, PermissionController.updateName);
router.delete(`/:id${REGEX.UID}`, PermissionController.delete);

export default router;
