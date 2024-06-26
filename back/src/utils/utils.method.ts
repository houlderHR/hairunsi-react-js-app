import { User } from '../entities/user.entity';
import { TYPE_FILE } from './constants';

export const bufferToDataUri = (buffer: Buffer, mimetype: string) => {
  const b64 = Buffer.from(buffer).toString('base64');
  let dataURI = 'data:' + mimetype + ';base64,' + b64;
  return dataURI;
};

export const removeSpace = (elem: string) => {
  return elem.split(' ').join('');
};

export const removeManySpaceAndCapitalize = (elem: string) => {
  let noSpaceElem = elem.trim();
  let tmp = noSpaceElem
    .split(' ')
    .filter((item) => item != '')
    .map((item) => {
      let editItem = item.trim().charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      return editItem;
    })
    .join(' ');
  return tmp;
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

export const checkIfPasswordContainPersonalInformation = (
  user: User,
  password: string,
): boolean => {
  let keyTest = { firstname: user.firstname, lastname: user.lastname, email: user.email };

  return Object.keys(keyTest).some((key) =>
    password.toLowerCase().trim().replace(/\s/g, '').includes(keyTest[key].toLowerCase()),
  );
};

export const capitalizeLetter = (letter: string): string => {
  const splittedLetter = letter.split(' ');
  return splittedLetter
    .map((letter) => letter[0].toUpperCase() + letter.substring(1).toLowerCase())
    .join(' ');
};
