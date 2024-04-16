import { DeleteResult, UpdateResult } from 'typeorm';
import { ValidationError, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AppDataSource } from '../database/data-source';
import { Permission } from '../entities/permission.entity';
import { CreateAndUpdatePermissionDto } from '../dto/permission/CreateAndUpdatePermissionDto';
import HttpException from '../exceptions/HttpException';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import STATUS_CODE from '../utils/statusCode';

class PermissionService {
  async createPermission(permissionDto: CreateAndUpdatePermissionDto): Promise<Permission> {
    const errors = await validate(plainToClass(CreateAndUpdatePermissionDto, permissionDto));
    if (errors.length > 0) {
      const errorsMessage = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));
      throw new HttpException(STATUS_CODE.UNPROCESSABLE_ENTITY.status, errorsMessage);
    }
    try {
      const permission: CreateAndUpdatePermissionDto = new Permission();
      permission.name = permissionDto.name;
      const saved = await AppDataSource.getRepository(Permission).save(permission);
      return saved;
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(STATUS_CODE.DUPLICATED.status, STATUS_CODE.DUPLICATED.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async permissionWithThisNameAlreadyExists(name: string): Promise<boolean> {
    const permission = await AppDataSource.getRepository(Permission).find({
      where: { name: name },
    });
    if (permission.length > 0) return true;
    else return false;
  }

  async getAllPermissions(): Promise<Permission[]> {
    try {
      const permissions = await AppDataSource.getRepository(Permission).find();
      return permissions;
    } catch (error) {
      throw new HttpNotFoundException('Aucune permission existante');
    }
  }

  async getPermission(id: string): Promise<Permission> {
    const permission: Permission[] = await AppDataSource.getRepository(Permission).findBy({ id });
    if (permission.length) return permission[0];
    else throw new HttpNotFoundException('Aucune permission existante avec cet identifiant');
  }

  async updateNameOfPermission(
    id: string,
    updatePermissionDto: CreateAndUpdatePermissionDto,
  ): Promise<UpdateResult | Permission> {
    const changedName: CreateAndUpdatePermissionDto = plainToClass(
      CreateAndUpdatePermissionDto,
      updatePermissionDto,
    );
    const errors = await validate(plainToClass(CreateAndUpdatePermissionDto, changedName));
    if (errors.length > 0) {
      const errorsMessage = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));
      throw new HttpException(STATUS_CODE.UNPROCESSABLE_ENTITY.status, errorsMessage);
    }
    if ((await this.getPermission(id)) instanceof HttpNotFoundException)
      return this.getPermission(id);
    if (!(await this.permissionWithThisNameAlreadyExists(changedName.name))) {
      const permission = await AppDataSource.getRepository(Permission).update(
        {
          id,
        },
        { name: changedName.name },
      );
      if (permission.affected > 0) return permission;
      throw new HttpNotFoundException("Aucune permission n'a été modifiée");
    } else if (await this.permissionWithThisNameAlreadyExists(changedName.name))
      throw new HttpException(STATUS_CODE.DUPLICATED.status, STATUS_CODE.DUPLICATED.message);

    throw new InternalServerErrorException();
  }

  async deleteOnePermission(id: string): Promise<DeleteResult> {
    const deleted = await AppDataSource.getRepository(Permission).delete({ id });
    if (deleted.affected > 0) return deleted;
    throw new HttpNotFoundException("Aucune permission n'a été supprimée");
  }
}

export default new PermissionService();
