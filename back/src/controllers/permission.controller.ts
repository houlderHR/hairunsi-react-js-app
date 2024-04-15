import { Request, Response } from 'express';
import PermissionService from '../services/permission.service';
import { ErrorMessage } from '../exceptions/ErrorMessage';
import { Permission } from '../entities/permission.entity';

class PermissionController {
  async create(req: Request, res: Response) {
    try {
      const createdPermission: Permission | ErrorMessage[] | ErrorMessage =
        await PermissionService.createPermission(req.body);
      return res.status(201).json(createdPermission);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async getAllPermissions(req: Request, res: Response) {
    try {
      const permissions: ErrorMessage | Permission[] = await PermissionService.getAllPermissions();
      return res.status(200).json(permissions);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async getPermission(req: Request, res: Response) {
    const id: string = req.params.id;
    const permission: ErrorMessage | Permission = await PermissionService.getPermission(id);
    if (permission instanceof Error) {
      return res.status(404).json(permission);
    }
    return res.status(200).json(permission);
  }

  async updateName(req: Request, res: Response) {
    const id: string = req.params.id;
    const updatedPermission = await PermissionService.updateNameOfPermission(id, req.body);
    if (updatedPermission instanceof Error) {
      return res.status(404).json({ message: updatedPermission.message });
    }
    return res.status(200).json(updatedPermission);
  }

  async deletePermission(req: Request, res: Response) {
    const id: string = req.params.id;
    const deletedPermission = await PermissionService.deleteOnePermission(id);
    if (deletedPermission instanceof ErrorMessage && deletedPermission.status)
      return res.status(deletedPermission.status).json(deletedPermission.message);
  }
}

export default new PermissionController();
