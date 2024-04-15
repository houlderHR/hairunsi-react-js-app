import { Router } from 'express';
import PermissionController from '../controllers/permission.controller';

const router = Router();

router.post('/post', PermissionController.create);
router.get('/get', PermissionController.getAllPermissions);
router.get(
  '/get/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  PermissionController.getPermission,
);
router.put(
  '/update/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  PermissionController.updateName,
);
router.delete(
  '/delete/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  PermissionController.deletePermission,
);

export default router;
