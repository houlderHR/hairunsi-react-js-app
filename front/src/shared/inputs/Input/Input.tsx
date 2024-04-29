import { FC } from 'react';
import { Noop, RefCallBack } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface InputProps {
  placeholder?: string;
  type: string;
  additionalClass?: string;
  value?: string;
  refs?: RefCallBack;
  onChange?: (...event: []) => void;
  onBlur?: Noop;
  required?: boolean;
}

const Input: FC<InputProps> = ({
  refs,
  placeholder,
  type,
  additionalClass,
  onChange,
  onBlur,
  value = '',
  required,
}) => (
  <input
    ref={refs}
    className={twMerge(
      additionalClass,
      'rounded border border-gray-1 p-4 w-full leading-3 focus:placeholder:opacity-0 focus:outline-none focus:border-secondary cursor-pointer',
    )}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    onBlur={onBlur}
    required={required}
    value={value}
  />
);

export default Input;
