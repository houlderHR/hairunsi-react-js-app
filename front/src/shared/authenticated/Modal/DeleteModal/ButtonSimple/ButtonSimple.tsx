import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../../Icon';

interface ButtonSimpleProps {
  icon?: string;
  title: string;
  addClass?: string;
  onClick: () => void;
}

const ButtonSimple: FC<ButtonSimpleProps> = ({ icon, title, addClass, onClick }) => (
  <button
    type="button"
    className={twMerge(
      addClass,
      'w-full rounded uppercase flex justify-center flex-row px-10 justify-items-center gap-4',
    )}
    onClick={onClick}
  >
    {icon && (
      <span>
        <Icon name={icon} size={12} />
      </span>
    )}
    <span className="">{title}</span>
  </button>
);

export default ButtonSimple;
