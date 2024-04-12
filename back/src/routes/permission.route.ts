import { Router } from 'express';
import { create } from '../controllers/permission.controller';

const router = Router();

router.post('/post', create);

export default router;
