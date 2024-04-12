import { validate } from 'class-validator';
import { AppDataSource } from '../database/data-source';
import { Role } from '../models/entities/role.entity';
import { CreateOrUpdateRoleDto } from '../models/dto/role/createRoleDto';
import ERROR from '../errorMessage';
import { log } from 'console';

class RoleService {
  async create(newRoleDto: CreateOrUpdateRoleDto): Promise<Role> {
    const errors = await validate(newRoleDto);
    if (errors.length > 0) {
      throw { status: ERROR.UNAUTHORIZED.status, message: errors.at(0).constraints.isLength };
    }
    const roleExist = await AppDataSource.getRepository(Role).find({
      where: { name: newRoleDto.name },
    });
    if (roleExist) {
      throw { status: ERROR.UNAUTHORIZED.status, message: 'Name already exist' };
    }
    const role: CreateOrUpdateRoleDto = new Role();
    role.name = newRoleDto.name;
    const saved = await AppDataSource.getRepository(Role).save(role);
    return saved;
  }

  async getAll(): Promise<Role[]> {
    try {
      return await AppDataSource.getRepository(Role).find();
    } catch (error) {
      throw { status: ERROR.NOT_FOUND.status, message: ERROR.INTERNAL_SERVER.message };
    }
  }

  async getOne(id: string): Promise<Role> {
    try {
      const result = await AppDataSource.getRepository(Role).findOne({ where: { id } });
      return result;
    } catch (error) {
      throw { status: ERROR.NOT_FOUND.status, message: ERROR.NOT_FOUND.message };
    }
  }

  async update(id: string, updateRole: CreateOrUpdateRoleDto): Promise<Role> {
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
  }

  async delete(id: string) {
    try {
      const result = await AppDataSource.getRepository(Role).delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new RoleService();
