import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { CreateOrUpdateRoleDto } from '../models/dto/role/createRoleDto';
import RoleService from '../services/role.service';
import ERROR from '../errorMessage';

class RoleController {
  async create(req: Request, res: Response) {
    try {
      const newRoleDto: CreateOrUpdateRoleDto = plainToClass(CreateOrUpdateRoleDto, req.body);
      const createdRole = await RoleService.create(newRoleDto as CreateOrUpdateRoleDto);
      return res.status(201).json(createdRole);
    } catch (error) {
      if (error.status != ERROR.INTERNAL_SERVER.status) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(ERROR.INTERNAL_SERVER.status).json(ERROR.INTERNAL_SERVER);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await RoleService.getAll();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await RoleService.getOne(id);
      return res.status(201).json(result);
    } catch (error) {
      if (error.status != ERROR.INTERNAL_SERVER.status)
        return res.status(error.status).json({ message: error.message });
      return res
        .status(ERROR.INTERNAL_SERVER.status)
        .json({ message: ERROR.INTERNAL_SERVER.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const updateRole = plainToClass(CreateOrUpdateRoleDto, req.body) as CreateOrUpdateRoleDto;
      const result = await RoleService.update(id, updateRole);
      return res.status(200).json(result);
    } catch (error) {
      if (error.status != ERROR.INTERNAL_SERVER.status)
        return res.status(error.status).json({ message: error.message });
      return res
        .status(ERROR.INTERNAL_SERVER.status)
        .json({ message: ERROR.INTERNAL_SERVER.message });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await RoleService.delete(id);
      return res.status(201).json(result);
    } catch (error) {
      if (error.status != ERROR.INTERNAL_SERVER.status)
        return res.status(error.status).json({ message: error.message });
      return res
        .status(ERROR.INTERNAL_SERVER.status)
        .json({ message: ERROR.INTERNAL_SERVER.message });
    }
  }
}

export default new RoleController();
