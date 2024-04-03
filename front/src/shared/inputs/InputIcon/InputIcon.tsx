import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../Icon';

interface InputIconProps {
  icon?: string;
  placeholder: string;
  additionalClass?: string;
  additionalInputClass?: string;
  value?: string;
  type?: string;
  endIcon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputIcon: FC<InputIconProps> = ({
  placeholder,
  additionalClass,
  additionalInputClass,
  onChange,
  endIcon,
  icon,
  type = 'text',
  value = '',
}) => (
  <div
    className={twMerge(
      'bg-gray-3 relative hover:bg-white duration-300 flex items-center flex-row px-5 gap-x-2.5 active:bg-white focus:bg-white w-full rounded',
      additionalClass,
    )}
  >
    {icon && (
      <span>
        <Icon name={icon} size={18} />
      </span>
    )}
    <input
      type={type}
      defaultValue={value}
      onChange={onChange}
      placeholder={placeholder}
      className={twMerge(
        'bg-transparent cursor-pointer py-3 w-full border-transparent text-xs placeholder:text-black-1 focus:outline-none',
        additionalInputClass,
      )}
    />
    <span className="absolute right-4">{endIcon}</span>
  </div>
);

export default InputIcon;
