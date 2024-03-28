import { FC } from 'react';
import Icon from '../../../Icon';

<<<<<<< HEAD
const CardContentType: FC<{ name: string }> = ({ name }) => (
  <div className="flex mt-4 flex-row justify-start gap-x-4">
    <Icon name="user-guard" height={22} width={18} />
=======
const CardContentType: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex mt-4 flex-row justify-start gap-x-4">
    <Icon name="user-guard" height="22" width="18" />
>>>>>>> c1e59ef (fix:lint config)
    <p className="text-base">{name}</p>
  </div>
);

export default CardContentType;
