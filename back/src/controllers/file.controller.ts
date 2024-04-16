import { Request, Response } from 'express';
import FileService from '../services/file.service';
import STATUS_CODE from '../utils/statusCode';

class FileController {
  async create(req: Request, res: Response) {
    try {
      const createdFile = await FileService.create(req.body);
      return res.status(STATUS_CODE.OK.status).json(createdFile);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await FileService.getAll();
      return res.status(STATUS_CODE.OK.status).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await FileService.getOne(id);
      return res.status(STATUS_CODE.OK.status).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await FileService.update(id, req.body);
      return res.status(STATUS_CODE.OK.status).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await FileService.delete(id);
      return res.status(STATUS_CODE.OK.status).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}

export default new FileController();
