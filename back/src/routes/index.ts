import permissionRoute from './permission.route';
import departmentRoute from './department.route';
import { Router } from 'express';
import routerPermission from './permission.route';

const router = Router();

router.use('/permission', permissionRoute);
router.use('/department', departmentRoute);
router.use('/role', routerPermission);

export default router;
