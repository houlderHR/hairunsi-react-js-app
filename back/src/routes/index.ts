import permissionRoute from './permission.route';
import departmentRoute from './department.route';
import { Router } from 'express';

const router = Router();

router.use('/permission', permissionRoute);
router.use('/department', departmentRoute);

export default router;
