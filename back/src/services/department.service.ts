import { validate } from 'class-validator';
import { AppDataSource } from '../database/data-source';
import { Department } from '../models/entities/department.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateDepartmentDto } from '../models/dto/department/CreateDepartmentDto';
import { UpdateDepartmentDto } from '../models/dto/department/UpdateDepartmentDto';
import HttpException from '../exceptions/HttpException';

class DepartmentService {
  public async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const errors = await validate(createDepartmentDto);
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }) => ({
        property,
        constraints,
      }));

      throw new HttpException(400, validationErrors);
    }

    try {
      const department = new Department();
      department.name = createDepartmentDto.name;
      department.jobs = createDepartmentDto.jobs;

      return await this.getRepository().save(department);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(409, 'Le département existe déja');
      }

      throw new HttpException(500, 'Internal server error');
    }
  }

  public async getDepartmentById(id: string): Promise<Department> {
    try {
      return await this.getRepository().findOneByOrFail({ id });
    } catch (error) {
      throw new HttpException(404, "Le departement n'existe pas");
    }
  }

  public async getAllDepartment(): Promise<Department[]> {
    return await this.getRepository().find();
  }

  public async deleteDepartment(id: string): Promise<DeleteResult> {
    try {
      return await this.getRepository().delete({ id });
    } catch (error) {
      throw new HttpException(404, "Le departement à supprimé n'existe pas");
    }
  }

  public async updateDepartment(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    try {
      let department = await this.getDepartmentById(id);
      const errors = await validate(updateDepartmentDto);
      if (errors.length > 0) {
        const validationErrors = errors.map(({ property, constraints }) => ({
          property,
          constraints,
        }));

        throw new HttpException(400, validationErrors);
      }
      department.jobs = updateDepartmentDto.jobs;
      department.name = updateDepartmentDto.name;

      return await this.getRepository().save(department);
    } catch (error) {
      throw new HttpException(500, 'Internal server error');
    }
  }

  private getRepository(): Repository<Department> {
    return AppDataSource.getRepository(Department);
  }
}

export default new DepartmentService();
