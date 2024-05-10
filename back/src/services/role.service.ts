import { ValidationError, validate } from 'class-validator';
import { AppDataSource } from '../database/data-source';
import { Role } from '../entities/role.entity';
import { CreateOrUpdateRoleDto } from '../dto/role/createOrUpdateRoleDto';
import TYPEORM_ERROR from '../utils/errorTypeorm';
import { plainToClass } from 'class-transformer';
import HttpException from '../exceptions/HttpException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import { StatusCodes } from 'http-status-codes';
import { Permission } from '../entities/permission.entity';
import SearchRoleDto from '../dto/role/SearchPermissionDto';

class RoleService {
  async create(newRoleDto: CreateOrUpdateRoleDto): Promise<Role> {
    const errors = await validate(plainToClass(CreateOrUpdateRoleDto, newRoleDto));
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, validationErrors);
    }
    try {
      const role = new Role();
      Object.assign(role, {
        name: newRoleDto.name,
        permissions: await this.getAllPermissionsByIdList(newRoleDto.permissions),
      });
      const saved = await AppDataSource.getRepository(Role).save(role);
      return saved;
    } catch (error) {
      if (error.code == TYPEORM_ERROR.DUPLICATED_FIELD.code) {
        throw new HttpException(StatusCodes.CONFLICT, 'Le rôle existe déja');
      }
      throw new InternalServerErrorException();
    }
  }

  async getAll(): Promise<Role[]> {
    try {
      return await AppDataSource.getRepository(Role).find({
        relations: { permissions: true },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string): Promise<Role> {
    try {
      const result = await AppDataSource.getRepository(Role).findOne({
        where: { id },
        relations: { permissions: true },
      });
      if (!result) throw new HttpNotFoundException("Le rôle n'existe pas");
      return result;
    } catch (error) {
      if (error.status == StatusCodes.NOT_FOUND) throw error;
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateRole: CreateOrUpdateRoleDto): Promise<Role> {
    let role = await this.getOne(id);
    try {
      const errors = await validate(plainToClass(CreateOrUpdateRoleDto, updateRole));
      if (errors.length > 0) {
        const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
          property,
          constraints,
        }));
        throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, validationErrors);
      }
      AppDataSource.getRepository(Role).merge(role, {
        ...updateRole,
        permissions: await this.getAllPermissionsByIdList(updateRole.permissions),
      });

      const result = await AppDataSource.getRepository(Role).save(role);
      return result;
    } catch (error) {
      if (error.code == TYPEORM_ERROR.DUPLICATED_FIELD.code)
        throw new HttpException(StatusCodes.CONFLICT, 'Le rôle existe déja');
      if (error.status == StatusCodes.UNPROCESSABLE_ENTITY) throw error;
      if (error.status == StatusCodes.NOT_FOUND) throw error;
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    const result = await AppDataSource.getRepository(Role).delete(id);
    if (result.affected > 0) return result;
    if (result.affected == 0)
      throw new HttpNotFoundException("Le fichier à supprimer n'existe pas");
    throw new InternalServerErrorException();
  }

  public async search(searchRoleDto: SearchRoleDto) {
    try {
      const roles = await this.getRepository()
        .createQueryBuilder('r')
        .innerJoin(
          'r.permissions',
          'permission',
          'permission.name LIKE LOWER(:search) OR r.name LIKE LOWER(:search)',
          {
            search: `%${searchRoleDto.search}%`,
          },
        )
        .leftJoinAndSelect('r.permissions', 'permissions')
        .getMany();
      console.log(roles);
      return roles;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  private async getAllPermissionsByIdList(id: string[]): Promise<Permission[]> {
    if (id.length > 0) {
      const queryBuilder = AppDataSource.getRepository(Permission)
        .createQueryBuilder('permissions')
        .select('*');
      id.map((permission, index) =>
        queryBuilder.orWhere(`permissions.id= :id${index}`, { [`id${index}`]: permission }),
      );
      const p: Permission[] = await queryBuilder.execute();
      return p;
    }
    return [];
  }

  private getRepository() {
    return AppDataSource.getRepository(Role);
  }
}

export default new RoleService();
