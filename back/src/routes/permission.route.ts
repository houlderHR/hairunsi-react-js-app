import { Router } from 'express';
import PermissionController from '../controllers/permission.controller';
import REGEX from '../utils/regex';

const router = Router();

router.post('/post', PermissionController.create);
router.get('/get', PermissionController.getAllPermissions);
router.get(`/get/:id${REGEX.UUID}`, PermissionController.getPermission);
router.put(`/update/:id${REGEX.UUID}`, PermissionController.updateName);
router.delete(`/delete/:id${REGEX.UUID}`, PermissionController.deletePermission);

export default router;
