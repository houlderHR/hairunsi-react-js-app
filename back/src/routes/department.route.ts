import { Router } from 'express';
import DepartmentController from '../controllers/department.controller';

const router = Router();

router.post('', DepartmentController.create);
router.get('', DepartmentController.get);
router.get(
  '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  DepartmentController.getById,
);
router.delete(
  '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  DepartmentController.delete,
);
router.put(
  '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  DepartmentController.update,
);

export default router;
