import { Router } from 'express';
import REGEX from '../utils/regex';
import UserController from '../controllers/user.controller';

const userRoute = Router();

userRoute.post('', UserController.create);
userRoute.get('', UserController.get);
userRoute.get(`/:id${REGEX.UID}`, UserController.getById);
userRoute.delete(`/:id${REGEX.UID}`, UserController.delete);
userRoute.put(`/:id${REGEX.UID}`, UserController.update);

export default userRoute;
