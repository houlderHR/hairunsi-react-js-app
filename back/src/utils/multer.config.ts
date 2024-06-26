import { Request } from 'express';
import * as multer from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, isValid: boolean) => void;

export const fileStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
  switch (file.mimetype) {
    case 'image/png':
    case 'image/jpg':
    case 'image/jpeg':
    case 'image/svg+xml':
      cb(null, true);
      break;
    default:
      return cb(new Error('Wrong extension type'), false);
  }
};

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
});
