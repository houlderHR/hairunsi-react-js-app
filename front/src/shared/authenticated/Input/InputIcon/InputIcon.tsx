import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../Icon';

interface InputIconProps {
  icon: string;
  placeholder: string;
  additionalClass?: string;
  additionalInputClass?: string;
  value?: string;
  withClose?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputIcon: FC<InputIconProps> = ({
  icon,
  placeholder,
  additionalClass,
  additionalInputClass,
  onChange,
  withClose = false,
  value = '',
}) => (
  <div
    className={twMerge(
      'bg-gray-3 hover:bg-white duration-300 flex items-center flex-row px-5 gap-x-2.5 active:bg-white focus:bg-white w-full rounded',
      additionalClass,
    )}
  >
    <span>
      <Icon name={icon} size={18} />
    </span>
    <input
      type="text"
      defaultValue={value}
      onChange={onChange}
      placeholder={placeholder}
      className={twMerge(
        'bg-transparent cursor-pointer py-3 w-full border-transparent text-xs placeholder:text-black-1 focus:outline-none',
        additionalInputClass,
      )}
    />
    {withClose && (
      <span className="absolute right-4">
        <Icon name="x" size={12} className="text-gray-500" />
      </span>
    )}
  </div>
);

export default InputIcon;
