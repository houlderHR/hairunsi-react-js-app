import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../Icon';

interface ButtonAddProps {
  additionalClass?: string;
  title: string;
  onClick: () => void;
}

const ButtonAdd: FC<ButtonAddProps> = ({ onClick, title, additionalClass = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={twMerge(
      additionalClass,
      'uppercase leading-3 flex flex-row gap-x-3 items-center bg-black-1 py-3.5 pl-8 pr-7 rounded text-xs text-white',
    )}
  >
    <span>
      <Icon name="add" size={12} />
    </span>
    <span className="hidden md:inline">{title}</span>
  </button>
);

export default ButtonAdd;
