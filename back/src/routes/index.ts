import permissionRoute from './permission.route';
import departmentRoute from './department.route';
import { Router } from 'express';
import roleRoute from './role.route';

const router = Router();

router.use('/permission', permissionRoute);
router.use('/department', departmentRoute);
router.use('/role', roleRoute);

export default router;
