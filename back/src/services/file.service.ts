import { ValidationError, validate } from 'class-validator';
import { AppDataSource } from '../database/data-source';
import STATUS_CODE from '../utils/statusCode';
import TYPEORM_ERROR from '../utils/errorTypeorm';
import { plainToClass } from 'class-transformer';
import HttpException from '../exceptions/HttpException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import { File } from '../entities/file.entity';
import { CreateOrUpdateFileDto } from '../dto/file/createOrUpdateFileDto';

class FileService {
  async create(newFileDto: CreateOrUpdateFileDto): Promise<File> {
    const errors = await validate(plainToClass(CreateOrUpdateFileDto, newFileDto));
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(STATUS_CODE.UNPROCESSABLE_ENTITY.status, validationErrors);
    }
    try {
      const file: CreateOrUpdateFileDto = new File();
      Object.assign(file, newFileDto);
      const saved = await AppDataSource.getRepository(File).save(file);
      return saved;
    } catch (error) {
      if (error.code == TYPEORM_ERROR.DUPLICATED_FIELD.code) {
        throw new HttpException(STATUS_CODE.DUPLICATED.status, 'Le fichier existe déja');
      }
      throw new InternalServerErrorException();
    }
  }

  async getAll(): Promise<File[]> {
    try {
      return await AppDataSource.getRepository(File).find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string): Promise<File> {
    try {
      const result = await AppDataSource.getRepository(File).findOne({ where: { id } });
      if (!result) throw new HttpNotFoundException("Le fichier n'existe pas");
      return result;
    } catch (error) {
      if (error.status == STATUS_CODE.NOT_FOUND.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateFile: CreateOrUpdateFileDto): Promise<File> {
    try {
      const file = await AppDataSource.getRepository(File).findOne({ where: { id } });
      if (file) {
        const errors = await validate(plainToClass(CreateOrUpdateFileDto, updateFile));
        if (errors.length > 0) {
          const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
            property,
            constraints,
          }));
          throw new HttpException(STATUS_CODE.UNPROCESSABLE_ENTITY.status, validationErrors);
        }
        AppDataSource.getRepository(File).merge(file, updateFile);
        const result = await AppDataSource.getRepository(File).save(file);
        return result;
      }
      throw new HttpNotFoundException("Le fichier n'existe pas");
    } catch (error) {
      if (error.code == TYPEORM_ERROR.DUPLICATED_FIELD.code)
        throw new HttpException(STATUS_CODE.DUPLICATED.status, 'Le fichier existe déja');
      if (
        error.status == STATUS_CODE.UNPROCESSABLE_ENTITY.status ||
        error.status == STATUS_CODE.NOT_FOUND.status
      )
        throw error;
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    const result = await AppDataSource.getRepository(File).delete(id);
    if (result.affected > 0) return result;
    if (result.affected == 0)
      throw new HttpNotFoundException("Le fichier à supprimer n'existe pas");
    throw new InternalServerErrorException();
  }
}

export default new FileService();
