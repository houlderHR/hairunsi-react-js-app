import { Request, Response } from 'express';
import RoleService from '../services/role.service';
import STATUS_CODE from '../utils/statusCode';
import { StatusCodes } from 'http-status-codes';

class RoleController {
  async create(req: Request, res: Response) {
    try {
      const createdRole = await RoleService.create(req.body);
      return res.status(StatusCodes.CREATED).json(createdRole);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await RoleService.getAll();
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await RoleService.getOne(id);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await RoleService.update(id, req.body);
      return res.status(STATUS_CODE.OK.status).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await RoleService.delete(id);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}

export default new RoleController();
