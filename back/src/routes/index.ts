import permissionRoute from './permission.route';
import departmentRoute from './department.route';
import { Router } from 'express';
import roleRoute from './role.route';
import fileRoute from './file.route';
import userRoute from './user.route';

const router = Router();

router.use('/permission', permissionRoute);
router.use('/department', departmentRoute);
router.use('/role', roleRoute);
router.use('/file', fileRoute);
router.use('/user', userRoute);

export default router;
