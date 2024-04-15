import { validate } from 'class-validator';
import { AppDataSource } from '../database/data-source';
import { Role } from '../entities/role.entity';
import { CreateOrUpdateRoleDto } from '../dto/role/createRoleDto';
import ERROR from '../utils/errorMessage';
import TYPEORM_ERROR from '../utils/errorTypeorm';
import { plainToClass } from 'class-transformer';

class RoleService {
  async create(newRoleDto: CreateOrUpdateRoleDto): Promise<Role> {
    try {
      const errors = await validate(plainToClass(CreateOrUpdateRoleDto, newRoleDto));
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
        throw ERROR.DUPLICATED;
      }
    }
  }

  async getAll(): Promise<Role[]> {
    try {
      return await AppDataSource.getRepository(Role).find();
    } catch (error) {
      throw ERROR.INTERNAL_SERVER;
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
      throw ERROR.INTERNAL_SERVER;
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
        throw ERROR.DUPLICATED;
      }
      if (error.code == TYPEORM_ERROR.UUID_INVALID.code)
        throw { status: ERROR.UNAUTHORIZED.status, message: 'Invalid role id' };
      if (error.status !== ERROR.INTERNAL_SERVER.status) throw error;
      throw ERROR.INTERNAL_SERVER;
    }
  }

  async delete(id: string) {
    try {
      const result = await AppDataSource.getRepository(Role).delete(id);
      return result;
    } catch (error) {
      if (error.code == TYPEORM_ERROR.UUID_INVALID.code)
        throw { status: ERROR.UNAUTHORIZED.status, message: 'Invalid role id' };
      throw ERROR.INTERNAL_SERVER;
    }
  }
}

export default new RoleService();
