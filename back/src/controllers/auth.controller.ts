import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import ResetPasswordDto from '../dto/auth/ResetPasswordDto';
import { plainToClass } from 'class-transformer';

class AuthController {
  async recoveryPassword(req: Request, res: Response) {
    try {
      const result = await authService.recoveryPassword(req.body.email);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  public async verifyForgotPasswordLinkToken(request: Request, response: Response) {
    try {
      await authService.verifyResetPasswordUrlToken(request.headers.token_password as string);
      response.status(StatusCodes.ACCEPTED).json({
        message: 'Lien du reset password accépté',
      });
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }

  public async resetUserPassword(request: Request, response: Response) {
    const resetPasswordDto: ResetPasswordDto = plainToClass(ResetPasswordDto, request.body);
    try {
      await authService.resetUserPassword(
        resetPasswordDto,
        request.headers.token_password as string,
      );
      response.status(StatusCodes.ACCEPTED).json({
        message: 'Mot de passe changé avec succés',
      });
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = await authService.login(req.body);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      res.status(error.status).json(error);
    }
  }
}

export default new AuthController();
