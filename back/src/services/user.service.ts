import { DeleteResult, Repository } from 'typeorm';
import { AppDataSource } from '../database/data-source';
import CreateUserDto from '../dto/user/CreateUserDto';
import { User } from '../entities/user.entity';
import { ValidationError, validate } from 'class-validator';
import HttpException from '../exceptions/HttpException';
import STATUS_CODE from '../utils/statusCode';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import UpdateUserDto from '../dto/user/UpdateUserDto';

class UserService {
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      if (errors.length > 0) {
        const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
          property,
          constraints,
        }));

        throw new HttpException(422, validationErrors);
      }
    }

    try {
      const user = new User();
      user.firstname = createUserDto.firstname;
      user.lastname = createUserDto.lastname;
      user.birth_date = new Date(createUserDto.birth_date);
      user.matricule = createUserDto.matricule;

      return await this.getUserRepository().save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(STATUS_CODE.DUPLICATED.status, "L'utilisateur existe déja");
      }

      throw new InternalServerErrorException();
    }
  }

  public async getUserById(id: string): Promise<User> {
    try {
      return await this.getUserRepository().findOneByOrFail({ id });
    } catch (error) {
      throw new HttpNotFoundException("Cet utilisateur n'existe pas");
    }
  }

  public async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    const errors = await validate(updateUserDto);
    if (errors.length > 0) {
      if (errors.length > 0) {
        const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
          property,
          constraints,
        }));

        throw new HttpException(422, validationErrors);
      }
    }

    try {
      user.firstname = updateUserDto.firstname;
      user.lastname = updateUserDto.lastname;
      user.birth_date = updateUserDto.birth_date;

      return await this.getUserRepository().save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(STATUS_CODE.DUPLICATED.status, 'Le département existe déja');
      }

      throw new InternalServerErrorException();
    }
  }

  public async getAllUser(): Promise<User[]> {
    return await this.getUserRepository().find();
  }

  public async deleteUser(id: string): Promise<DeleteResult> {
    let deleteResult = await this.getUserRepository().delete({ id });

    if (deleteResult.affected > 0) {
      return deleteResult;
    }

    if (deleteResult.affected === 0) {
      throw new HttpNotFoundException("L'utilisateur à supprimer n'existe pas");
    }

    throw new InternalServerErrorException();
  }

  private getUserRepository(): Repository<User> {
    return AppDataSource.getRepository(User);
  }
}

export default new UserService();
