import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';

class AuthController {
<<<<<<< HEAD
  async recoveryPassword(req: Request, res: Response) {
    try {
      const result = await authService.recoveryPassword(req.body.email);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
=======
  public async forgotPassword(request: Request, response: Response) {
    await authService.generateForgotPasswordLink();
    response.status(StatusCodes.ACCEPTED).json({ message: 'Reset password OK' });
  }

  public async verifyForgotPasswordLinkToken(request: Request, response: Response) {
    try {
      await authService.verifyResetPasswordUrlToken(request.body.token);
      response.status(StatusCodes.ACCEPTED).json({
        message:
          'On vous a envoyé un email de réinitialisation de mot de passe, veuillez le consulter',
      });
    } catch (error) {
      return response.status(error.status).json(error);
>>>>>>> d39ebf8 (✨ Add signature url)
    }
  }
}

export default new AuthController();
