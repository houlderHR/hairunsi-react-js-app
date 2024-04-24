import permissionRoute from './permission.route';
import departmentRoute from './department.route';
import roleRoute from './role.route';
import fileRoute from './file.route';
import userRoute from './user.route';
import postRoute from './post.route';
import authRoute from './auth.route';
import { Router } from 'express';

const router = Router();

router.use('/permission', permissionRoute);
router.use('/department', departmentRoute);
router.use('/role', roleRoute);
router.use('/file', fileRoute);
router.use('/user', userRoute);
router.use('/post', postRoute);
router.use('/auth', authRoute);

export default router;
