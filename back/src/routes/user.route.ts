import { Router } from 'express';
import REGEX from '../utils/regex';
import UserController from '../controllers/user.controller';

const userRoute = Router();

userRoute.post('', UserController.create);
userRoute.get('', UserController.get);
userRoute.get(`/:uuid${REGEX.UID}`, UserController.getById);
userRoute.delete(`/:uuid${REGEX.UID}`, UserController.delete);
userRoute.put(`/:uuid${REGEX.UID}`, UserController.update);

export default userRoute;
