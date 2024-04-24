import { Router } from 'express';
<<<<<<< HEAD
import authController from '../controllers/auth.controller';

const routerAuth = Router();

routerAuth.post('/recovery-password', authController.recoveryPassword);

export default routerAuth;
=======
import AuthController from '../controllers/auth.controller';
require('../utils/configEnv');

const authRoute = Router();

authRoute.post('/forgot-password', AuthController.forgotPassword);
authRoute.post('/forgot-password-check-url', AuthController.verifyForgotPasswordLinkToken);
authRoute.post('/reset-password', AuthController.resetUserPassword);

export default authRoute;
>>>>>>> d39ebf8 (✨ Add signature url)
