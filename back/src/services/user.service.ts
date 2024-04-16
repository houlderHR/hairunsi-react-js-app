import { DeleteResult, Repository } from 'typeorm';
import { AppDataSource } from '../database/data-source';
import CreateUserDto from '../dto/user/CreateUserDto';
import { User } from '../entities/user.entity';
import { ValidationError, validate } from 'class-validator';
import HttpException from '../exceptions/HttpException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import UpdateUserDto from '../dto/user/UpdateUserDto';
import ResponseUserDto from '../dto/user/ResponseUserDto';
import { StatusCodes } from 'http-status-codes';

class UserService {
  public async createUser(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
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

      return this.formatUserResponse(await this.getUserRepository().save(user));
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new HttpException(StatusCodes.CONFLICT, "L'utilisateur existe déja");
      }

      throw new InternalServerErrorException();
    }
  }

  public async getUserById(id: string): Promise<ResponseUserDto> {
    try {
      return this.formatUserResponse(await this.getUserRepository().findOneByOrFail({ id }));
    } catch (error) {
      throw new HttpNotFoundException("Cet utilisateur n'existe pas");
    }
  }

  public async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    const user = await this.getUserRepository().findOneByOrFail({ id });

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

      return this.formatUserResponse(await this.getUserRepository().save(user));
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(StatusCodes.CONFLICT, 'Le département existe déja');
      }

      throw new InternalServerErrorException();
    }
  }

  public async getAllUser(): Promise<ResponseUserDto[]> {
    const users = await this.getUserRepository().find();
    return users.map((user) => this.formatUserResponse(user));
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

  private formatUserResponse(user: User) {
    let userResponseDto = new ResponseUserDto();
    userResponseDto.id = user.id;
    userResponseDto.firstname = user.firstname;
    userResponseDto.lastname = user.lastname;
    userResponseDto.matricule = this.formatMatricule(user.matricule);
    userResponseDto.birth_date = user.birth_date;
    userResponseDto.created_at = user.created_at;
    userResponseDto.updated_at = user.updated_at;

    return userResponseDto;
  }

  private formatMatricule(matricule: number): string {
    return `M${('000' + matricule).substr(-3)}`;
  }
}

export default new UserService();
