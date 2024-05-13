import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import DepartmentService from '../services/department.service';
import { CreateDepartmentDto } from '../dto/department/CreateDepartmentDto';
import { UpdateDepartmentDto } from '../dto/department/UpdateDepartmentDto';
import { StatusCodes } from 'http-status-codes';

class DepartmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const createDepartmentDto: CreateDepartmentDto = plainToClass(
        CreateDepartmentDto,
        request.body,
      );
      const department = await DepartmentService.createDepartment(createDepartmentDto);

      return response.status(StatusCodes.CREATED).json(department);
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    let relations = Object.keys(request.query).map((query) => query);
    try {
      const departments = await DepartmentService.getAllDepartment(relations);
      return response.status(StatusCodes.OK).json(departments);
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    let relations = Object.keys(request.query).map((query) => query);
    try {
      const department = await DepartmentService.getDepartmentById(request.params.id, relations);

      return response.status(StatusCodes.OK).json(department);
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      await DepartmentService.deleteDepartment(request.params.id);

      return response.status(StatusCodes.OK).json({ message: 'Departement supprimé avec succés' });
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

      return response.status(StatusCodes.OK).json(department);
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }
}

export default new DepartmentController();
