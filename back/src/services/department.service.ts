import { ValidationError, validate } from 'class-validator';
import { AppDataSource } from '../database/data-source';
import { Department } from '../entities/department.entity';
import { DeleteResult, Not, QueryFailedError, Repository } from 'typeorm';
import HttpException from '../exceptions/HttpException';
import { CreateDepartmentDto } from '../dto/department/CreateDepartmentDto';
import { UpdateDepartmentDto } from '../dto/department/UpdateDepartmentDto';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import { StatusCodes } from 'http-status-codes';
import roleService from './role.service';
import SearchDepartmentDto from '../dto/department/SearchDepartmentDto';
import { Post } from '../entities/post.entity';

class DepartmentService {
  public async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const errors = await validate(createDepartmentDto);
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(422, validationErrors);
    }

    try {
      const department = new Department();
      const role = await roleService.getOne(createDepartmentDto.role);
      department.name = createDepartmentDto.name;
      Object.assign(department, {
        name: createDepartmentDto.name,
        role: role,
      });

      return await this.getRepository().save(department);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(StatusCodes.CONFLICT, 'Le département existe déja');
      }

      throw new InternalServerErrorException();
    }
  }

  public async getDepartmentById(id: string, relations?: string[]): Promise<Department> {
    try {
      return await this.getRepository().findOneOrFail({
        where: { id },
        relations: relations,
      });
    } catch (error) {
      throw new HttpNotFoundException("Le departement n'existe pas");
    }
  }

  public async getAllDepartment(relations?: string[]): Promise<Department[]> {
    try {
      return await this.getRepository().find({
        where: { name: Not('Anonyme') },
        relations: relations,
        order: { created_at: { direction: 'DESC' } },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async getAllDepartmentWithAnonymous(relations?: string[]): Promise<Department[]> {
    try {
      return await this.getRepository().find({
        relations: relations,
        order: { created_at: { direction: 'DESC' } },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async deleteDepartment(id: string): Promise<DeleteResult> {
    try {
      let department = await this.getRepository().findOne({
        where: { id },
        relations: { posts: true, role: true },
      });

      if (department) {
        const postAnonymous = await this.getRepository().findOne({ where: { name: 'Anonyme' } });
        department.posts.map(async (post: Post) => {
          post.department = postAnonymous;
          await AppDataSource.getRepository(Post).save(post);
        });
      }

      let deleteResult = await this.getRepository().delete({ id });

      if (deleteResult.affected > 0) {
        return deleteResult;
      }

      if (deleteResult.affected === 0) {
        throw new HttpNotFoundException("Le departement à supprimer n'existe pas");
      }
    } catch (error) {
      if (error.status === StatusCodes.NOT_FOUND) throw error;
      if (error.code === '23503')
        throw new HttpException(
          StatusCodes.BAD_REQUEST,
          'Le département ne peut pas etre supprimé',
        );
      throw new InternalServerErrorException();
    }
  }

  public async updateDepartment(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    let department = await this.getDepartmentById(id);

    const errors = await validate(updateDepartmentDto);
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(422, validationErrors);
    }

    try {
      const role = await roleService.getOne(updateDepartmentDto.role);
      Object.assign(department, {
        name: updateDepartmentDto.name,
        role: role,
      });
      return await this.getRepository().save(department);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(StatusCodes.CONFLICT, 'Le département existe déja');
      }

      throw new InternalServerErrorException();
    }
  }

  public async search(searchDepartmentDto: SearchDepartmentDto): Promise<Department[]> {
    let departments = [];
    try {
      if (searchDepartmentDto.search !== '')
        departments = await this.getRepository()
          .createQueryBuilder('d')
          .where('LOWER(d.name) like LOWER(:name)', { name: `%${searchDepartmentDto.search}%` })
          .andWhere('d.name != :anonyme', { anonyme: 'Anonyme' })
          .innerJoinAndSelect('d.role', 'r', 'd.role = r.id')
          .orderBy('d.created_at', 'DESC')
          .getMany();

      return departments;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private getRepository(): Repository<Department> {
    return AppDataSource.getRepository(Department);
  }
}

export default new DepartmentService();
