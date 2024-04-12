import { validate } from 'class-validator';
import { AppDataSource } from '../database/data-source';
import { Department } from '../models/entities/department.entity';
import ValidationError from '../validation/ValidationError';
import EntityNotFoundException from '../exceptions/EntityNotFoundException';
import { DeleteResult, Repository } from 'typeorm';
import { CreateDepartmentDto } from '../models/dto/department/CreateDepartmentDto';
import { UpdateDepartmentDto } from '../models/dto/department/UpdateDepartmentDto';

class DepartmentService {
  public async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const errors = await validate(createDepartmentDto);
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }) => ({
        property,
        constraints,
      }));

      throw new ValidationError('Bad request', 400, validationErrors);
    }

    const department = new Department();
    department.name = createDepartmentDto.name;
    department.jobs = createDepartmentDto.jobs;

    return await this.getRepository().save(department);
  }

  public async getDepartmentById(id: string): Promise<Department> {
    try {
      return await this.getRepository().findOneByOrFail({ id });
    } catch (error) {
      throw new EntityNotFoundException('Not found', {
        message: "Le departement n'existe pas",
        status: 404,
      });
    }
  }

  public async getAllDepartment(): Promise<Department[]> {
    return await this.getRepository().find();
  }

  public async deleteDepartment(id: string): Promise<DeleteResult> {
    try {
      return await this.getRepository().delete({ id });
    } catch (error) {
      throw new EntityNotFoundException('Not found', {
        message: "Le departement à supprimé n'existe pas",
        status: 404,
      });
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

        throw new ValidationError('Bad request', 500, validationErrors);
      }
      department.jobs = updateDepartmentDto.jobs;
      department.name = updateDepartmentDto.name;

      return await this.getRepository().save(department);
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  private getRepository(): Repository<Department> {
    return AppDataSource.getRepository(Department);
  }
}

export default new DepartmentService();
