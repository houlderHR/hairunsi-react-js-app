import { Request, Response } from 'express';
import authService from '../services/auth.service';

class AuthController {
  async recoveryPassword(req: Request, res: Response) {
    try {
      await authService.recoveryPassword(req.body);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}

export default new AuthController();
