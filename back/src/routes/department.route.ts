import { Router } from 'express';
import DepartmentController from '../controllers/department.controller';
import REGEX from '../utils/regex';

const router = Router();

router.post('', DepartmentController.create);
router.get('', DepartmentController.get);
router.get('/anonymous', DepartmentController.getWithAnonymous);
router.get(`/:id${REGEX.UID}`, DepartmentController.getById);
router.delete(`/:id${REGEX.UID}`, DepartmentController.delete);
router.put(`/:id${REGEX.UID}`, DepartmentController.update);
router.get('/search', DepartmentController.search);

export default router;
