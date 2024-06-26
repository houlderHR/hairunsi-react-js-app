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
import { ResponseRoleDto } from '../dto/role/ResponseRoleDto';
import * as fs from 'fs';
import { removeManySpaceAndCapitalize } from '../utils/utils.method';
import REGEX from '../utils/regex';

class RoleService {
  async create(newRoleDto: CreateOrUpdateRoleDto): Promise<Role> {
    const errors = await validate(plainToClass(CreateOrUpdateRoleDto, newRoleDto));
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));
      let uniformError = validationErrors.map((item) => {
        return item.property === 'name' ? item.constraints.isLength : item.constraints.isUuid;
      });
      throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, uniformError);
    }
    try {
      const role = new Role();
      const uniformName = removeManySpaceAndCapitalize(newRoleDto.name);
      Object.assign(role, {
        name: uniformName,
        permissions: await this.getAllPermissionsByIdList(newRoleDto.permissions),
      });
      const saved = await AppDataSource.getRepository(Role).save(role);
      return saved;
    } catch (error) {
      if (error.code === TYPEORM_ERROR.DUPLICATED_FIELD.code) {
        throw new HttpException(StatusCodes.CONFLICT, 'Le rôle existe déjà');
      } else throw new InternalServerErrorException();
    }
  }

  async getAll(): Promise<ResponseRoleDto[]> {
    try {
      const result = await AppDataSource.getRepository(Role).find({
        relations: { permissions: true, departments: true },
        order: {
          created_at: 'DESC',
        },
      });
      let resultDto: ResponseRoleDto[] = plainToClass(ResponseRoleDto, result);
      try {
        const data = fs.readFileSync('seeds-id.json', { encoding: 'utf8' });
        const seeds = await JSON.parse(data);
        if (seeds.id) {
          resultDto = resultDto.map((item) => {
            item.isSeed = seeds.id.includes(item.id) ?? false;
            return item;
          });
        }
      } catch (error) {
        throw error;
      }
      return resultDto;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string): Promise<Role> {
    try {
      const result = await AppDataSource.getRepository(Role).findOne({
        where: { id },
        relations: { permissions: true, departments: true },
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
      Object.assign(role, {
        name: removeManySpaceAndCapitalize(updateRole.name),
        permissions:
          updateRole.permissions.length == 0
            ? role.permissions
            : await this.getAllPermissionsByIdList(updateRole.permissions),
      });

      const result = await AppDataSource.getRepository(Role).save(role);
      return result;
    } catch (error) {
      if (error.code == TYPEORM_ERROR.DUPLICATED_FIELD.code)
        throw new HttpException(StatusCodes.CONFLICT, 'Le rôle existe déjà');
      if (error.status == StatusCodes.UNPROCESSABLE_ENTITY) throw error;
      if (error.status == StatusCodes.NOT_FOUND) throw error;
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    try {
      const result = await AppDataSource.getRepository(Role).delete(id);
      if (result.affected > 0) return result;
      if (result.affected == 0)
        throw new HttpNotFoundException("Le fichier à supprimer n'existe pas");
    } catch (error) {
      if (error.code == TYPEORM_ERROR.VIOLATE_FOREIGN_KEY.code)
        throw new HttpException(StatusCodes.FORBIDDEN, 'Impossible de supprimer le rôle');
      if (error.status === StatusCodes.NOT_FOUND) throw error;
      throw new InternalServerErrorException();
    }
  }

  public async search(searchRoleDto: SearchRoleDto) {
    let roles = [];
    let resultDto: ResponseRoleDto[] = plainToClass(ResponseRoleDto, roles);
    try {
      if (searchRoleDto.search !== '') {
        roles = await this.getRepository()
          .createQueryBuilder('r')
          .innerJoinAndSelect(
            'r.permissions',
            'permission',
            'LOWER(permission.name) LIKE LOWER(:search) OR LOWER(r.name) LIKE LOWER(:search)',
            {
              search: `%${searchRoleDto.search}%`,
            },
          )
          .leftJoinAndSelect('r.permissions', 'permissions')
          .leftJoinAndSelect('r.departments', 'departments')
          .orderBy('r.created_at', 'DESC')
          .getMany();
      }
      try {
        resultDto = [...roles];
        const data = fs.readFileSync('seeds-id.json', { encoding: 'utf8' });
        const seeds = await JSON.parse(data);
        if (seeds.id) {
          resultDto = resultDto.map((item) => {
            item.isSeed = seeds.id.includes(item.id) ?? false;
            return item;
          });
        }
      } catch (error) {
        throw error;
      }

      return resultDto;
    } catch (e) {
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
