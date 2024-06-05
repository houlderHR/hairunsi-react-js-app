import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../../../../shared/Icon';

interface IAction {
  item: string;
  additionalClassname?: string;
  onClick?: () => void;
}

const Action: FC<IAction> = ({ item, additionalClassname, onClick }) => (
  <Icon
    name={item}
    className={twMerge('text-[#bdbdbd]', additionalClassname || '')}
    height={24}
    width={24}
    onClick={onClick || (() => {})}
  />
);

export default Action;
