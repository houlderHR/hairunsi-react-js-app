import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
require('../utils/config');

const authRoute = Router();

authRoute.post('/recovery-password', AuthController.recoveryPassword);
authRoute.get('/resend-password', AuthController.sendNotificationPassword);
authRoute.post('/resend-mail-check-token', AuthController.verifyTokenForRecoveryPwd);
authRoute.post('/forgot-password-check-url', AuthController.verifyForgotPasswordLinkToken);
authRoute.post('/reset-password', AuthController.resetUserPassword);
authRoute.post('/login', AuthController.login);
authRoute.post('/decode-token', AuthController.decodeToken);

export default authRoute;
