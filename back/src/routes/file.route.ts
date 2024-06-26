import { Router } from 'express';
import FileController from '../controllers/file.controller';
import REGEX from '../utils/regex';
import { upload } from '../utils/multer.config';

const routerFile = Router();

routerFile.post('/', upload.single('file'), FileController.create);
routerFile.get('/', FileController.getAll);
routerFile.get(`/:id${REGEX.UID}`, FileController.getOne);
routerFile.put(`/:id${REGEX.UID}`, upload.single('file'), FileController.update);
routerFile.delete(`/:id${REGEX.UID}`, FileController.delete);

export default routerFile;
