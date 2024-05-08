import { Router } from 'express';
import REGEX from '../utils/regex';
import UserController from '../controllers/user.controller';
import { upload } from '../utils/multer.config';

const userRoute = Router();

userRoute.post('', upload.single('image'), UserController.create);
userRoute.get('', UserController.get);
userRoute.get(`/:uuid${REGEX.UID}`, UserController.getById);
userRoute.delete(`/:uuid${REGEX.UID}`, UserController.delete);
userRoute.put(`/:uuid${REGEX.UID}`, upload.single('image'), UserController.update);

export default userRoute;
