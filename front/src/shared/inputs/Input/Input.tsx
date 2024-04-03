import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps {
  placeholder: string;
  type: string;
  additionalClass?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ placeholder, type, additionalClass, onChange, value = '' }) => (
  <input
    className={twMerge(
      additionalClass,
      'rounded border border-gray-1 p-4 w-full leading-3 focus:placeholder:opacity-0 focus:outline-none focus:border-secondary cursor-pointer',
    )}
    defaultValue={value}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
  />
);

export default Input;
