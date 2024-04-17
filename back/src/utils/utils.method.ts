import { TYPE_FILE } from './constants';

export const bufferToDataUri = (buffer: Buffer, mimetype: string) => {
  const b64 = Buffer.from(buffer).toString('base64');
  let dataURI = 'data:' + mimetype + ';base64,' + b64;
  return dataURI;
};

export const getTypeFile = (mimetype: string) => {
  let result: string = '';
  switch (mimetype) {
    case 'image':
      result = TYPE_FILE.AVATAR;
      break;
    case 'text':
      result = TYPE_FILE.DOCUMENT;
      break;
  }
  return result;
};
