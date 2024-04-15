import { Router } from 'express';
import DepartmentController from '../controllers/department.controller';
import REGEX from '../utils/regex';

const router = Router();

router.post('', DepartmentController.create);
router.get('', DepartmentController.get);
router.get(`/:id${REGEX.UUID}`, DepartmentController.getById);
router.delete(`/:id${REGEX.UUID}`, DepartmentController.delete);
router.put(`/:id${REGEX.UUID}`, DepartmentController.update);

export default router;
