import { ValidationError, validate } from 'class-validator';
import { AppDataSource } from '../database/data-source';
import { Role } from '../entities/role.entity';
import { CreateOrUpdateRoleDto } from '../dto/role/createRoleDto';
import STATUS_CODE from '../utils/statusCode';
import TYPEORM_ERROR from '../utils/errorTypeorm';
import { plainToClass } from 'class-transformer';
import HttpException from '../exceptions/HttpException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';

class RoleService {
  async create(newRoleDto: CreateOrUpdateRoleDto): Promise<Role> {
    const errors = await validate(plainToClass(CreateOrUpdateRoleDto, newRoleDto));
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(STATUS_CODE.UNPROCESSABLE_ENTITY.status, validationErrors);
    }
    try {
      const role: CreateOrUpdateRoleDto = new Role();
      role.name = newRoleDto.name;
      const saved = await AppDataSource.getRepository(Role).save(role);
      return saved;
    } catch (error) {
      if (error.code == TYPEORM_ERROR.DUPLICATED_FIELD.code) {
        throw new HttpException(STATUS_CODE.DUPLICATED.status, 'Le rôle existe déja');
      }
      throw new InternalServerErrorException();
    }
  }

  async getAll(): Promise<Role[]> {
    try {
      return await AppDataSource.getRepository(Role).find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string): Promise<Role> {
    try {
      const result = await AppDataSource.getRepository(Role).findOne({ where: { id } });
      if (!result) throw new HttpNotFoundException("Le rôle n'existe pas");
      return result;
    } catch (error) {
      if (error.code == TYPEORM_ERROR.UUID_INVALID.code)
        throw new HttpException(STATUS_CODE.UNAUTHORIZED.status, "L'identifiant n'est pas valide");
      if (error.status == STATUS_CODE.NOT_FOUND.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateRole: CreateOrUpdateRoleDto): Promise<Role> {
    try {
      const role = await AppDataSource.getRepository(Role).findOne({ where: { id } });
      if (role) {
        const errors = await validate(plainToClass(CreateOrUpdateRoleDto, updateRole));
        if (errors.length > 0) {
          const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
            property,
            constraints,
          }));
          throw new HttpException(STATUS_CODE.UNPROCESSABLE_ENTITY.status, validationErrors);
        }
        AppDataSource.getRepository(Role).merge(role, updateRole);
        const result = await AppDataSource.getRepository(Role).save(role);
        return result;
      }
      throw new HttpNotFoundException("Le rôle n'existe pas");
    } catch (error) {
      if (error.code == TYPEORM_ERROR.DUPLICATED_FIELD.code)
        throw new HttpException(STATUS_CODE.DUPLICATED.status, 'Le rôle existe déja');
      if (error.code == TYPEORM_ERROR.UUID_INVALID.code)
        throw new HttpException(STATUS_CODE.UNAUTHORIZED.status, "L'identifiant n'est pas valide");
      if (error.status == STATUS_CODE.UNPROCESSABLE_ENTITY.status) throw error;
      if (error.status == STATUS_CODE.NOT_FOUND.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    try {
      const result = await AppDataSource.getRepository(Role).delete(id);
      if (result.affected == 0) return result;
      throw new HttpNotFoundException("Le rôle à supprimer n'existe pas");
    } catch (error) {
      if (error.code == TYPEORM_ERROR.UUID_INVALID.code)
        throw new HttpException(STATUS_CODE.UNAUTHORIZED.status, "L'identifiant n'est pas valide");
      throw new InternalServerErrorException();
    }
  }
}

export default new RoleService();
