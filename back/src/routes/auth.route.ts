import { Router } from 'express';
import authController from '../controllers/auth.controller';

const routerAuth = Router();

routerAuth.post('/recovery-password', authController.recoveryPassword);

export default routerAuth;
