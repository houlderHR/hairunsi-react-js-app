import { Router } from 'express';
import permissionRoute from './permission.route';

const router = Router();

router.use('/permission', permissionRoute);

export default router;
