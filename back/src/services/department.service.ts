import { ValidationError, validate } from 'class-validator';
import { AppDataSource } from '../database/data-source';
import { Department } from '../entities/department.entity';
import { DeleteResult, Repository } from 'typeorm';
import HttpException from '../exceptions/HttpException';
import { CreateDepartmentDto } from '../dto/department/CreateDepartmentDto';
import { UpdateDepartmentDto } from '../dto/department/UpdateDepartmentDto';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';

class DepartmentService {
  public async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const errors = await validate(createDepartmentDto);
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(400, validationErrors);
    }

    try {
      const department = new Department();
      department.name = createDepartmentDto.name;

      return await this.getRepository().save(department);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(409, 'Le département existe déja');
      }

      throw new InternalServerErrorException();
    }
  }

  public async getDepartmentById(id: string): Promise<Department> {
    try {
      return await this.getRepository().findOneByOrFail({ id });
    } catch (error) {
      throw new HttpNotFoundException("Le departement n'existe pas");
    }
  }

  public async getAllDepartment(): Promise<Department[]> {
    return await this.getRepository().find();
  }

  public async deleteDepartment(id: string): Promise<DeleteResult> {
    let deleteResult = await this.getRepository().delete({ id });

    if (deleteResult.affected > 0) {
      return deleteResult;
    }

    if (deleteResult.affected === 0) {
      throw new HttpNotFoundException("Le departement à supprimer n'existe pas");
    }

    throw new InternalServerErrorException();
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

      throw new HttpException(400, validationErrors);
    }

    try {
      department.name = updateDepartmentDto.name;

      return await this.getRepository().save(department);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private getRepository(): Repository<Department> {
    return AppDataSource.getRepository(Department);
  }
}

export default new DepartmentService();
