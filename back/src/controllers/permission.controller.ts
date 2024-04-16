import { Request, Response } from 'express';
import PermissionService from '../services/permission.service';
import { Permission } from '../entities/permission.entity';
import { UpdateResult } from 'typeorm';

class PermissionController {
  async create(req: Request, res: Response) {
    try {
      const createdPermission: Permission = await PermissionService.createPermission(req.body);
      return res.status(201).json(createdPermission);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const permissions: Permission[] = await PermissionService.getAllPermissions();
      return res.status(200).json(permissions);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const permission: Permission = await PermissionService.getPermission(id);
      return res.status(200).json(permission);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async updateName(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const permission: Permission | UpdateResult = await PermissionService.updateNameOfPermission(
        id,
        req.body,
      );
      return res.status(200).json(permission);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      await PermissionService.deleteOnePermission(id);
      return res.status(200).json({ message: 'Permission supprimée' });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}

export default new PermissionController();
