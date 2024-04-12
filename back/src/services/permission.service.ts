import { validate } from 'class-validator';
import { AppDataSource } from '../database/data-source';
import { CreatePermissionDto } from '../models/dto/permission/CreatePermissionDto';
import { Permission } from '../models/entities/permission.entity';

export const createPermission = async (permissionDto: CreatePermissionDto): Promise<Permission> => {
  const errors = await validate(permissionDto);
  if (errors.length > 0) {
    throw new Error(errors.at(0).constraints.isLength[0]);
  }
  const permission: CreatePermissionDto = new Permission();
  permission.name = permissionDto.name;
  const saved = await AppDataSource.getRepository(Permission).save(permission);
  return saved;
};
