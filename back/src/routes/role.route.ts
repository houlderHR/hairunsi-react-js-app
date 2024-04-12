import { Router } from 'express';
import RoleController from '../controllers/role.controller';

const routerRole = Router();

routerRole.post('/', RoleController.create);
routerRole.get('/', RoleController.getAll);
routerRole.get('/:id', RoleController.getOne);
routerRole.put('/:id', RoleController.update);
routerRole.delete('/:id', RoleController.delete);

export default routerRole;
