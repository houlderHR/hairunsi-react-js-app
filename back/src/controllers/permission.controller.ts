import { Request, Response } from 'express';
import { CreatePermissionDto } from '../dto/permission/CreatePermissionDto';
import { createPermission } from '../services/permission.service';
import { plainToClass } from 'class-transformer';

export const create = async (req: Request, res: Response) => {
  const userDto: CreatePermissionDto = plainToClass(CreatePermissionDto, req.body);
  const createdPermission = await createPermission(userDto as CreatePermissionDto);
  return res.json(createdPermission);
};
