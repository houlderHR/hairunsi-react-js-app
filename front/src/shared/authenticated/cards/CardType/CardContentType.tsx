import { FC } from 'react';
import Icon from '../../../Icon';

const CardContentType: FC<{ name: string }> = ({ name }) => (
  <div className="flex mt-4 flex-row justify-start gap-x-4">
    <Icon name="user-guard" height={22} width={18} />
    <p className="text-base">{name}</p>
  </div>
);

export default CardContentType;
