import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import rateLimit from 'express-rate-limit';
require('../utils/configEnv');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, //1h
  max: 3,
  message: 'Trop de requêtes de cet utilisateur, veuillez réessayer plus tard.',
  keyGenerator: function (req) {
    return req.headers['x-user-email'].toString();
  },
});

const authRoute = Router();

authRoute.post('/recovery-password', limiter, AuthController.recoveryPassword);
authRoute.post('/forgot-password-check-url', AuthController.verifyForgotPasswordLinkToken);
authRoute.post('/reset-password', AuthController.resetUserPassword);
authRoute.post('/login', AuthController.login);
authRoute.post('/decode-token', AuthController.decodeToken);

export default authRoute;
