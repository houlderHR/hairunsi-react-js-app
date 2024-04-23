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
import roleService from './role.service';
import { v2 as cloudinary } from 'cloudinary';
import { bufferToDataUri, getTypeFile } from '../utils/utils.method';
import { CreateOrUpdateFileDto } from '../dto/file/createOrUpdateFileDto';
import FileService from '../services/file.service';
import { File } from '../entities/file.entity';
import fileService from '../services/file.service';
import { HashPassword } from '../utils/hash';

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
    const role = await roleService.getOne(createUserDto.role);

    const user = new User();
    Object.assign(user, {
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      birth_date: createUserDto.birth_date,
      email: createUserDto.email,
      password: (await HashPassword(createUserDto.password)) || '',
      image: createdImage?.id || '',
      post: post,
      role: role,
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
    const role = await roleService.getOne(updateUserDto.role);

    Object.assign(user, {
      firstname: updateUserDto.firstname,
      lastname: updateUserDto.lastname,
      birth_date: updateUserDto.birth_date,
      image: newImage?.id || user.image,
      post: post,
      role: role,
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
      return await this.getUserRepository().find({ relations: relations });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async deleteUser(uuid: string): Promise<DeleteResult> {
    const user = await this.getUserById(uuid, ['image']);
    if (user) {
      await fileService.delete(user.image.id);
    }

    let deleteResult = await this.getUserRepository().delete({ uuid });

    if (deleteResult.affected > 0) {
      return deleteResult;
    }

    if (deleteResult.affected === 0) {
      throw new HttpNotFoundException("L'utilisateur à supprimer n'existe pas");
    }

    throw new InternalServerErrorException();
  }

  public async checkIfEmailExist(email: string) {
    return true;
  }

  private getUserRepository(): Repository<User> {
    return AppDataSource.getRepository(User);
  }
}

export default new UserService();
