import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';

class AuthController {
  async recoveryPassword(req: Request, res: Response) {
    try {
      const result = await authService.recoveryPassword(req.body.email);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}

export default new AuthController();
