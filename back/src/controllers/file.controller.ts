import { Request, Response } from 'express';
import FileService from '../services/file.service';
import { StatusCodes } from 'http-status-codes';
import { v2 as cloudinary } from 'cloudinary';
import { bufferToDataUri, getTypeFile } from '../utils/utils.method';
import { CreateOrUpdateFileDto } from '../dto/file/createOrUpdateFileDto';
import HttpException from '../exceptions/HttpException';

class FileController {
  async create(req, res: Response) {
    try {
      if (req.file) {
        const result = await cloudinary.uploader.upload(
          bufferToDataUri(req.file.buffer, req.file.mimetype),
          {
            folder: 'uploads',
          },
        );
        if (result) {
          let newFile: CreateOrUpdateFileDto = {
            name: req.file.originalname,
            path: result.secure_url,
            size: result.bytes,
            type: getTypeFile(result.resource_type),
            public_id: result.public_id,
          };
          const createdFile = await FileService.create(newFile);
          return res.status(StatusCodes.CREATED).json(createdFile);
        }
        throw new HttpException(StatusCodes.NOT_ACCEPTABLE, "Erreur lors de l'ajout du fichier");
      }
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Bad request');
    } catch (error) {
      return res.status(error.status).json(error);
    }
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

      if (req.file) {
        const result = await cloudinary.uploader.upload(
          bufferToDataUri(req.file.buffer, req.file.mimetype),
          {
            folder: 'uploads',
          },
        );
        if (result) {
          let updateFile: CreateOrUpdateFileDto = {
            name: req.file.originalname,
            path: result.secure_url,
            size: req.file.size,
            type: getTypeFile(result.resource_type),
            public_id: result.public_id,
          };
          const updated = await FileService.update(id, updateFile);
          return res.status(StatusCodes.OK).json(updated);
        }
        throw new HttpException(StatusCodes.NOT_ACCEPTABLE, "Erreur lors de l'ajout du fichier");
      }
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Bad request');
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
