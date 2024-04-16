import { Router } from 'express';
import RoleController from '../controllers/role.controller';
import REGEX from '../utils/regex';

const routerRole = Router();

routerRole.post('/', RoleController.create);
routerRole.get('/', RoleController.getAll);
routerRole.get(`/:id${REGEX.UID}`, RoleController.getOne);
routerRole.put(`/:id${REGEX.UID}`, RoleController.update);
routerRole.delete(`/:id${REGEX.UID}`, RoleController.delete);

export default routerRole;
