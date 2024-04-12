import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AppDataSource } from '../database/data-source';
import { ErrorMessage } from '../exceptions/ErrorMessage';
import { CreateAndUpdatePermissionDto } from '../models/dto/permission/CreateAndUpdatePermissionDto';
import { Permission } from '../models/entities/permission.entity';

class PermissionService {
  async createPermission(
    permissionDto: CreateAndUpdatePermissionDto,
  ): Promise<Permission | ErrorMessage[] | ErrorMessage> {
    try {
      const errors = await validate(plainToClass(CreateAndUpdatePermissionDto, permissionDto));
      if (errors.length > 0) {
        const errorsMessage: ErrorMessage[] = [];
        errors.map((error) =>
          errorsMessage.push(new ErrorMessage(error.constraints, error.property)),
        );
        return errorsMessage;
      }
      const permission: CreateAndUpdatePermissionDto = new Permission();
      permission.name = permissionDto.name;
      const saved = await AppDataSource.getRepository(Permission).save(permission);
      return saved;
    } catch (error) {
      return new ErrorMessage('La permission portant ce nom existe déjà');
    }
  }

  async permissionWithThisNameAlreadyExists(name: string): Promise<boolean> {
    const permission = await AppDataSource.getRepository(Permission).find({
      where: { name: name },
    });
    if (permission.length > 0) return true;
    else return false;
  }

  async getAllPermissions(): Promise<Permission[] | ErrorMessage> {
    const permissions = await AppDataSource.getRepository(Permission).find();
    if (permissions.length > 0) {
      return permissions;
    }
    return new ErrorMessage('Aucune permission existante');
  }

  async getPermission(id: string): Promise<Permission | ErrorMessage> {
    const permission: ErrorMessage | Permission[] = await await AppDataSource.getRepository(
      Permission,
    ).findBy({ id });
    if (permission.length === 0)
      return new ErrorMessage('Aucune permission existante avec cet identifiant');
    else return permission[0];
  }

  async updateNameOfPermission(
    id: string,
    updatePermissionDto: CreateAndUpdatePermissionDto,
  ): Promise<Permission | ErrorMessage[] | ErrorMessage> {
    const changedName: CreateAndUpdatePermissionDto = plainToClass(
      CreateAndUpdatePermissionDto,
      updatePermissionDto,
    );
    const errors = await validate(changedName);

    if (errors.length > 0) {
      console.log(errors);
      const errorsMessage: ErrorMessage[] = [];
      errors.map((error) => {
        errorsMessage.push({
          property: error.property,
          message: error.constraints,
        });
      });
      return errorsMessage;
    }
    if ((await this.getPermission(id)) instanceof ErrorMessage) return this.getPermission(id);
    if (await this.permissionWithThisNameAlreadyExists(changedName.name)) {
      return new ErrorMessage('Permission déjà existante');
    } else {
      const permission = await AppDataSource.getRepository(Permission).save({
        id,
        name: changedName.name,
      });
      return permission;
    }
  }

  async deleteOnePermission(id: string): Promise<ErrorMessage> {
    // if ((await this.getPermission(id)) instanceof ErrorMessage) return this.getPermission(id);

    if ((await AppDataSource.getRepository(Permission).delete(id)).affected > 0)
      return new ErrorMessage('Permission supprimée', null, 204);
    return new ErrorMessage('Suppression échouée', null, 404);
  }
}

export default new PermissionService();
