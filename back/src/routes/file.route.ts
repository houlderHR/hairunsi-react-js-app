import { Router } from 'express';
import FileController from '../controllers/file.controller';
import REGEX from '../utils/regex';
import * as multer from 'multer';
import { fileFilter, fileStorage } from '../utils/multer.config';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
});

const routerFile = Router();

routerFile.post('/', upload.single('file'), FileController.create);
routerFile.get('/', FileController.getAll);
routerFile.get(`/:id${REGEX.UID}`, FileController.getOne);
routerFile.put(`/:id${REGEX.UID}`, upload.single('file'), FileController.update);
routerFile.delete(`/:id${REGEX.UID}`, FileController.delete);

export default routerFile;
