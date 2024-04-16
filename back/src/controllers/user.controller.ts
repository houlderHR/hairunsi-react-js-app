import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserDto from '../dto/user/CreateUserDto';
import userService from '../services/user.service';
import STATUS_CODE from '../utils/statusCode';
import UpdateUserDto from '../dto/user/UpdateUserDto';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const createUserDto: CreateUserDto = plainToClass(CreateUserDto, request.body);
      const user = await userService.createUser(createUserDto);

      return response.status(STATUS_CODE.CREATED.status).json(user);
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const users = await userService.getAllUser();

    return response.status(STATUS_CODE.OK.status).json(users);
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    try {
      const user = await userService.getUserById(request.params.id);

      return response.status(STATUS_CODE.OK.status).json(user);
    } catch (error) {
      console.log(error);
      return response.status(error.status).json(error);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      await userService.deleteUser(request.params.id);

      return response
        .status(STATUS_CODE.OK.status)
        .json({ message: 'Utilisateur supprimé avec succés' });
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserDto: UpdateUserDto = plainToClass(UpdateUserDto, request.body);
      let user = await userService.updateUser(request.params.id, updateUserDto);

      return response.status(STATUS_CODE.OK.status).json(user);
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }
}

export default new UserController();
