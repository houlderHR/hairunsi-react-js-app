import { DeleteResult, EntityNotFoundError, Repository } from 'typeorm';
import { AppDataSource } from '../database/data-source';
import CreateUserDto from '../dto/user/CreateUserDto';
import { User } from '../entities/user.entity';
import { ValidationError, validate } from 'class-validator';
import HttpException from '../exceptions/HttpException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import UpdateUserDto from '../dto/user/UpdateUserDto';
import { StatusCodes } from 'http-status-codes';
import postService from './post.service';

class UserService {
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(422, validationErrors);
    }

    const post = await postService.getPost(createUserDto.post);

    const user = new User();
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.post = post;
    user.birth_date = new Date(createUserDto.birth_date);

    try {
      return await this.getUserRepository().save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(StatusCodes.CONFLICT, "L'utilisateur existe déja");
      }

      throw new InternalServerErrorException();
    }
  }

  public async getUserById(uuid: string, relations?: string[]): Promise<User> {
    try {
      return await this.getUserRepository().findOneOrFail({
        where: { uuid },
        relations: relations,
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpNotFoundException("Cet utilisateur n'existe pas");
      }

      throw new InternalServerErrorException();
    }
  }

  public async updateUser(uuid: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserRepository().findOneByOrFail({ uuid });

    const errors = await validate(updateUserDto);
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(422, validationErrors);
    }

    const post = await postService.getPost(updateUserDto.post);
    user.firstname = updateUserDto.firstname;
    user.lastname = updateUserDto.lastname;
    user.birth_date = updateUserDto.birth_date;
    user.post = post;

    try {
      return await this.getUserRepository().save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(StatusCodes.CONFLICT, "L'utilisateur existe déja");
      }

      throw new InternalServerErrorException();
    }
  }

  public async getAllUser(relations?: string[]): Promise<User[]> {
    try {
      return await this.getUserRepository().find({ relations: relations });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async deleteUser(uuid: string): Promise<DeleteResult> {
    let deleteResult = await this.getUserRepository().delete({ uuid });

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
