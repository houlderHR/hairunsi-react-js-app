import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
require('../utils/configEnv');

require('../utils/configEnv');
const authRoute = Router();

authRoute.post('/recovery-password', AuthController.recoveryPassword);
authRoute.post('/forgot-password-check-url', AuthController.verifyForgotPasswordLinkToken);
authRoute.post('/reset-password', AuthController.resetUserPassword);
authRoute.post('/login', AuthController.login);

export default authRoute;
