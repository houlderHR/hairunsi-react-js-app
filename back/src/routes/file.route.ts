import { Router } from 'express';
import FileController from '../controllers/file.controller';
import REGEX from '../utils/regex';
import * as multer from 'multer';
import { fileFilter } from '../utils/multer.config';

const upload = multer({
  // storage: fileStorage,
  fileFilter: fileFilter,
});

const routerFile = Router();

routerFile.post('/', upload.single('file'), FileController.create);
routerFile.get('/', FileController.getAll);
routerFile.get(`/:id${REGEX.UID}`, FileController.getOne);
routerFile.put(`/:id${REGEX.UID}`, FileController.update);
routerFile.delete(`/:id${REGEX.UID}`, FileController.delete);

export default routerFile;
