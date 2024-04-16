import { Router } from 'express';
import FileController from '../controllers/file.controller';
import REGEX from '../utils/regex';

const routerFile = Router();

routerFile.post('/', FileController.create);
routerFile.get('/', FileController.getAll);
routerFile.get(`/:id${REGEX.UID}`, FileController.getOne);
routerFile.put(`/:id${REGEX.UID}`, FileController.update);
routerFile.delete(`/:id${REGEX.UID}`, FileController.delete);

export default routerFile;
