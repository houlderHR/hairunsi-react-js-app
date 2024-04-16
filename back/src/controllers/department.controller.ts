import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import DepartmentService from '../services/department.service';
import { CreateDepartmentDto } from '../dto/department/CreateDepartmentDto';
import { UpdateDepartmentDto } from '../dto/department/UpdateDepartmentDto';
import STATUS_CODE from '../utils/statusCode';

class DepartmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const createDepartmentDto: CreateDepartmentDto = plainToClass(
        CreateDepartmentDto,
        request.body,
      );
      const department = await DepartmentService.createDepartment(createDepartmentDto);

      return response.status(STATUS_CODE.CREATED.status).json(department);
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const departments = await DepartmentService.getAllDepartment();

    return response.status(STATUS_CODE.OK.status).json(departments);
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    try {
      const department = await DepartmentService.getDepartmentById(request.params.id);

      return response.status(STATUS_CODE.OK.status).json(department);
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      await DepartmentService.deleteDepartment(request.params.id);

      return response
        .status(STATUS_CODE.OK.status)
        .json({ message: 'Departement supprimé avec succés' });
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateDepartmentDto: UpdateDepartmentDto = plainToClass(
        UpdateDepartmentDto,
        request.body,
      );
      let department = await DepartmentService.updateDepartment(
        request.params.id,
        updateDepartmentDto,
      );

      return response.status(STATUS_CODE.OK.status).json(department);
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }
}

export default new DepartmentController();
