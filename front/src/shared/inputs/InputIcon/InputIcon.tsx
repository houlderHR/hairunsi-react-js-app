import { FC, Ref } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../Icon';

interface InputIconProps {
  icon?: string;
  placeholder: string;
  additionalClass?: string;
  value?: string;
  additionalInputClass?: string;
  iconColor?: string;
  type?: string;
  endIcon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputRef?: Ref<HTMLInputElement>;
  required?: boolean;
}

const InputIcon: FC<InputIconProps> = ({
  placeholder,
  additionalClass,
  additionalInputClass,
  iconColor,
  onChange,
  onBlur,
  inputRef,
  endIcon,
  icon,
  type = 'text',
  value = '',
  required,
}) => (
  <div
    className={twMerge(
      'bg-gray-3 relative hover:bg-white duration-300 flex items-center flex-row px-5 gap-x-2.5 active:bg-white focus:bg-white w-full rounded',
      additionalClass,
    )}
  >
    {icon && (
      <span>
        <Icon className={iconColor} name={icon} size={18} />
      </span>
    )}
    <input
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      ref={inputRef}
      placeholder={placeholder}
      className={twMerge(
        'bg-transparent cursor-pointer py-3 w-full border-transparent text-xs placeholder:text-black-1 focus:outline-none',
        additionalInputClass,
      )}
      required={required}
    />
    <span className="absolute right-4">{endIcon}</span>
  </div>
);

export default InputIcon;
