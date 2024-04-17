import { Request, Response } from 'express';
import FileService from '../services/file.service';
import { StatusCodes } from 'http-status-codes';
import { v2 as cloudinary } from 'cloudinary';

class FileController {
  async create(req, res: Response) {
    console.log('FILE: ', req.file);
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      res.json({ imageURl: result.secure_url });
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const createdFile = await FileService.create(req.body);
    //   return res.status(StatusCodes.CREATED).json(createdFile);
    // } catch (error) {
    //   return res.status(error.status).json(error);
    // }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await FileService.getAll();
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await FileService.getOne(id);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await FileService.update(id, req.body);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await FileService.delete(id);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}

export default new FileController();
