import { validate } from 'class-validator';
import { AppDataSource } from '../database/data-source';
import { Role } from '../models/entities/role.entity';
import { CreateOrUpdateRoleDto } from '../models/dto/role/createRoleDto';
import ERROR from '../errorMessage';
import { log } from 'console';
import TYPEORM_ERROR from '../errorTypeorm';

class RoleService {
  async create(newRoleDto: CreateOrUpdateRoleDto): Promise<Role> {
    try {
      const errors = await validate(newRoleDto);
      if (errors.length > 0) {
        throw { status: ERROR.UNAUTHORIZED.status, message: errors.at(0).constraints.isLength };
      }
      const role: CreateOrUpdateRoleDto = new Role();
      role.name = newRoleDto.name;
      const saved = await AppDataSource.getRepository(Role).save(role);
      return saved;
    } catch (error) {
      if (error.status) throw error;
      if (error.code == TYPEORM_ERROR.DUPLICATED_FIELD.code) {
        throw { status: ERROR.DUPLICATED.status, message: ERROR.DUPLICATED.message };
      }
    }
  }

  async getAll(): Promise<Role[]> {
    try {
      return await AppDataSource.getRepository(Role).find();
    } catch (error) {
      throw { status: ERROR.INTERNAL_SERVER.status, message: ERROR.INTERNAL_SERVER.message };
    }
  }

  async getOne(id: string): Promise<Role> {
    try {
      const result = await AppDataSource.getRepository(Role).findOne({ where: { id } });
      if (result) return result;
      if (!result) throw { status: ERROR.NOT_FOUND.status, message: ERROR.NOT_FOUND.message };
      throw { status: ERROR.INTERNAL_SERVER.status, message: ERROR.INTERNAL_SERVER.message };
    } catch (error) {
      if (error.code == TYPEORM_ERROR.UUID_INVALID.code)
        throw { status: ERROR.UNAUTHORIZED.status, message: 'Invalid role id' };
      if (error.status) throw { status: error.status, message: error.message };
      throw { status: ERROR.INTERNAL_SERVER.status, message: ERROR.INTERNAL_SERVER.message };
    }
  }

  async update(id: string, updateRole: CreateOrUpdateRoleDto): Promise<Role> {
    try {
      const role = await AppDataSource.getRepository(Role).findOne({ where: { id } });
      if (role) {
        const errors = await validate(updateRole);
        if (errors.length > 0) {
          throw { status: ERROR.UNAUTHORIZED.status, message: errors.at(0).constraints.isLength };
        }
        AppDataSource.getRepository(Role).merge(role, updateRole);
        const result = await AppDataSource.getRepository(Role).save(role);
        return result;
      }
      throw { status: ERROR.NOT_FOUND.status, message: 'Role not found' };
    } catch (error) {
      if (error.code == TYPEORM_ERROR.DUPLICATED_FIELD.code) {
        throw { status: ERROR.DUPLICATED.status, message: ERROR.DUPLICATED.message };
      }
      if (error.code == TYPEORM_ERROR.UUID_INVALID.code)
        throw { status: ERROR.UNAUTHORIZED.status, message: 'Invalid role id' };
      if (error.status !== ERROR.INTERNAL_SERVER.status) throw error;
      throw { status: ERROR.INTERNAL_SERVER.status, message: ERROR.INTERNAL_SERVER.message };
    }
  }

  async delete(id: string) {
    try {
      const result = await AppDataSource.getRepository(Role).delete(id);
      return result;
    } catch (error) {
      if (error.code == TYPEORM_ERROR.UUID_INVALID.code)
        throw { status: ERROR.UNAUTHORIZED.status, message: 'Invalid role id' };
      throw { status: ERROR.INTERNAL_SERVER.status, message: ERROR.INTERNAL_SERVER.message };
    }
  }
}

export default new RoleService();
