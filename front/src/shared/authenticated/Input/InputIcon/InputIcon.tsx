import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../Icon';

interface InputIconProps {
  icon: string;
  placeholder: string;
  additionalClass?: string;
  additionalInputClass?: string;
}

const InputSearch: FC<InputIconProps> = ({
  icon,
  placeholder,
  additionalClass,
  additionalInputClass,
}) => {
  const inputClasses = twMerge(
    'bg-transparent cursor-pointer py-3 w-full border-transparent text-xs placeholder:text-black-1 focus:outline-none',
    additionalInputClass,
  );
  return (
    <div
      className={twMerge(
        'bg-gray-3 hover:bg-white duration-300 flex items-center flex-row px-5 gap-x-2.5 active:bg-white focus:bg-white w-full rounded',
        additionalClass,
      )}
    >
      <span>
        <Icon name={icon} size={18} />
      </span>
      <input type="text" placeholder={placeholder} className={inputClasses} />
    </div>
  );
};

export default InputSearch;
