import { DeleteResult, EntityNotFoundError, Like, Repository } from 'typeorm';
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
import { v2 as cloudinary } from 'cloudinary';
import { bufferToDataUri, getTypeFile } from '../utils/utils.method';
import { CreateOrUpdateFileDto } from '../dto/file/createOrUpdateFileDto';
import FileService from '../services/file.service';
import { File } from '../entities/file.entity';
import { hashPassword } from '../utils/hash';
import SearchUserDto from '../dto/user/SearchUserDto';

class UserService {
  public async createUser(image, createUserDto: CreateUserDto): Promise<User> {
    const errors = await validate(createUserDto);
    let createdImage: File;
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(422, validationErrors);
    }
    const isUserExist = await this.checkIfUserWithThisEmailAlreadyExists(createUserDto.email);

    if (isUserExist) {
      throw new HttpException(
        StatusCodes.CONFLICT,
        "L'utilisateur existe déja: adresse e-mail non disponible",
      );
    }

    if (image) {
      const result = await cloudinary.uploader.upload(
        bufferToDataUri(image.buffer, image.mimetype),
        {
          folder: 'uploads',
        },
      );
      if (result) {
        let newFile: CreateOrUpdateFileDto = {
          name: `${Date.now()}_${image.originalname}`,
          path: result.secure_url,
          size: result.bytes,
          type: getTypeFile(result.resource_type),
          public_id: result.public_id,
        };
        createdImage = await FileService.create(newFile);
      }
    }

    const post = await postService.getPost(createUserDto.post);

    const user = new User();
    try {
      const pass = await hashPassword(createUserDto.password);
      Object.assign(user, {
        firstname: createUserDto.firstname,
        lastname: createUserDto.lastname,
        birth_date: createUserDto.birth_date,
        email: createUserDto.email,
        password: pass || '',
        image: createdImage?.id || '',
        post: post,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }

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
        relations: ['post.department.role.permissions'],
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpNotFoundException("Cet utilisateur n'existe pas");
      }

      throw new InternalServerErrorException();
    }
  }

  public async updateUser(image, uuid: string, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.getUserById(uuid);
    let newImage: File;
    const errors = await validate(updateUserDto);
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(422, validationErrors);
    }

    if (image) {
      const result = await cloudinary.uploader.upload(
        bufferToDataUri(image.buffer, image.mimetype),
        {
          folder: 'uploads',
        },
      );
      if (result) {
        let newFile: CreateOrUpdateFileDto = {
          name: `${Date.now()}_${image.originalname}`,
          path: result.secure_url,
          size: result.bytes,
          type: getTypeFile(result.resource_type),
          public_id: result.public_id,
        };
        newImage = await FileService.update(user.image.id, newFile);
      }
    }

    const post = await postService.getPost(updateUserDto.post);

    Object.assign(user, {
      firstname: updateUserDto.firstname,
      lastname: updateUserDto.lastname,
      birth_date: updateUserDto.birth_date,
      image: newImage?.id || user.image,
      email: user.email,
      password: user.password,
      post: post,
    });

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
      return await this.getUserRepository().find({
        relations: ['post.department.role.permissions'],
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async deleteUser(uuid: string): Promise<DeleteResult> {
    const user = await this.getUserById(uuid, ['image']);

    let deleteResult = await this.getUserRepository().delete({ uuid });

    if (deleteResult.affected > 0) {
      if (user) {
        await cloudinary.uploader.destroy(user.image.public_id);
      }
      return deleteResult;
    }

    if (deleteResult.affected === 0) {
      throw new HttpNotFoundException("L'utilisateur à supprimer n'existe pas");
    }

    throw new InternalServerErrorException();
  }

  public async searchUser(searchUserDto: SearchUserDto): Promise<User[]> {
    let users = [];
    try {
      if (searchUserDto.search !== '')
        users = await this.getUserRepository()
          .createQueryBuilder('u')
          .orWhere('LOWER(u.lastname) like LOWER(:lastname)', {
            lastname: `%${searchUserDto.search}%`,
          })
          .orWhere('LOWER(u.firstname) like LOWER(:firstname)', {
            firstname: `%${searchUserDto.search}%`,
          })
          .orWhere('LOWER(u.matricule) like LOWER(:matricule)', {
            matricule: `%${searchUserDto.search}%`,
          })
          .innerJoinAndSelect('u.post', 'post')
          .innerJoinAndSelect('post.department', 'department')
          .orderBy('u.id', 'DESC')
          .getMany();

      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async checkIfUserWithThisEmailAlreadyExists(email: string) {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { email: email },
      relations: ['post', 'image'],
    });
    return user;
  }

  private getUserRepository(): Repository<User> {
    return AppDataSource.getRepository(User);
  }
}

export default new UserService();
